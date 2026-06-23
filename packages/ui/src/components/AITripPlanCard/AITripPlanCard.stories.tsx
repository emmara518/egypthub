import type { Meta, StoryObj } from '@storybook/react';
import { AITripPlanCard } from './AITripPlanCard';

const meta: Meta<typeof AITripPlanCard> = {
  title: 'Components/AITripPlanCard',
  component: AITripPlanCard,
};

export default meta;
type Story = StoryObj<typeof AITripPlanCard>;

export const Default: Story = {
  args: {
    title: 'رحلة الأقصر الثقافية',
    description: 'رحلة شاملة لمدة 3 أيام لاستكشاف آثار ومعابد الأقصر',
    duration: '3 أيام / ليلتان',
    budget: '$$ (ميزانية متوسطة)',
    highlights: ['آثار فرعونية', 'متاحف', 'جولة نيلية', 'مرشد سياحي'],
    days: [
      { day: 1, title: 'الوصول إلى الأقصر', description: 'الاستقبال من المطار والتوجه إلى الفندق' },
      { day: 2, title: 'جولة في معبد الكرنك', description: 'زيارة معبد الكرنك ووادي الملوك' },
      { day: 3, title: 'جولة نيلية', description: 'رحلة نيلية غروب الشمس ثم العودة' },
    ],
    image: '/luxor.jpg',
    matchScore: 95,
    onSelect: () => alert('تم اختيار الخطة'),
  },
};
