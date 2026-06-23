import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutForm } from './CheckoutForm';

const meta: Meta<typeof CheckoutForm> = { title: 'Components/CheckoutForm', component: CheckoutForm };
export default meta;
type Story = StoryObj<typeof CheckoutForm>;

export const Default: Story = { args: { fields: [{ name: 'name', label: 'الاسم الكامل', required: true }, { name: 'email', label: 'البريد الإلكتروني', type: 'email' }, { name: 'phone', label: 'رقم الجوال', type: 'tel' }], onSubmit: (v) => alert(JSON.stringify(v)) } };
