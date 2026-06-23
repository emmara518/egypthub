import type { Meta, StoryObj } from '@storybook/react';
import { VoiceRecorder } from './VoiceRecorder';

const meta: Meta<typeof VoiceRecorder> = {
  title: 'Components/VoiceRecorder',
  component: VoiceRecorder,
};

export default meta;
type Story = StoryObj<typeof VoiceRecorder>;

export const Default: Story = {
  args: { onStart: () => console.log('start'), onStop: (d) => console.log('stop', d) },
};

export const Recording: Story = {
  args: { isRecording: true },
};
