import type { Meta, StoryObj } from '@storybook/react';
import { IntentSelector } from './IntentSelector';

const meta: Meta<typeof IntentSelector> = {
  title: 'Components/IntentSelector',
  component: IntentSelector,
  argTypes: {
    selectedId: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof IntentSelector>;

export const Default: Story = {
  args: {
    options: [
      { id: 'culture', label: 'ثقافة', description: 'جولات أثرية وتاريخية', icon: '🏛️' },
      { id: 'adventure', label: 'مغامرة', description: 'أنشطة وسفاري', icon: '🧗' },
      { id: 'relaxation', label: 'استرخاء', description: 'منتجعات وشواطئ', icon: '🏖️' },
      { id: 'culinary', label: 'مأكولات', description: 'تجارب طهي', icon: '🍽️' },
    ],
    selectedId: 'culture',
    onSelect: (id: string) => alert(id),
  },
};
