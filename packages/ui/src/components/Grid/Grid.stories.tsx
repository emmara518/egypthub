import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: { cols: 3, gap: 4 },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-surface-elevated p-4 rounded-lg text-center">Item {i + 1}</div>
      ))}
    </Grid>
  ),
};
