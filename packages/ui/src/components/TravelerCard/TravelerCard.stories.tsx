import type { Meta, StoryObj } from '@storybook/react';
import { TravelerCard } from './TravelerCard';

const meta: Meta<typeof TravelerCard> = { title: 'Components/TravelerCard', component: TravelerCard };
export default meta;
type Story = StoryObj<typeof TravelerCard>;

export const Default: Story = { args: { name: 'أحمد علي', type: 'بالغ', age: '32 سنة', passport: 'AB123456' } };

export const MainTraveler: Story = { args: { name: 'سارة محمد', type: 'بالغ', age: '28 سنة', isMain: true, passport: 'CD789012' } };
