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

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Montserrat:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MouseEffect />
        <main>{children}</main>
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
