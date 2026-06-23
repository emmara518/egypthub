import type { Meta, StoryObj } from '@storybook/react';
import { SmartSuggestions } from './SmartSuggestions';

const meta: Meta<typeof SmartSuggestions> = {
  title: 'Components/SmartSuggestions',
  component: SmartSuggestions,
};

export default meta;
type Story = StoryObj<typeof SmartSuggestions>;

export const Default: Story = {
  args: {
    suggestions: [
      { id: '1', text: 'زيارة الأهرامات', category: 'معالم سياحية', icon: '🏛️' },
      { id: '2', text: 'رحلة نيلية في القاهرة', category: 'أنشطة', icon: '⛵' },
      { id: '3', text: 'جولة في الأقصر', category: 'وجهات', icon: '🏺' },
      { id: '4', text: 'تذوق المأكولات المصرية', category: 'تجارب', icon: '🍽️' },
    ],
    onSelect: (s) => alert(s.text),
  },
};
