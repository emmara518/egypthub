import type { Meta, StoryObj } from '@storybook/react';
import { ContextCards } from './ContextCards';

const meta: Meta<typeof ContextCards> = {
  title: 'Components/ContextCards',
  component: ContextCards,
};

export default meta;
type Story = StoryObj<typeof ContextCards>;

export const Default: Story = {
  args: {
    cards: [
      { id: '1', title: 'أفضل وقت للزيارة', summary: 'الخريف والربيع هما أفضل فصول السنة لزيارة مصر', icon: '🌤️', type: 'tip' },
      { id: '2', title: 'تأشيرة الدخول', summary: 'مواطنو 80 دولة يمكنهم الحصول على تأشيرة عند الوصول', icon: '🛂', type: 'info' },
      { id: '3', title: 'الطقس اليوم', summary: 'القاهرة: 32°C مشمس', type: 'info' },
    ],
  },
};
