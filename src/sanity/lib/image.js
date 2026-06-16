import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './client';

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export function urlForOptimized(source, options = {}) {
  if (!source) return null;

  const {
    width,
    height,
    quality = 80,
    fit = 'max',
  } = options;

  let image = builder.image(source).auto('format').quality(quality);

  if (width) image = image.width(width);
  if (height) image = image.height(height);
  if (fit) image = image.fit(fit);

  return image.url();
}
