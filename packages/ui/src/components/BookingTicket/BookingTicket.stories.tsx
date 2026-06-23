import type { Meta, StoryObj } from '@storybook/react';
import { BookingTicket } from './BookingTicket';

const meta: Meta<typeof BookingTicket> = { title: 'Components/BookingTicket', component: BookingTicket };
export default meta;
type Story = StoryObj<typeof BookingTicket>;

export const Default: Story = { args: { title: 'رحلة دبي - الإمارات', date: 'الجمعة، 15 يوليو 2026', time: '10:30 صباحاً', location: 'مطار دبي الدولي - صالة 3', passengers: [{ name: 'أحمد محمد', type: 'بالغ', seat: '12A' }, { name: 'سارة أحمد', type: 'بالغ', seat: '12B' }], bookingRef: 'BK-2024-001' } };
