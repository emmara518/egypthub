import type { Meta, StoryObj } from '@storybook/react';
import { BookingTimeline } from './BookingTimeline';

const meta: Meta<typeof BookingTimeline> = { title: 'Components/BookingTimeline', component: BookingTimeline };
export default meta;
type Story = StoryObj<typeof BookingTimeline>;

export const Default: Story = {
  args: { events: [{ id: '1', title: 'تم تقديم الطلب', description: 'تم استلام طلب الحجز', timestamp: '10:00', status: 'completed' }, { id: '2', title: 'قيد المراجعة', description: 'جاري مراجعة الطلب', timestamp: '10:05', status: 'active' }, { id: '3', title: 'تم التأكيد', description: 'سيتم تأكيد الحجز قريباً', status: 'pending' }] },
};
