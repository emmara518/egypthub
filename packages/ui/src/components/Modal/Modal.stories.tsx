import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full', 'fullscreen'] },
    isDismissable: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'تأكيد الحجز',
    description: 'هل أنت متأكد من رغبتك في حجز هذه التجربة؟',
    children: <p className="text-text-secondary">تفاصيل الحجز هنا</p>,
    footer: (
      <div className="flex justify-end gap-3">
        <button type="button" className="px-4 py-2 text-text-secondary">إلغاء</button>
        <button type="button" className="px-4 py-2 bg-gold text-text-inverse rounded-lg">تأكيد</button>
      </div>
    ),
  },
};

export const Small: Story = {
  args: {
    isOpen: true,
    size: 'sm',
    title: 'تأكيد',
    children: <p>تم بنجاح</p>,
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    size: 'lg',
    title: 'تفاصيل الحجز',
    children: (
      <div className="space-y-4">
        <p>محتوى طويل لتوضيح مساحة النافذة الكبيرة</p>
        <p>محتوى إضافي لعرض مساحة التمرير</p>
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
          افتح النافذة
        </button>
        <Modal isOpen={open} onClose={() => setOpen(false)} title="نافذة تفاعلية">
          <p>يمكنك إغلاق هذه النافذة بالضغط على Esc أو النقر خارجها</p>
        </Modal>
      </>
    );
  },
};
