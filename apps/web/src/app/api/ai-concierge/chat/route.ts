import { NextResponse } from 'next/server';
import { buildSystemPrompt } from '@/lib/ai/system-prompt';
import {
  generateResponse,
  createSessionMemory,
} from '@/lib/zainab';
import type { SessionMemory, ChatMessage } from '@/lib/zainab/types';

interface ChatRequest {
  message: string;
  history: { role: string; content: string }[];
  context?: {
    city?: string;
    preferences?: Record<string, any>;
  };
}

export const dynamic = 'force-dynamic';

const sessions = new Map<string, SessionMemory>();

function getOrCreateSession(sessionId: string): SessionMemory {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, createSessionMemory());
  }
  return sessions.get(sessionId)!;
}

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const { message, history = [], context } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const sessionId = request.headers.get('x-session-id') || 'default';
    const memory = getOrCreateSession(sessionId);

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      return handleLLMStream(message, history, context, apiKey);
    }

    return handleFallback(message, history, memory);
  } catch (error) {
    console.error('AI Concierge error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleLLMStream(
  message: string,
  history: { role: string; content: string }[],
  context: { city?: string; preferences?: Record<string, any> } | undefined,
  apiKey: string,
) {
  const systemPrompt = buildSystemPrompt(context);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user', content: message },
      ],
      stream: true,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    console.error('OpenAI API error:', response.status, errBody);
    return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 502 });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = response.body!.getReader();

  const readable = new ReadableStream({
    async start(controller) {
      try {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                continue;
              }
              try {
                const parsed = JSON.parse(data);
                const text = parsed.choices?.[0]?.delta?.content || '';
                if (text) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                }
              } catch {
                // skip malformed lines
              }
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

function handleFallback(
  message: string,
  history: { role: string; content: string }[],
  memory: SessionMemory,
) {
  const transformedHistory: ChatMessage[] = history.map((m, i) => ({
    id: `hist-${i}`,
    role: m.role === 'user' ? 'user' : 'zainab',
    content: m.content,
    timestamp: Date.now() + i,
  }));

  const response = generateResponse(message, transformedHistory, memory);

  return NextResponse.json({
    text: response.text,
    recommendations: response.recommendations ?? null,
    tripPlan: response.tripPlan ?? null,
  });
}
