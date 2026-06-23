import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    variant: { control: 'select', options: ['text', 'text-sm', 'heading', 'circle', 'card', 'image', 'table', 'button'] },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: { variant: 'text', width: '100%' },
};

export const Heading: Story = {
  args: { variant: 'heading' },
};

export const Circle: Story = {
  args: { variant: 'circle' },
};

export const Card: Story = {
  args: { variant: 'card' },
};

export const Image: Story = {
  args: { variant: 'image' },
};

export const Button: Story = {
  args: { variant: 'button' },
};

export const Table: Story = {
  args: { variant: 'table' },
};

export const Composable: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4 w-full max-w-sm">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton variant="heading" />
          <Skeleton variant="text-sm" width="80%" />
        </div>
      </div>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="card" />
    </div>
  ),
};
