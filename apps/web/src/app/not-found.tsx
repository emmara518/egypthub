import Link from 'next/link';
import { PyramidIcon } from '@/components/EgyptianIcons';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto rounded-full bg-theme-gold/10 flex items-center justify-center mb-6">
          <PyramidIcon className="w-10 h-10 text-theme-gold" />
        </div>
        <h1 className="text-4xl font-bold font-playfair text-theme mb-2">404</h1>
        <p className="text-theme-secondary font-cairo text-sm mb-2">الصفحة دي مش موجودة</p>
        <p className="text-theme-muted font-cairo text-xs mb-8">يمكن تكون اتحذفت أو الرابط غلط</p>
        <Link href="/"
          className="inline-block px-8 py-3 rounded-xl bg-gradient-gold text-dark-900 font-bold text-sm font-cairo hover:brightness-110 transition-all">
          الرجوع للرئيسية
        </Link>
      </div>
    </div>
  );
}
