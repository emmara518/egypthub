import type { Meta, StoryObj } from '@storybook/react';
import { SuggestionChips } from './SuggestionChips';

const meta: Meta<typeof SuggestionChips> = {
  title: 'Components/SuggestionChips',
  component: SuggestionChips,
};

export default meta;
type Story = StoryObj<typeof SuggestionChips>;

export const Default: Story = {
  args: {
    suggestions: ['الأهرامات', 'الأقصر', 'الغردقة', 'رحلة نيلية', 'جولة آثار'],
    onSelect: (s: string) => alert(s),
  },
};
