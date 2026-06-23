import type { Meta, StoryObj } from '@storybook/react';
import { TripPreferencesSelector } from './TripPreferencesSelector';

const meta: Meta<typeof TripPreferencesSelector> = {
  title: 'Components/TripPreferencesSelector',
  component: TripPreferencesSelector,
};

export default meta;
type Story = StoryObj<typeof TripPreferencesSelector>;

export const Default: Story = {
  args: {
    preferences: [
      { id: 'history', label: 'تاريخ', icon: '🏛️' },
      { id: 'food', label: 'مأكولات', icon: '🍽️' },
      { id: 'nature', label: 'طبيعة', icon: '🌿' },
      { id: 'shopping', label: 'تسوق', icon: '🛍️' },
      { id: 'adventure', label: 'مغامرة', icon: '🧗' },
      { id: 'culture', label: 'ثقافة', icon: '🎭' },
    ],
    selectedIds: ['history', 'food'],
    onChange: (ids) => alert(ids.join(', ')),
    max: 4,
  },
};
