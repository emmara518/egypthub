import type { Meta, StoryObj } from '@storybook/react';
import { TripDurationSelector } from './TripDurationSelector';

const meta: Meta<typeof TripDurationSelector> = {
  title: 'Components/TripDurationSelector',
  component: TripDurationSelector,
};

export default meta;
type Story = StoryObj<typeof TripDurationSelector>;

export const Default: Story = {
  args: { value: 5, onChange: (v) => alert(v) },
};
