import type { Meta, StoryObj } from '@storybook/react';
import { BookingReview } from './BookingReview';

const meta: Meta<typeof BookingReview> = { title: 'Components/BookingReview', component: BookingReview };
export default meta;
type Story = StoryObj<typeof BookingReview>;

export const Default: Story = {
  args: { title: 'مراجعة الحجز', sections: [{ title: 'معلومات الرحلة', items: [{ label: 'الوجهة', value: 'الأقصر - مصر' }, { label: 'التاريخ', value: '15 - 18 مايو 2026' }, { label: 'المدة', value: '3 أيام / ليلتان' }] }, { title: 'المسافرين', items: [{ label: 'عدد المسافرين', value: '2 بالغ' }, { label: 'نوع الرحلة', value: 'فردي' }] }, { title: 'السعر', items: [{ label: 'سعر الرحلة', value: '$1,000' }, { label: 'الضرائب', value: '$150' }, { label: 'الخصم', value: '-$100' }] }], onEdit: (s) => alert(`تعديل ${s}`), onConfirm: () => alert('تم التأكيد') },
};
