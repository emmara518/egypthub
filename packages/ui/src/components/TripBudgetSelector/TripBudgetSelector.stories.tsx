import type { Meta, StoryObj } from '@storybook/react';
import { TripBudgetSelector } from './TripBudgetSelector';

const meta: Meta<typeof TripBudgetSelector> = {
  title: 'Components/TripBudgetSelector',
  component: TripBudgetSelector,
};

export default meta;
type Story = StoryObj<typeof TripBudgetSelector>;

export const Default: Story = {
  args: { value: 'moderate', onChange: (v) => alert(v) },
};
