import type { Meta, StoryObj } from '@storybook/react';
import { AvailabilityCalendar } from './AvailabilityCalendar';

const meta: Meta<typeof AvailabilityCalendar> = { title: 'Components/AvailabilityCalendar', component: AvailabilityCalendar };
export default meta;
type Story = StoryObj<typeof AvailabilityCalendar>;

const today = new Date();
const days = Array.from({ length: 30 }, (_, i) => ({ date: new Date(today.getFullYear(), today.getMonth(), i + 1).toISOString().split('T')[0], available: i % 3 !== 0, price: i % 3 === 0 ? undefined : '$' + (99 + i * 10) }));

export const Default: Story = { args: { month: 'يونيو 2026', days, onSelect: (d) => alert(d) } };
