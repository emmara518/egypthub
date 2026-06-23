import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { AvatarGroup } from './AvatarGroup';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    status: { control: 'select', options: ['online', 'offline', 'away', undefined] },
    isPremium: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/120', name: 'Ahmed', alt: 'أحمد' },
};

export const WithInitials: Story = {
  args: { name: 'Ahmed' },
};

export const WithStatus: Story = {
  args: { name: 'Sarah', status: 'online' },
};

export const Premium: Story = {
  args: { name: 'VIP', isPremium: true, status: 'online' },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" name="XS" />
      <Avatar size="sm" name="SM" />
      <Avatar size="md" name="MD" />
      <Avatar size="lg" name="LG" />
      <Avatar size="xl" name="XL" />
      <Avatar size="2xl" name="2X" />
    </div>
  ),
};

export const Statuses: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar name="Online" status="online" />
      <Avatar name="Offline" status="offline" />
      <Avatar name="Away" status="away" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup
      avatars={[
        { name: 'أحمد' },
        { name: 'سارة' },
        { name: 'محمد' },
        { name: 'نور' },
        { name: 'علي' },
      ]}
      max={4}
    />
  ),
};
