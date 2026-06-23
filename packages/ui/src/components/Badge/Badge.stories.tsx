import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    color: { control: 'select', options: ['gold', 'success', 'error', 'warning', 'info', 'neutral'] },
    variant: { control: 'select', options: ['default', 'dot', 'outline', 'count'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'جديد' },
};

export const Gold: Story = {
  args: { color: 'gold', children: 'مميز' },
};

export const Success: Story = {
  args: { color: 'success', children: 'مكتمل' },
};

export const Error: Story = {
  args: { color: 'error', children: 'خطأ' },
};

export const Warning: Story = {
  args: { color: 'warning', children: 'قيد الانتظار' },
};

export const Info: Story = {
  args: { color: 'info', children: 'معلومات' },
};

export const Dot: Story = {
  args: { variant: 'dot', color: 'success' },
};

export const Outline: Story = {
  args: { variant: 'outline', color: 'gold', children: 'مميز' },
};

export const Count: Story = {
  args: { variant: 'count', children: 42 },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="gold">ذهبي</Badge>
      <Badge color="success">ناجح</Badge>
      <Badge color="error">خطأ</Badge>
      <Badge color="warning">تحذير</Badge>
      <Badge color="info">معلومات</Badge>
      <Badge color="neutral">محايد</Badge>
    </div>
  ),
};
