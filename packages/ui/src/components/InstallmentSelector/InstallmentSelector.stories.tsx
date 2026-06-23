import type { Meta, StoryObj } from '@storybook/react';
import { InstallmentSelector } from './InstallmentSelector';

const meta: Meta<typeof InstallmentSelector> = { title: 'Components/InstallmentSelector', component: InstallmentSelector };
export default meta;
type Story = StoryObj<typeof InstallmentSelector>;

export const Default: Story = { args: { plans: [{ id: '3', months: 3, monthlyAmount: '410', isNoInterest: true }, { id: '6', months: 6, monthlyAmount: '210' }, { id: '12', months: 12, monthlyAmount: '110', totalAmount: '1,320' }], selected: '3', onChange: (id) => alert(id) } };
