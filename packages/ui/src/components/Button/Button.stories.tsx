import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'icon'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isLoading: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'احجز الآن' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'اكتشف المزيد' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'إلغاء' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'حذف' },
};

export const Loading: Story = {
  args: { variant: 'primary', isLoading: true, children: 'جاري التحميل...' },
};

export const Disabled: Story = {
  args: { variant: 'primary', isDisabled: true, children: 'غير متاح' },
};

export const WithIcon: Story = {
  args: { variant: 'primary', leftIcon: '→', children: 'التالي', size: 'lg' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">صغير</Button>
      <Button size="md">متوسط</Button>
      <Button size="lg">كبير</Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">أساسي</Button>
      <Button variant="secondary">ثانوي</Button>
      <Button variant="ghost">شفاف</Button>
      <Button variant="danger">خطر</Button>
      <Button variant="icon" aria-label="Search">🔍</Button>
    </div>
  ),
};
