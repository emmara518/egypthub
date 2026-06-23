import type { Meta, StoryObj } from '@storybook/react';
import { DiscountBadge } from './DiscountBadge';

const meta: Meta<typeof DiscountBadge> = { title: 'Components/DiscountBadge', component: DiscountBadge };
export default meta;
type Story = StoryObj<typeof DiscountBadge>;

export const Default: Story = { args: { value: '20', type: 'percentage', description: 'خصم الحجز المبكر' } };
export const Free: Story = { args: { value: '', type: 'free', description: 'طفل مجاناً' } };
export const Expired: Story = { args: { value: '15', isExpired: true, description: 'خصم منتهي الصلاحية' } };
