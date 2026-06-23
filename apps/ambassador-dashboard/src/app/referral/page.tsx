'use client';

import { useState } from 'react';
import { HiLink, HiClipboardCopy, HiShare, HiChartBar, HiUserGroup, HiCheck } from 'react-icons/hi';

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://egypthub.com/ref/NORSHARM';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.getElementById('referral-input') as HTMLInputElement;
      if (input) { input.select(); document.execCommand('copy'); }
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'انضم لمصر هب', text: 'احجز أجمل الأماكن في مصر', url: referralLink });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">الرابط بتاعي</h1>
        <p className="text-gray-500">شارك الرابط مع أصحابك واكسب عمولة على كل حجز</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-1">نقرات الرابط</p>
          <p className="text-3xl font-bold text-primary-500">0</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-1">تسجيلات عبر الرابط</p>
          <p className="text-3xl font-bold text-primary-500">0</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-1">حجوزات تمت</p>
          <p className="text-3xl font-bold text-primary-500">0</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-primary-500 mb-4">رابط الدعوة بتاعك</h2>
        <div className="flex items-center gap-2 bg-beige-50 rounded-xl p-3 border border-secondary-200 mb-4">
          <input
            id="referral-input"
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 ltr text-left"
            dir="ltr"
          />
          <button
            onClick={copyLink}
            className="flex items-center gap-2 bg-secondary-400 text-primary-800 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-secondary-300 transition-colors"
          >
            {copied ? <HiCheck className="text-lg" /> : <HiClipboardCopy className="text-lg" />}
            {copied ? 'تم النسخ' : 'انسخ'}
          </button>
        </div>

        <button
          onClick={shareLink}
          className="flex items-center gap-2 bg-primary-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors"
        >
          <HiShare className="text-lg" />
          شارك الرابط
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-primary-500 mb-4">ازاي تكسب أكتر؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-beige-50 rounded-xl">
            <div className="bg-secondary-400 text-primary-800 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <p className="font-semibold text-gray-800">شارك الرابط</p>
              <p className="text-sm text-gray-500">انشره على واتساب وفيسبوك وكل حتة</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-beige-50 rounded-xl">
            <div className="bg-secondary-400 text-primary-800 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <p className="font-semibold text-gray-800">اصحابك يسجلوا</p>
              <p className="text-sm text-gray-500">لما يدخلوا مصر هب من رابطك</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-beige-50 rounded-xl">
            <div className="bg-secondary-400 text-primary-800 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <p className="font-semibold text-gray-800">هما بيحجزوا</p>
              <p className="text-sm text-gray-500">بيحجزوا في أي منشأة على المنصة</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-beige-50 rounded-xl">
            <div className="bg-secondary-400 text-primary-800 rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">4</div>
            <div>
              <p className="font-semibold text-gray-800">انت بتكسب</p>
              <p className="text-sm text-gray-500">بتاخد 7% عمولة على كل حجز</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
