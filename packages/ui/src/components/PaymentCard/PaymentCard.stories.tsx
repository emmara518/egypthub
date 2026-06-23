import type { Meta, StoryObj } from '@storybook/react';
import { PaymentCard } from './PaymentCard';

const meta: Meta<typeof PaymentCard> = { title: 'Components/PaymentCard', component: PaymentCard };
export default meta;
type Story = StoryObj<typeof PaymentCard>;

export const Default: Story = { args: { cardNumber: '4111111111111111', cardHolder: 'أحمد محمد', expiry: '12/28', brand: 'visa' } };
export const Mastercard: Story = { args: { cardNumber: '5500000000000004', cardHolder: 'سارة أحمد', expiry: '08/27', brand: 'mastercard' } };
