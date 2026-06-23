import type { Meta, StoryObj } from '@storybook/react';
import { AIRecommendationCard } from './AIRecommendationCard';

const meta: Meta<typeof AIRecommendationCard> = {
  title: 'Components/AIRecommendationCard',
  component: AIRecommendationCard,
};

export default meta;
type Story = StoryObj<typeof AIRecommendationCard>;

export const Default: Story = {
  args: { title: 'الأقصر', description: 'مدينة الآثار الفرعونية العظيمة على ضفاف النيل', image: '/luxor.jpg', matchScore: 95, reason: 'تناسب اهتماماتك بالتاريخ' },
};
