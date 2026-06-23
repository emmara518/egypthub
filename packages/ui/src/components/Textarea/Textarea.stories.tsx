import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    isError: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    showCount: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { placeholder: 'اكتب رسالتك هنا...' },
};

export const WithLabel: Story = {
  args: { label: 'الوصف', placeholder: 'وصف قصير' },
};

export const WithCharacterCount: Story = {
  args: { showCount: true, maxLength: 200, placeholder: 'اكتب هنا...' },
};

export const Error: Story = {
  args: { isError: true, errorMessage: 'هذا الحقل مطلوب', placeholder: 'المحتوى' },
};

export const Disabled: Story = {
  args: { isDisabled: true, value: 'نص معطل' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea size="sm" placeholder="صغير" />
      <Textarea size="md" placeholder="متوسط" />
      <Textarea size="lg" placeholder="كبير" />
    </div>
  ),
};
