import type { Meta, StoryObj } from '@storybook/react';
import { GuestCounter } from './GuestCounter';

const meta: Meta<typeof GuestCounter> = { title: 'Components/GuestCounter', component: GuestCounter };
export default meta;
type Story = StoryObj<typeof GuestCounter>;

export const Default: Story = { args: { value: 2, onChange: (v) => console.log(v) } };
