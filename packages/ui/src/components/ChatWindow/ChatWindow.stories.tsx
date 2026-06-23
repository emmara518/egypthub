import type { Meta, StoryObj } from '@storybook/react';
import { ChatWindow } from './ChatWindow';
import { ChatMessage } from '../ChatMessage';
import { ChatComposer } from '../ChatComposer';

const meta: Meta<typeof ChatWindow> = {
  title: 'Components/ChatWindow',
  component: ChatWindow,
};

export default meta;
type Story = StoryObj<typeof ChatWindow>;

export const Default: Story = {
  render: () => (
    <ChatWindow title="المساعد الذكي" subtitle="متصل" headerAvatar="/avatar.jpg">
      <ChatMessage id="1" content="مرحباً! كيف يمكنني مساعدتك في التخطيط لرحلتك إلى مصر؟" role="assistant" timestamp="10:30" />
      <ChatMessage id="2" content="أريد حجز رحلة إلى الأقصر" role="user" timestamp="10:31" status="read" />
      <ChatMessage id="3" content="ممتاز! الأقصر وجهة رائعة. هل تفضل رحلة ثقافية أم ترفيهية؟" role="assistant" timestamp="10:31" />
      <ChatComposer onSend={(msg) => alert(msg)} />
    </ChatWindow>
  ),
};
