import { HiCash, HiLink, HiStar, HiClipboardCopy } from 'react-icons/hi';

export default function AmbassadorDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">أهلاً بيك يا سفير!</h1>
        <p className="text-gray-500">دي لوحة تحكمك - من هنا تدير أرباحك وروابطك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-50 text-green-600 rounded-xl p-3">
              <HiCash className="text-2xl" />
            </div>
            <h3 className="font-semibold text-gray-700">إجمالي الأرباح</h3>
          </div>
          <p className="text-3xl font-bold text-primary-500">0 ج</p>
          <p className="text-sm text-gray-400 mt-1">من أول ما بدأت</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-50 text-amber-600 rounded-xl p-3">
              <HiStar className="text-2xl" />
            </div>
            <h3 className="font-semibold text-gray-700">المتاح للسحب</h3>
          </div>
          <p className="text-3xl font-bold text-secondary-500">0 ج</p>
          <p className="text-sm text-gray-400 mt-1">أقل مبلغ للسحب 100 ج</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-50 text-blue-600 rounded-xl p-3">
              <HiClipboardCopy className="text-2xl" />
            </div>
            <h3 className="font-semibold text-gray-700">نسبة العمولة</h3>
          </div>
          <p className="text-3xl font-bold text-primary-500">7%</p>
          <p className="text-sm text-gray-400 mt-1">على كل حجز</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-primary-500 mb-4">الرابط بتاعي</h2>
          <div className="flex items-center gap-2 bg-beige-50 rounded-xl p-3 border border-secondary-200">
            <input
              type="text"
              value="https://egypthub.com/ref/NORSHARM"
              readOnly
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
            <button className="bg-secondary-400 text-primary-800 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-secondary-300 transition-colors">
              انسخ
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-3">شارك الرابط مع أصدقائك واكسب عمولة على كل حجز</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-primary-500 mb-4">آخر الأرباح</h2>
          <div className="text-center py-8 text-gray-400">
            <HiCash className="text-4xl mx-auto mb-2 text-gray-300" />
            <p>لسه ما كسبتش حاجة. ابدأ شارك الرابط!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
