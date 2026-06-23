import { HiCalendar, HiTag, HiOfficeBuilding, HiEye } from 'react-icons/hi';

export default function PartnerDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">أهلاً بيك يا شريك!</h1>
        <p className="text-gray-500">من هنا تدير منشأتك وعروضك وحجوزاتك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-50 text-blue-600 rounded-xl p-3">
              <HiCalendar className="text-xl" />
            </div>
          </div>
          <p className="text-2xl font-bold text-primary-500">0</p>
          <p className="text-sm text-gray-500">حجوزات النهاردة</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-50 text-green-600 rounded-xl p-3">
              <HiEye className="text-xl" />
            </div>
          </div>
          <p className="text-2xl font-bold text-primary-500">0</p>
          <p className="text-sm text-gray-500">كل الحجوزات</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-amber-50 text-amber-600 rounded-xl p-3">
              <HiTag className="text-xl" />
            </div>
          </div>
          <p className="text-2xl font-bold text-primary-500">0</p>
          <p className="text-sm text-gray-500">العروض النشطة</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-50 text-purple-600 rounded-xl p-3">
              <HiOfficeBuilding className="text-xl" />
            </div>
          </div>
          <p className="text-2xl font-bold text-primary-500">1</p>
          <p className="text-sm text-gray-500">المنشآت</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-primary-500 mb-4">آخر الحجوزات</h2>
        <div className="text-center py-8 text-gray-400">
          <HiCalendar className="text-4xl mx-auto mb-2 text-gray-300" />
          <p>لسه مفيش حجوزات جديدة</p>
        </div>
      </div>
    </div>
  );
}
