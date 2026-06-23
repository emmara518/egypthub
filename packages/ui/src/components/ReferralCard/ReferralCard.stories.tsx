import type { Meta, StoryObj } from '@storybook/react';
import { ReferralCard } from './ReferralCard';

const meta: Meta<typeof ReferralCard> = { title: 'Components/ReferralCard', component: ReferralCard };
export default meta;
type Story = StoryObj<typeof ReferralCard>;

export const Default: Story = { args: { referralCode: 'EGYPT2024', rewardDescription: 'احصل على $25 لكل صديق يحجز', shareUrl: 'https://egypthub.com/refer/EGYPT2024', onDismiss: () => alert('تم الإغلاق') } };
