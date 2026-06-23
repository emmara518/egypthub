import type { Meta, StoryObj } from '@storybook/react';
import { RewardBadge } from './RewardBadge';

const meta: Meta<typeof RewardBadge> = { title: 'Components/RewardBadge', component: RewardBadge };
export default meta;
type Story = StoryObj<typeof RewardBadge>;

export const Default: Story = { args: { rewards: [{ id: '1', label: 'خصم 10%', icon: '🎉', description: 'على جميع الرحلات' }, { id: '2', label: 'ترقية مجانية', icon: '⬆️', isLocked: true }, { id: '3', label: 'جولة مجانية', icon: '🏛️', description: 'جولة إرشادية' }], onClaim: (id) => alert(`مطالبة ${id}`) } };
