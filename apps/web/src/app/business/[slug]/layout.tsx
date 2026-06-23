const businesses = {
  'abou-el-ala-fool': {},
  'deep-dive-center': {},
  'rizk-el-bahr-seafood': {},
};

export function generateStaticParams() {
  return Object.keys(businesses).map((slug) => ({ slug }));
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
