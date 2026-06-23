import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    variant: { control: 'select', options: ['default', 'rich'] },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  args: {
    content: 'تلميح في الأعلى',
    position: 'top',
    children: <button type="button" className="px-4 py-2 bg-surface border border-border rounded-lg">مرر فوقي</button>,
  },
};

export const Bottom: Story = {
  args: {
    content: 'تلميح في الأسفل',
    position: 'bottom',
    children: <button type="button" className="px-4 py-2 bg-surface border border-border rounded-lg">مرر فوقي</button>,
  },
};

export const Rich: Story = {
  args: {
    variant: 'rich',
    position: 'right',
    content: (
      <div>
        <p className="font-semibold text-text-primary">معلومات إضافية</p>
        <p className="text-text-secondary text-body-sm">وصف تفصيلي للتلميح</p>
      </div>
    ),
    children: <button type="button" className="px-4 py-2 bg-surface border border-border rounded-lg">تلميح غني</button>,
  },
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-8 p-16">
      <Tooltip content="أعلى" position="top">
        <button type="button" className="px-3 py-1 bg-surface border rounded">أعلى</button>
      </Tooltip>
      <Tooltip content="أسفل" position="bottom">
        <button type="button" className="px-3 py-1 bg-surface border rounded">أسفل</button>
      </Tooltip>
      <Tooltip content="يسار" position="left">
        <button type="button" className="px-3 py-1 bg-surface border rounded">يسار</button>
      </Tooltip>
      <Tooltip content="يمين" position="right">
        <button type="button" className="px-3 py-1 bg-surface border rounded">يمين</button>
      </Tooltip>
    </div>
  ),
};
