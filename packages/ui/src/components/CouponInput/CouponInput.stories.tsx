import type { Meta, StoryObj } from '@storybook/react';
import { CouponInput } from './CouponInput';

const meta: Meta<typeof CouponInput> = { title: 'Components/CouponInput', component: CouponInput };
export default meta;
type Story = StoryObj<typeof CouponInput>;

export const Default: Story = { args: { onApply: (code) => alert(`تطبيق ${code}`) } };
export const Applied: Story = { args: { onApply: () => {}, appliedCode: 'SAVE20', onRemove: () => alert('تمت الإزالة') } };
export const Error: Story = { args: { onApply: () => {}, error: 'رمز الخصم غير صالح أو منتهي الصلاحية' } };
