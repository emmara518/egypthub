import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble } from './ChatBubble';

const meta: Meta<typeof ChatBubble> = {
  title: 'Components/ChatBubble',
  component: ChatBubble,
  argTypes: {
    isUser: { control: 'boolean' },
    status: { control: 'select', options: ['sending', 'sent', 'delivered', 'read'] },
  },
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const Assistant: Story = {
  args: { message: 'مرحباً! كيف يمكنني مساعدتك في التخطيط لرحلتك إلى مصر؟', timestamp: '10:30' },
};

export const User: Story = {
  args: { message: 'أريد زيارة الأهرامات', isUser: true, timestamp: '10:31', status: 'read' },
};
