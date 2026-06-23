import type { Meta, StoryObj } from '@storybook/react';
import { PriceBreakdown } from './PriceBreakdown';

const meta: Meta<typeof PriceBreakdown> = { title: 'Components/PriceBreakdown', component: PriceBreakdown };
export default meta;
type Story = StoryObj<typeof PriceBreakdown>;

export const Default: Story = { args: { lines: [{ label: 'سعر الرحلة الأساسي', amount: '1,200' }, { label: 'الضرائب والرسوم', amount: '180' }, { label: 'خصم الحجز المبكر', amount: '150', isDiscount: true }], totalAmount: '1,230' } };
