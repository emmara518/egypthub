import type { Meta, StoryObj } from '@storybook/react';
import { BookingSummary } from './BookingSummary';

const meta: Meta<typeof BookingSummary> = { title: 'Components/BookingSummary', component: BookingSummary };
export default meta;
type Story = StoryObj<typeof BookingSummary>;

export const Default: Story = {
  args: { title: 'رحلة الأقصر', image: '/luxor.jpg', lines: [{ label: 'التاريخ', value: '15 - 18 مايو' }, { label: 'المدة', value: '3 أيام' }, { label: 'عدد المسافرين', value: '2' }, { label: 'نوع الغرفة', value: 'مزدوجة', isHighlight: true }], totalLabel: 'الإجمالي', totalValue: '$1,299' },
};
