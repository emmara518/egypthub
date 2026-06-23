import { HiUserGroup, HiStar, HiOfficeBuilding, HiCash } from 'react-icons/hi';

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">أهلاً بك يا أدمن</h1>
        <p className="text-gray-500">من هنا تدير مصر هب كلها</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-50 text-blue-600 rounded-xl p-3">
              <HiUserGroup className="text-xl" />
            </div>
          </div>
          <p className="text-2xl font-bold text-primary-500">1</p>
          <p className="text-sm text-gray-500">شركاء في الانتظار</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-amber-50 text-amber-600 rounded-xl p-3">
              <HiStar className="text-xl" />
            </div>
          </div>
          <p className="text-2xl font-bold text-primary-500">1</p>
          <p className="text-sm text-gray-500">سفراء نشطين</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-50 text-green-600 rounded-xl p-3">
              <HiOfficeBuilding className="text-xl" />
            </div>
          </div>
          <p className="text-2xl font-bold text-primary-500">5</p>
          <p className="text-sm text-gray-500">منشآت</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-50 text-purple-600 rounded-xl p-3">
              <HiCash className="text-xl" />
            </div>
          </div>
          <p className="text-2xl font-bold text-primary-500">0 ج</p>
          <p className="text-sm text-gray-500">إجمالي العمولات</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary-500">طلبات الشركاء الجديدة</h2>
            <span className="bg-red-50 text-red-500 text-xs px-2 py-1 rounded-full">1</span>
          </div>

          <div className="bg-beige-50 rounded-xl p-4 border border-secondary-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">فول وفلافل أبو العلا</p>
                <p className="text-sm text-gray-500">منذ يومين</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-green-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-green-600">
                  وافقت
                </button>
                <button className="bg-red-400 text-white px-4 py-1 rounded-lg text-sm hover:bg-red-500">
                  مرفوض
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-primary-500 mb-4">إعدادات سريعة</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">نسبة عمولة الشريك (افتراضي)</span>
              <span className="font-bold text-primary-500">10%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">نسبة عمولة السفير (افتراضي)</span>
              <span className="font-bold text-primary-500">5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">أقل مبلغ للسحب</span>
              <span className="font-bold text-primary-500">100 ج</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
