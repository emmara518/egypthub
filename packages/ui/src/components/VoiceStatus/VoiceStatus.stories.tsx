import type { Meta, StoryObj } from '@storybook/react';
import { VoiceStatus } from './VoiceStatus';

const meta: Meta<typeof VoiceStatus> = {
  title: 'Components/VoiceStatus',
  component: VoiceStatus,
  argTypes: {
    status: { control: 'select', options: ['idle', 'listening', 'processing', 'speaking', 'error'] },
  },
};

export default meta;
type Story = StoryObj<typeof VoiceStatus>;

export const Idle: Story = { args: { status: 'idle' } };
export const Listening: Story = { args: { status: 'listening' } };
export const Processing: Story = { args: { status: 'processing' } };
export const Speaking: Story = { args: { status: 'speaking' } };
export const Error: Story = { args: { status: 'error' } };
