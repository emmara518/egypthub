import type { Meta, StoryObj } from '@storybook/react';
import { ChatComposer } from './ChatComposer';

const meta: Meta<typeof ChatComposer> = {
  title: 'Components/ChatComposer',
  component: ChatComposer,
};

export default meta;
type Story = StoryObj<typeof ChatComposer>;

export const Default: Story = {
  args: { onSend: (msg) => alert(msg) },
};

export const Disabled: Story = {
  args: { onSend: (msg) => alert(msg), isDisabled: true },
};
