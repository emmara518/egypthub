import type { Meta, StoryObj } from '@storybook/react';
import { QuickActions } from './QuickActions';

const meta: Meta<typeof QuickActions> = {
  title: 'Components/QuickActions',
  component: QuickActions,
};

export default meta;
type Story = StoryObj<typeof QuickActions>;

export const Default: Story = {
  args: {
    actions: [
      { id: 'book', label: 'حجز', icon: '✈️', description: 'حجز رحلة جديدة' },
      { id: 'explore', label: 'استكشاف', icon: '🔍', description: 'اكتشف وجهات' },
      { id: 'chat', label: 'محادثة', icon: '💬', description: 'تحدث مع المساعد' },
      { id: 'offers', label: 'عروض', icon: '🏷️', description: 'عروض حصرية' },
      { id: 'history', label: 'الرحلات', icon: '📋', description: 'رحلاتي السابقة' },
      { id: 'support', label: 'دعم', icon: '🎧', description: 'خدمة العملاء' },
    ],
    onAction: (id: string) => alert(id),
  },
};
