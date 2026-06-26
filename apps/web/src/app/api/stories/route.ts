import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/api/auth';
import { prisma } from '@/lib/api/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '12', 10)));
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { isPublished: true };

    if (category) where.category = category;
    if (featured === 'true') where.isFeatured = true;

    const [data, total] = await Promise.all([
      prisma.story.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        include: {
          author: {
            select: { name: true, avatarUrl: true },
          },
        },
      }),
      prisma.story.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({ data, total, page, limit, totalPages });
  } catch (error) {
    console.error('GET /api/stories error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { slug, titleAr, titleEn, bodyAr, bodyEn, category, coverImage, readTimeMinutes } = body;

    if (!slug || !titleAr || !bodyAr) {
      return NextResponse.json({ error: 'slug, titleAr, and bodyAr are required' }, { status: 400 });
    }

    const existing = await prisma.story.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }

    const story = await prisma.story.create({
      data: {
        slug,
        titleAr,
        titleEn: titleEn || null,
        bodyAr,
        bodyEn: bodyEn || null,
        category: category || null,
        coverImage: coverImage || null,
        readTimeMinutes: readTimeMinutes || null,
        authorId: user.userId,
        isPublished: false,
      },
      include: {
        author: {
          select: { name: true, avatarUrl: true },
        },
      },
    });

    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    console.error('POST /api/stories error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
