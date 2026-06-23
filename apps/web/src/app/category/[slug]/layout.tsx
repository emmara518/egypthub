const categoryNames = {
  restaurants: 'مطاعم',
  cafes: 'كافيهات',
  activities: 'أنشطة ومغامرات',
  shopping: 'تسوق وبازار',
  diving: 'غوص وسنوركلينج',
  hotels: 'فنادق ومنتجعات',
};

export function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({ slug }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
