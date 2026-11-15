import { SITE_URL } from '@/lib/site';

/**
 * Mapa del sitio. Las rutas son fijas (no hay páginas de proyecto
 * individuales), así que se listan a mano.
 */
export default function sitemap() {
  const now = new Date();

  const routes = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/portfolio', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/portfolio/propios', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/portfolio/externos', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/sobre-mi', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/equipo', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/estudios', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/contacto', changeFrequency: 'yearly', priority: 0.5 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
