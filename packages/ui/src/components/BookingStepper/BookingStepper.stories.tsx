import type { Meta, StoryObj } from '@storybook/react';
import { BookingStepper } from './BookingStepper';

const meta: Meta<typeof BookingStepper> = { title: 'Components/BookingStepper', component: BookingStepper };
export default meta;
type Story = StoryObj<typeof BookingStepper>;

export const Default: Story = {
  args: { steps: [{ id: 'details', label: 'التفاصيل' }, { id: 'payment', label: 'الدفع' }, { id: 'confirm', label: 'التأكيد' }], currentStep: 'details' },
};

export const Midway: Story = {
  args: { steps: [{ id: 'details', label: 'التفاصيل' }, { id: 'payment', label: 'الدفع' }, { id: 'confirm', label: 'التأكيد' }], currentStep: 'payment' },
};
