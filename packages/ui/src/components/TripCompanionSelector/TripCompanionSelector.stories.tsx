import type { Meta, StoryObj } from '@storybook/react';
import { TripCompanionSelector } from './TripCompanionSelector';

const meta: Meta<typeof TripCompanionSelector> = {
  title: 'Components/TripCompanionSelector',
  component: TripCompanionSelector,
};

export default meta;
type Story = StoryObj<typeof TripCompanionSelector>;

export const Default: Story = {
  args: { value: 'couple', onChange: (v) => alert(v) },
};
