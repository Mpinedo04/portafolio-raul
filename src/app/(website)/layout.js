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
    `*[_id == "settings"][0]{ logoFont, headingFont, subtitleFont, bodyFont, backgroundGradient }`,
    {},
    { 
      perspective: isDraftMode ? 'previewDrafts' : 'published',
      next: { revalidate: 0, tags: ['settings'] } 
    }
  ) || {};
  
  // Robust dictionary lookup: Stega metadata includes invisible characters that break strict string equality.
  // We look for our known keys within the string to bypass this.
  const KNOWN_LOGO_FONTS = ['Poppins', 'Bebas+Neue', 'Oswald', 'Playfair+Display', 'Raleway', 'Inter'];
  const KNOWN_HEADING_FONTS = ['Poppins', 'Oswald', 'Raleway', 'Inter', 'Helvetica'];
  const KNOWN_SUBTITLE_FONTS = ['Poppins', 'Inter', 'Montserrat', 'Raleway', 'Helvetica'];
  const KNOWN_BODY_FONTS = ['Montserrat', 'Lato', 'Open+Sans', 'Nunito', 'Inter'];
  
  const logoFont = KNOWN_LOGO_FONTS.find(k => (settings.logoFont || '').includes(k)) || 'Poppins';
  const headingFont = KNOWN_HEADING_FONTS.find(k => (settings.headingFont || '').includes(k)) || 'Poppins';
  const subtitleFont = KNOWN_SUBTITLE_FONTS.find(k => (settings.subtitleFont || '').includes(k)) || 'Poppins';
  const bodyFont = KNOWN_BODY_FONTS.find(k => (settings.bodyFont || '').includes(k)) || 'Montserrat';
  
  const rawGradient = settings.backgroundGradient || 'gris-premium';
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
  // Helvetica is a system font — no need to load from Google Fonts.
  const uniqueFonts = Array.from(new Set([logoFont, headingFont, subtitleFont, bodyFont]))
    .filter(f => f !== 'Helvetica');
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

  // Helper to format font-family value (replace + with space for CSS)
  const ff = (font) => `'${font.replace(/\+/g, ' ')}', sans-serif`;

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {fontUrl && <link href={fontUrl} rel="stylesheet" />}
      </head>
      <body 
        style={{
          '--font-logo': ff(logoFont),
          '--font-heading': ff(headingFont),
          '--font-subtitle': ff(subtitleFont),
          '--font-body': ff(bodyFont),
          '--gradient-bg': gradientValue,
        }}
        data-bg-key={backgroundGradient}
      >
        <ScrollProgress />
        <MouseEffect />
        <main>{children}</main>
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
