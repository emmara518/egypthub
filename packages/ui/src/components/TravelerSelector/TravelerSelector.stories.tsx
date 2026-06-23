import type { Meta, StoryObj } from '@storybook/react';
import { TravelerSelector } from './TravelerSelector';

const meta: Meta<typeof TravelerSelector> = { title: 'Components/TravelerSelector', component: TravelerSelector };
export default meta;
type Story = StoryObj<typeof TravelerSelector>;

export const Default: Story = {
  args: { types: [{ id: 'adults', label: 'بالغين', description: '13 سنة فأكثر' }, { id: 'children', label: 'أطفال', description: '2-12 سنة' }, { id: 'infants', label: 'رضع', description: 'أقل من سنتين' }], values: { adults: 2, children: 0, infants: 0 }, onChange: (id, v) => console.log(id, v) },
};
