import type { Meta, StoryObj } from '@storybook/react';
import { VoiceWaveform } from './VoiceWaveform';

const meta: Meta<typeof VoiceWaveform> = {
  title: 'Components/VoiceWaveform',
  component: VoiceWaveform,
};

export default meta;
type Story = StoryObj<typeof VoiceWaveform>;

export const Default: Story = {};

export const Active: Story = {
  args: { isActive: true },
};
