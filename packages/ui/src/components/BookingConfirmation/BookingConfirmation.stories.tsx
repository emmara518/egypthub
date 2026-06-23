import type { Meta, StoryObj } from '@storybook/react';
import { BookingConfirmation } from './BookingConfirmation';

const meta: Meta<typeof BookingConfirmation> = { title: 'Components/BookingConfirmation', component: BookingConfirmation };
export default meta;
type Story = StoryObj<typeof BookingConfirmation>;

export const Confirmed: Story = { args: { bookingId: 'BK-2024-001', details: [{ label: 'الوجهة', value: 'دبي' }, { label: 'تاريخ السفر', value: '15 يوليو 2026' }, { label: 'عدد المسافرين', value: '2' }, { label: 'المبلغ المدفوع', value: '$1,230'}], message: 'تم إرسال تأكيد الحجز إلى بريدك الإلكتروني', onViewBooking: () => alert('عرض') } };
export const Pending: Story = { args: { bookingId: 'BK-2024-002', status: 'pending', details: [{ label: 'الوجهة', value: 'شرم الشيخ' }, { label: 'تاريخ السفر', value: '20 يوليو 2026' }], message: 'سيتم تأكيد الحجز خلال 24 ساعة' } };
