import { cache } from 'react';
import { client } from './client';

/**
 * Ajustes globales de Sanity (header, footer, tipografía, banners y SEO).
 *
 * `cache()` deduplica la consulta dentro de la misma petición, así que el
 * layout y las páginas pueden pedirla sin multiplicar las llamadas a Sanity.
 * La etiqueta `settings` permite revalidar todo con el webhook.
 */
export const getSiteSettings = cache(async () => {
  const settings = await client.fetch(
    `*[_type == "settings" && _id == "settings"][0]`,
    {},
    { next: { tags: ['settings'] } }
  );

  return settings || {};
});
