import type { Meta, StoryObj } from '@storybook/react';
import { AIItineraryCard } from './AIItineraryCard';

const meta: Meta<typeof AIItineraryCard> = {
  title: 'Components/AIItineraryCard',
  component: AIItineraryCard,
};

export default meta;
type Story = StoryObj<typeof AIItineraryCard>;

export const Default: Story = {
  args: {
    title: 'برنامج الرحلة',
    totalDays: 3,
    days: [
      {
        day: 1, date: 'الاثنين 15 مايو',
        activities: [
          { time: '09:00', title: 'زيارة الأهرامات', description: 'جولة في أهرامات الجيزة وأبو الهول', location: 'الجيزة', duration: '3 ساعات' },
          { time: '13:00', title: 'الغداء في مطعم محلي', location: 'مطعم هارموني', duration: 'ساعة' },
          { time: '15:00', title: 'المتحف المصري الكبير', location: 'التجمع الخامس', duration: 'ساعتان' },
        ],
      },
      {
        day: 2, date: 'الثلاثاء 16 مايو',
        activities: [
          { time: '08:00', title: 'الانتقال إلى الأقصر', duration: 'ساعة طيران' },
          { time: '11:00', title: 'معبد الكرنك', location: 'الأقصر', duration: '3 ساعات' },
        ],
      },
      {
        day: 3, date: 'الأربعاء 17 مايو',
        activities: [
          { time: '06:00', title: 'منطاد فوق الأقصر', duration: 'ساعتان' },
          { time: '10:00', title: 'العودة إلى القاهرة', duration: 'ساعة طيران' },
        ],
      },
    ],
  },
};
