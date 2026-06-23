import type { Meta, StoryObj } from '@storybook/react';
import { BookingReference } from './BookingReference';

const meta: Meta<typeof BookingReference> = { title: 'Components/BookingReference', component: BookingReference };
export default meta;
type Story = StoryObj<typeof BookingReference>;

export const Default: Story = { args: { referenceCode: 'BK-2024-001', label: 'رمز الحجز', onCopy: (code) => alert(`تم نسخ ${code}`) } };
