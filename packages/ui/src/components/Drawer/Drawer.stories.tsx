import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    position: { control: 'select', options: ['right', 'left', 'bottom'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
    isDismissable: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Right: Story = {
  args: {
    isOpen: true,
    position: 'right',
    title: 'قائمة التنقل',
    children: <p className="text-text-secondary">محتوى القائمة الجانبية</p>,
  },
};

export const Left: Story = {
  args: {
    isOpen: true,
    position: 'left',
    title: 'بحث',
    children: <p className="text-text-secondary">لوحة البحث الجانبية</p>,
  },
};

export const Bottom: Story = {
  args: {
    isOpen: true,
    position: 'bottom',
    size: 'md',
    title: 'خيارات إضافية',
    children: (
      <div className="flex flex-col gap-3">
        <button type="button" className="p-3 bg-surface rounded-lg text-right">تعديل</button>
        <button type="button" className="p-3 bg-surface rounded-lg text-right">مشاركة</button>
        <button type="button" className="p-3 bg-surface rounded-lg text-right text-error">حذف</button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)} className="px-4 py-2 bg-gold text-text-inverse rounded-lg">
          افتح الدرج
        </button>
        <Drawer isOpen={open} onClose={() => setOpen(false)} title="درج تفاعلي">
          <p>اسحب لأسفل أو اضغط Esc للإغلاق</p>
        </Drawer>
      </>
    );
  },
};
