import type { Meta, StoryObj } from '@storybook/react';
import { BillingAddress } from './BillingAddress';

const meta: Meta<typeof BillingAddress> = { title: 'Components/BillingAddress', component: BillingAddress };
export default meta;
type Story = StoryObj<typeof BillingAddress>;

export const Default: Story = { args: { country: 'السعودية', city: 'الرياض', onChange: (f, v) => console.log(f, v) } };
