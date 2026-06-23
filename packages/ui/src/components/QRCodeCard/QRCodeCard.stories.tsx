import type { Meta, StoryObj } from '@storybook/react';
import { QRCodeCard } from './QRCodeCard';

const meta: Meta<typeof QRCodeCard> = { title: 'Components/QRCodeCard', component: QRCodeCard };
export default meta;
type Story = StoryObj<typeof QRCodeCard>;

export const Default: Story = { args: { qrValue: 'BK-2024-001-أحمد', bookingId: 'BK-2024-001' } };
