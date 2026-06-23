import type { Meta, StoryObj } from '@storybook/react';
import { AIWelcome } from './AIWelcome';

const meta: Meta<typeof AIWelcome> = {
  title: 'Components/AIWelcome',
  component: AIWelcome,
};

export default meta;
type Story = StoryObj<typeof AIWelcome>;

export const Default: Story = {
  args: { userName: 'أحمد', avatar: '/avatar.jpg' },
};
