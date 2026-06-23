import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isError: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isRequired: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: 'أدخل النص هنا' },
};

export const WithLabel: Story = {
  args: { label: 'البريد الإلكتروني', placeholder: 'example@email.com' },
};

export const WithIcon: Story = {
  args: { leftIcon: '🔍', placeholder: 'بحث...' },
};

export const WithSuffix: Story = {
  args: { suffix: 'EGP', placeholder: 'المبلغ', type: 'number' },
};

export const Error: Story = {
  args: { isError: true, errorMessage: 'هذا الحقل مطلوب', placeholder: 'الاسم' },
};

export const Disabled: Story = {
  args: { isDisabled: true, value: 'غير متاح' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="sm" placeholder="صغير" />
      <Input size="md" placeholder="متوسط" />
      <Input size="lg" placeholder="كبير" />
    </div>
  ),
};
