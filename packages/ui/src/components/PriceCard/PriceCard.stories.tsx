import type { Meta, StoryObj } from '@storybook/react';
import { PriceCard } from './PriceCard';

const meta: Meta<typeof PriceCard> = { title: 'Components/PriceCard', component: PriceCard };
export default meta;
type Story = StoryObj<typeof PriceCard>;

export const Default: Story = { args: { price: '$299', originalPrice: '$399', description: 'للمسافر الفردي', badge: 'الأكثر طلباً', onSelect: () => alert('تم') } };

export const Featured: Story = { args: { price: '$499', originalPrice: '$599', description: 'باقة شاملة', badge: 'أفضل قيمة', isFeatured: true, onSelect: () => alert('تم') } };
