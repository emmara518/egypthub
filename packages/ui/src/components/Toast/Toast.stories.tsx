import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider } from './ToastProvider';
import { ToastContainer } from './ToastComponent';
import { useToast } from './ToastProvider';

function ToastDemo() {
  const { toast, dismissAll } = useToast();

  return (
    <div className="flex flex-wrap gap-3 p-8">
      <button type="button" onClick={() => toast({ type: 'success', title: 'تم بنجاح', description: 'تم حفظ التغييرات' })}
        className="px-4 py-2 bg-success text-white rounded-lg">نجاح</button>
      <button type="button" onClick={() => toast({ type: 'error', title: 'خطأ', description: 'حدث خطأ غير متوقع' })}
        className="px-4 py-2 bg-error text-white rounded-lg">خطأ</button>
      <button type="button" onClick={() => toast({ type: 'warning', title: 'تنبيه', description: 'يرجى المراجعة' })}
        className="px-4 py-2 bg-warning text-white rounded-lg">تحذير</button>
      <button type="button" onClick={() => toast({ type: 'info', title: 'معلومة', description: 'تحديث جديد متاح' })}
        className="px-4 py-2 bg-info text-white rounded-lg">معلومات</button>
      <button type="button" onClick={() => toast({
        type: 'success', title: 'تم الحجز',
        action: { label: 'تراجع', onClick: () => {} }
      })}
        className="px-4 py-2 bg-gold text-text-inverse rounded-lg">مع إجراء</button>
      <button type="button" onClick={dismissAll}
        className="px-4 py-2 bg-surface border border-border rounded-lg">إخفاء الكل</button>
      <ToastContainer />
    </div>
  );
}

const meta: Meta = {
  title: 'Components/Toast',
  component: ToastDemo,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Types: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
