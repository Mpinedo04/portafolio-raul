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
    '--panel-bg': getColor(theme.panelBackgroundColor, '#0D0D0D'),
    '--card-bg': getColor(theme.cardBackgroundColor, '#1A1A1A'),
    '--nav-bg': getColor(theme.navBackgroundColor, '#0A0A0A'),
    '--foreground': getColor(theme.textColor, '#EDEDED'),
    '--foreground-rgb': getRGB(theme.textColor, '237, 237, 237'),
    '--accent-teal': getColor(theme.primaryColor, '#1FB3B3'),
    '--accent-teal-rgb': getRGB(theme.primaryColor, '31, 179, 179'),
    '--accent-orange': getColor(theme.secondaryColor, '#D48C45'),
    '--accent-orange-rgb': getRGB(theme.secondaryColor, '212, 140, 69'),
    '--text-secondary': getColor(theme.secondaryTextColor, 'rgba(var(--foreground-rgb), 0.6)'),
    '--border-color': getColor(theme.borderColor, 'rgba(var(--foreground-rgb), 0.1)'),
    '--btn-text': getColor(theme.buttonTextColor, 'var(--background)'),
    '--glass-blur': `${theme.glassBlur || 20}px`,
    '--font-primary': theme.titleFont || "'Bebas Neue', sans-serif",
  };

  return (
    <html lang="es">
      <head>
        <DynamicFont fontName={theme.titleFont} />
      </head>
      <body style={cssVars}>
        <Header brandName={settings?.brandName} socialLinks={settings?.socialLinks} />
        <main>{children}</main>
        <Footer 
          brandName={settings?.brandName} 
          contactEmail={settings?.contactEmail} 
          footerDescription={settings?.footerDescription}
          socialLinks={settings?.socialLinks} 
        />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
