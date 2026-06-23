import type { Meta, StoryObj } from '@storybook/react';
import { TripPlanner } from './TripPlanner';
import { TripBudgetSelector } from '../TripBudgetSelector';
import { TripDurationSelector } from '../TripDurationSelector';
import { TripCompanionSelector } from '../TripCompanionSelector';

const meta: Meta<typeof TripPlanner> = {
  title: 'Components/TripPlanner',
  component: TripPlanner,
};

export default meta;
type Story = StoryObj<typeof TripPlanner>;

export const Default: Story = {
  render: () => (
    <TripPlanner
      steps={[
        { id: 'budget', label: 'الميزانية', icon: '💰' },
        { id: 'duration', label: 'المدة', icon: '📅' },
        { id: 'companions', label: 'الرفقة', icon: '👥' },
      ]}
      currentStep="budget"
    >
      <TripBudgetSelector value="moderate" onChange={() => {}} />
    </TripPlanner>
  ),
};

export const DurationStep: Story = {
  render: () => (
    <TripPlanner
      steps={[
        { id: 'budget', label: 'الميزانية', icon: '💰' },
        { id: 'duration', label: 'المدة', icon: '📅' },
        { id: 'companions', label: 'الرفقة', icon: '👥' },
      ]}
      currentStep="duration"
    >
      <TripDurationSelector value={7} onChange={() => {}} />
    </TripPlanner>
  ),
};
