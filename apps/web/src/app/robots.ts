import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/screens', '/api'] },
    ],
    sitemap: 'https://egypthub.co/sitemap.xml',
  };
}
