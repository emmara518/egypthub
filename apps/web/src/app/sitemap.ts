import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://egypthub.co';

  const staticRoutes = [
    { url: '/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: '/destinations', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: '/experiences', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: '/stories', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/explore', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: '/ai-concierge', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: '/booking', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: '/offers', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.7 },
    { url: '/search', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.6 },
    { url: '/partners', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: '/about', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: '/auth/login', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: '/auth/register', lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const destinations = [
    'cairo', 'luxor', 'aswan', 'sharm-el-sheikh', 'hurghada', 'alexandria', 'dahab', 'siwa-oasis', 'marsa-alam', 'abu-simbel',
  ];
  const destinationRoutes = destinations.map((slug) => ({
    url: `${baseUrl}/destinations/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const experiences = [
    'nile-cruise', 'pyramids-tour', 'red-sea-diving', 'desert-safari', 'luxor-temples',
  ];
  const experienceRoutes = experiences.map((slug) => ({
    url: `${baseUrl}/experiences/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...destinationRoutes, ...experienceRoutes].map((route) => ({
    ...route,
    url: route.url.startsWith('http') ? route.url : `${baseUrl}${route.url}`,
  }));
}
