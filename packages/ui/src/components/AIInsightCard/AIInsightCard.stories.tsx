import type { Meta, StoryObj } from '@storybook/react';
import { AIInsightCard } from './AIInsightCard';

const meta: Meta<typeof AIInsightCard> = {
  title: 'Components/AIInsightCard',
  component: AIInsightCard,
};

export default meta;
type Story = StoryObj<typeof AIInsightCard>;

export const Default: Story = {
  args: { title: 'أفضل وقت للزيارة', description: 'فصل الخريف والربيع هما أفضل الأوقات لزيارة مصر حيث الطقس معتدل', icon: '🌤️', category: 'مناخ' },
};

export const Tip: Story = {
  args: { title: 'احجز مبكراً', description: 'ننصح بالحجز قبل شهر على الأقل للحصول على أفضل الأسعار', icon: '💡', isTip: true },
};
