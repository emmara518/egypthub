import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessage } from './ChatMessage';

const meta: Meta<typeof ChatMessage> = {
  title: 'Components/ChatMessage',
  component: ChatMessage,
  argTypes: {
    role: { control: 'select', options: ['user', 'assistant'] },
  },
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

export const Assistant: Story = {
  args: { id: '1', content: 'مرحباً! كيف يمكنني مساعدتك؟', role: 'assistant', senderName: 'المساعد الذكي', avatar: '/avatar.jpg', timestamp: '10:30' },
};

export const User: Story = {
  args: { id: '2', content: 'أريد حجز رحلة إلى الأقصر', role: 'user', senderName: 'أنت', avatar: '/user.jpg', timestamp: '10:31', status: 'read' },
};
