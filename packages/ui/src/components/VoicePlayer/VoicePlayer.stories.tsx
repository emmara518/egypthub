import type { Meta, StoryObj } from '@storybook/react';
import { VoicePlayer } from './VoicePlayer';

const meta: Meta<typeof VoicePlayer> = {
  title: 'Components/VoicePlayer',
  component: VoicePlayer,
};

export default meta;
type Story = StoryObj<typeof VoicePlayer>;

export const Default: Story = {};

export const Playing: Story = {
  args: { isPlaying: true },
};
