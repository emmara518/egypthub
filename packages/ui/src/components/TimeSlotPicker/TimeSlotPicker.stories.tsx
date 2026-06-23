import type { Meta, StoryObj } from '@storybook/react';
import { TimeSlotPicker } from './TimeSlotPicker';

const meta: Meta<typeof TimeSlotPicker> = { title: 'Components/TimeSlotPicker', component: TimeSlotPicker };
export default meta;
type Story = StoryObj<typeof TimeSlotPicker>;

export const Default: Story = {
  args: { slots: [{ id: '1', label: '09:00 صباحاً', price: '$100' }, { id: '2', label: '12:00 ظهراً', price: '$120' }, { id: '3', label: '03:00 مساءً', price: '$90' }, { id: '4', label: '06:00 مساءً', isAvailable: false }], date: 'الجمعة، 15 مايو 2026', onSelect: (id) => alert(id) },
};
