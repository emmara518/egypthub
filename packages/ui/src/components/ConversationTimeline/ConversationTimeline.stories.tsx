import type { Meta, StoryObj } from '@storybook/react';
import { ConversationTimeline } from './ConversationTimeline';

const meta: Meta<typeof ConversationTimeline> = {
  title: 'Components/ConversationTimeline',
  component: ConversationTimeline,
};

export default meta;
type Story = StoryObj<typeof ConversationTimeline>;

export const Default: Story = {
  args: {
    entries: [
      { id: '1', title: 'مرحباً', description: 'بدأ المحادثة', timestamp: '10:00', isCompleted: true },
      { id: '2', title: 'اقتراح وجهة', description: 'تم اقتراح الأقصر', timestamp: '10:01', isCompleted: true },
      { id: '3', title: 'تفاصيل الرحلة', description: 'جاري البحث عن الفنادق', timestamp: '10:02', isActive: true },
      { id: '4', title: 'تأكيد الحجز', timestamp: '10:03' },
    ],
  },
};
