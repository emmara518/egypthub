import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: { control: 'select', options: ['default', 'featured', 'glass'] },
    isHoverable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'محتوى البطاقة',
    style: { padding: '24px' },
  },
};

export const Featured: Story = {
  args: {
    variant: 'featured',
    children: 'بطاقة مميزة',
    style: { padding: '24px' },
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: 'بطاقة زجاجية',
    style: { padding: '24px' },
  },
};

export const Hoverable: Story = {
  args: {
    isHoverable: true,
    children: 'مرر فوقي',
    style: { padding: '24px' },
  },
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card>
      <CardHeader title="عنوان البطاقة" subtitle="وصف فرعي" action={<span>⚙️</span>} />
      <CardContent>
        <p>محتوى البطاقة الرئيسي هنا</p>
      </CardContent>
      <CardFooter>
        <button type="button">إلغاء</button>
        <button type="button">حفظ</button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Card variant="default" style={{ padding: '24px' }}>عادية</Card>
      <Card variant="featured" style={{ padding: '24px' }}>مميزة</Card>
      <Card variant="glass" style={{ padding: '24px' }}>زجاجية</Card>
    </div>
  ),
};
