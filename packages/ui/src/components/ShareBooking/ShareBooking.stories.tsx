import type { Meta, StoryObj } from '@storybook/react';
import { ShareBooking } from './ShareBooking';

const meta: Meta<typeof ShareBooking> = { title: 'Components/ShareBooking', component: ShareBooking };
export default meta;
type Story = StoryObj<typeof ShareBooking>;

export const Default: Story = { args: { url: 'https://egypthub.com/trip/BK-2024-001', message: 'شاهد رحلتي على إيجيبت هب!' } };
