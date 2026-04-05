import './globals.css';
import { client } from '@/sanity/lib/client';
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import MouseEffect from '@/components/MouseEffect';

export const revalidate = 10;

export async function generateMetadata() {
  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]`, {}, { next: { tags: ['settings'] } });
  const seo = settings?.seo || {};

  return {
    title: seo.metaTitle || 'Raúl García | Filmmaker & Audiovisual Portfolio',
    description: seo.metaDescription || 'Portfolio profesional de Raúl García, un creador audiovisual especializado en cortometrajes, documentales y edición de vídeo.',
  };
}

export default async function RootLayout({ children }) {
  const isDraftMode = (await draftMode()).isEnabled;
  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]{ headingFont, bodyFont }`, {}, { next: { tags: ['settings'] } }) || {};
  
  const headingFont = settings.headingFont || 'Poppins';
  const bodyFont = settings.bodyFont || 'Montserrat';

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

  const fontStyles = `
    :root {
      --font-heading: '${headingFont.replace('+', ' ')}', sans-serif;
      --font-body: '${bodyFont.replace('+', ' ')}', sans-serif;
    }
  `;

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {fontUrl && <link href={fontUrl} rel="stylesheet" />}
        <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      </head>
      <body>
        <MouseEffect />
        <main>{children}</main>
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
