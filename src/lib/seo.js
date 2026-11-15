import { cache } from 'react';
import { client } from '@/sanity/lib/client';
import { urlForOptimized } from '@/sanity/lib/image';
import { SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION } from './site';

export { SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION };

/**
 * Imagen social por defecto: el hero de la portada, recortado a 1200x630.
 * Se cachea para no repetir la consulta en cada generateMetadata.
 */
export const getDefaultOgImage = cache(async () => {
  const home = await client.fetch(
    `*[_id == "home"][0]{ heroImage }`,
    {},
    { next: { tags: ['home'] } }
  );

  if (!home?.heroImage?.asset) return null;

  return urlForOptimized(home.heroImage, {
    width: 1200,
    height: 630,
    quality: 80,
    fit: 'crop',
  });
});

/**
 * Metadatos coherentes para cada página: título, descripción, canonical,
 * Open Graph y Twitter Card. `metadataBase` se define en el layout.
 */
export async function buildMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = null,
  type = 'website',
}) {
  const ogImage = image || (await getDefaultOgImage());
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const images = ogImage
    ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      locale: 'es_ES',
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
