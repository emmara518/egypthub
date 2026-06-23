import type { Meta, StoryObj } from '@storybook/react';
import { PointsCard } from './PointsCard';

const meta: Meta<typeof PointsCard> = { title: 'Components/PointsCard', component: PointsCard };
export default meta;
type Story = StoryObj<typeof PointsCard>;

export const Gold: Story = { args: { points: 3200, tier: 'gold', nextTier: 'بلاتيني', pointsToNext: 800 } };
export const Bronze: Story = { args: { points: 450, tier: 'bronze', nextTier: 'فضي', pointsToNext: 550 } };
