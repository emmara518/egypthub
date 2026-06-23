import type { Meta, StoryObj } from '@storybook/react';
import { PaymentMethodSelector } from './PaymentMethodSelector';

const meta: Meta<typeof PaymentMethodSelector> = { title: 'Components/PaymentMethodSelector', component: PaymentMethodSelector };
export default meta;
type Story = StoryObj<typeof PaymentMethodSelector>;

export const Default: Story = { args: { options: [{ id: 'visa', label: 'فيزا', icon: 'visa' }, { id: 'mastercard', label: 'ماستركارد', icon: 'mastercard' }, { id: 'mada', label: 'مدى', icon: 'mada' }, { id: 'stcpay', label: 'STC Pay', icon: 'stcpay' }, { id: 'applepay', label: 'Apple Pay', icon: 'applepay' }], selected: 'visa', onChange: (id) => alert(id) } };
