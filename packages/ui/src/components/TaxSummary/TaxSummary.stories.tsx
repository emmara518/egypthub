import type { Meta, StoryObj } from '@storybook/react';
import { TaxSummary } from './TaxSummary';

const meta: Meta<typeof TaxSummary> = { title: 'Components/TaxSummary', component: TaxSummary };
export default meta;
type Story = StoryObj<typeof TaxSummary>;

export const Default: Story = { args: { taxRows: [{ label: 'ضريبة القيمة المضافة 14%', amount: '168' }, { label: 'رسوم الخدمة', amount: '25' }, { label: 'رسوم إدارية', amount: '10' }], totalAmount: '203' } };
