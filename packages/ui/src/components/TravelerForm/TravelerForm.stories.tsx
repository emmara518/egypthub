import type { Meta, StoryObj } from '@storybook/react';
import { TravelerForm } from './TravelerForm';

const meta: Meta<typeof TravelerForm> = { title: 'Components/TravelerForm', component: TravelerForm };
export default meta;
type Story = StoryObj<typeof TravelerForm>;

export const Default: Story = { args: { index: 0, type: 'بالغ', onChange: (v) => console.log(v) } };
