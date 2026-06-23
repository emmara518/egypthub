import Link from 'next/link';

const footerLinks = {
  explore: {
    title: 'استكشف',
    links: ['الوجهات', 'التجارب', 'القصص', 'العروض', 'الخريطة'],
  },
  company: {
    title: 'الشركة',
    links: ['عن مصر هب', 'الوظائف', 'البيانات الصحفية', 'المدونة', 'اتصل بنا'],
  },
  support: {
    title: 'الدعم',
    links: ['مركز المساعدة', 'الأمان', 'الإلغاء', 'كوفيد-19', 'إمكانية الوصول'],
  },
  partners: {
    title: 'الشركاء',
    links: ['أضف نشاطك التجاري', 'بوابة الشركاء', 'برنامج السفراء', 'التسويق بالعمولة', 'API'],
  },
};

export default function Footer() {
  return (
    <footer className="bg-theme-bg border-t border-theme-gold/10 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-theme-gold/10 border border-theme-gold/30 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-bold font-poppins">
                <span className="text-theme">EGYPT</span>
                <span className="text-theme-gold">HUB</span>
              </span>
            </Link>
            <p className="text-theme-secondary text-sm font-cairo leading-relaxed mb-6">
              بوابتك إلى تجارب مصر الأصيلة. اكتشف، خطط، واحجز بثقة.
            </p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-theme-card border border-theme-gold/15 flex items-center justify-center text-theme-secondary hover:text-theme-gold hover:border-theme-gold/40 transition-all duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {Object.values(footerLinks).map((group) => (
            <div key={group.title}>
              <h4 className="text-theme font-bold font-cairo text-sm mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-theme-secondary hover:text-theme-gold transition-colors duration-200 text-sm font-cairo"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-theme-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <p className="text-theme-secondary text-sm font-cairo">
              &copy; {new Date().getFullYear()} EGYPTHUB. جميع الحقوق محفوظة.
            </p>
            <Link href="#" className="text-theme-secondary hover:text-theme-gold text-sm transition-colors">الخصوصية</Link>
            <Link href="#" className="text-theme-secondary hover:text-theme-gold text-sm transition-colors">الشروط</Link>
            <Link href="#" className="text-theme-secondary hover:text-theme-gold text-sm transition-colors">خريطة الموقع</Link>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-theme-secondary text-xs font-cairo">طرق الدفع المقبولة:</p>
            {['Visa', 'Mastercard', 'Meeza', 'Fawry', 'Apple', 'PayPal'].map((p) => (
              <span key={p} className="px-2 py-1 rounded text-xs bg-theme-card text-theme-secondary border border-theme-gold/10">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
