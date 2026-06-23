import type { Meta, StoryObj } from '@storybook/react';
import { BookingSidebar } from './BookingSidebar';

const meta: Meta<typeof BookingSidebar> = { title: 'Components/BookingSidebar', component: BookingSidebar };
export default meta;
type Story = StoryObj<typeof BookingSidebar>;

export const Default: Story = {
  render: () => (<BookingSidebar><p className="text-text-secondary text-body-sm">محتوى الشريط الجانبي</p></BookingSidebar>),
};
