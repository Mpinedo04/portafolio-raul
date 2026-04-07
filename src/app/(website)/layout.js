import './globals.css';
import { client } from '@/sanity/lib/client';
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import MouseEffect from '@/components/MouseEffect';
import ScrollProgress from '@/components/ScrollProgress';

export const revalidate = 10;

export async function generateMetadata() {
  const settings = await client.fetch(`*[_type == "settings"][0]`, {}, { next: { tags: ['settings'] } });
  const seo = settings?.seo || {};

  return {
    title: seo.metaTitle || 'Raúl García | Filmmaker & Audiovisual Portfolio',
    description: seo.metaDescription || 'Portfolio profesional de Raúl García, un creador audiovisual especializado en cortometrajes, documentales y edición de vídeo.',
  };
}

export default async function RootLayout({ children }) {
  const isDraftMode = (await draftMode()).isEnabled;
  const settings = await client.fetch(
    `*[_id == "settings"][0]{ headingFont, bodyFont, backgroundGradient }`,
    {},
    { 
      perspective: isDraftMode ? 'previewDrafts' : 'published',
      next: { revalidate: 0, tags: ['settings'] } 
    }
  ) || {};
  
  const headingFont = settings.headingFont || 'Poppins';
  const bodyFont = settings.bodyFont || 'Montserrat';
  const rawGradient = settings.backgroundGradient || 'gris-premium';
  // Robust dictionary lookup: Stega metadata includes invisible characters that break strict string equality.
  // We look for our known keys within the string to bypass this.
  const backgroundGradient = ['gris-premium', 'azul-oscuro', 'negro-puro', 'grafito'].find(
    key => rawGradient.includes(key)
  ) || 'gris-premium';

  const GRADIENTS = {
    'gris-premium': 'linear-gradient(180deg, #383838 0%, #1a1a1a 45%, #060606 100%)',
    'azul-oscuro':  'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 50%, #050505 100%)',
    'negro-puro':   'linear-gradient(180deg, #111111 0%, #050505 50%, #000000 100%)',
    'grafito':      'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
  };

  const DEFAULT_GRADIENT = GRADIENTS['gris-premium'];
  const gradientValue = GRADIENTS[backgroundGradient] ?? DEFAULT_GRADIENT;

  // Build the dynamic Google Font URL
  // We request weights 400, 500, 600, 700, 800, 900 to ensure headings look correct for any chosen font.
  // Helvetica is a system font, so it doesn't need to be loaded from Google Fonts.
  const uniqueFonts = Array.from(new Set([headingFont, bodyFont])).filter(f => f !== 'Helvetica');
  let fontUrl = 'https://fonts.googleapis.com/css2?';
  
  if (uniqueFonts.length > 0) {
    uniqueFonts.forEach((font, index) => {
      fontUrl += `family=${font}:wght@400;500;600;700;800;900`;
      if (index < uniqueFonts.length - 1) fontUrl += '&';
    });
    fontUrl += '&display=swap';
  } else {
    fontUrl = null;
  }

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {fontUrl && <link href={fontUrl} rel="stylesheet" />}
      </head>
      <body 
        style={{
          '--font-heading': `'${headingFont.replace('+', ' ')}', sans-serif`,
          '--font-body': `'${bodyFont.replace('+', ' ')}', sans-serif`,
          '--gradient-bg': gradientValue,
        }}
        data-bg-key={backgroundGradient}
        data-raw-bg={settings.backgroundGradient || "not-found"}
      >
        <ScrollProgress />
        <MouseEffect />
        <main>{children}</main>
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
