import type { Meta, StoryObj } from '@storybook/react';
import { WalletCard } from './WalletCard';

const meta: Meta<typeof WalletCard> = { title: 'Components/WalletCard', component: WalletCard };
export default meta;
type Story = StoryObj<typeof WalletCard>;

export const Default: Story = { args: { balance: '2,450', currency: '$', cardNumber: '4111111111111111', onTopUp: () => alert('شحن') } };
