import './globals.css';
export const revalidate = 10; // Sincronía universal de ajustes globales (10s)
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { client } from '@/sanity/lib/client';
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

import DynamicFont from '@/components/DynamicFont';
import { getColor } from '@/lib/getColor';

export async function getSettings() {
  return await client.fetch(`*[_type == "settings" && _id == "settings"][0]{
    brandName,
    socialLinks,
    contactEmail,
    footerDescription,
    theme
  }`, {}, { next: { tags: ['settings'] } });
}

export async function generateMetadata() {
  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]`, {}, { next: { tags: ['settings'] } });
  const seo = settings?.seo || {};
  
  return {
    title: seo.metaTitle || 'Raúl García | Filmmaker & Audiovisual Portfolio',
    description: seo.metaDescription || 'Portfolio profesional de Raúl García, un creador audiovisual especializado en cortometrajes, documentales y edición de vídeo.',
    openGraph: {
      images: seo.ogImage ? [urlFor(seo.ogImage).width(1200).height(630).url()] : [],
    },
  };
}

export default async function RootLayout({ children }) {
  const isDraftMode = (await draftMode()).isEnabled;
  
  // Fetch settings for dynamic theme and footer
  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]`, {}, { next: { tags: ['settings'] } }) || {};
  const theme = settings?.theme || {};

  // Helper para generar el string RGB (sin rgba())
  const getRGB = (color, fallback = '255, 255, 255') => {
    if (!color) return fallback;
    if (color.rgb) return `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
    return fallback;
  };

  const cssVars = {
    '--background': getColor(theme.backgroundColor, '#0A0A0A'),
    '--background-rgb': getRGB(theme.backgroundColor, '10, 10, 10'),
    '--foreground': '#FFFFFF', // Blanco por defecto para UI global
    '--foreground-rgb': '255, 255, 255',
    '--nav-bg': getColor(theme.navBackgroundColor, 'rgba(var(--background-rgb), 0.8)'),
    '--glass-blur': `${theme.glassBlur || 20}px`,
    '--font-primary': theme.titleFont || "'Bebas Neue', sans-serif",
  };

  return (
    <html lang="es">
      <head>
        <DynamicFont fontName={theme.titleFont} />
      </head>
      <body style={cssVars}>
        <main>{children}</main>
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
