import './globals.css';
export const revalidate = 10; // Sincronía universal de ajustes globales (10s)
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { client } from '@/sanity/lib/client';
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

import { urlFor } from '@/sanity/lib/image';

export async function getSettings() {
  return await client.fetch(`*[_type == "settings" && _id == "settings"][0]{
    brandName,
    socialLinks,
    contactEmail,
    typography
  }`);
}

export async function generateMetadata() {
  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]`);
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
  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]`) || {};
  const theme = settings?.theme || {};

  // Traductor inteligente de colores (Soporta Hex y Transparencia RGBA)
  const getColor = (color) => {
    if (!color) return null;
    if (typeof color === 'string') return color;
    // Si tiene transparencia y datos RGB, usamos RGBA
    if (color.rgb) {
      const { r, g, b, a } = color.rgb;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return color.hex || null;
  };

  const cssVars = {
    '--background': getColor(theme.backgroundColor) || '#0A0A0A',
    '--panel-bg': getColor(theme.panelBackgroundColor) || '#0D0D0D',
    '--card-bg': getColor(theme.cardBackgroundColor) || '#1A1A1A',
    '--nav-bg': getColor(theme.navBackgroundColor) || '#0A0A0A',
    '--foreground': getColor(theme.textColor) || '#EDEDED',
    '--accent-teal': getColor(theme.primaryColor) || '#1FB3B3',
    '--accent-orange': getColor(theme.secondaryColor) || '#D48C45',
    '--font-primary': theme.titleFont || "'Bebas Neue', sans-serif",
  };

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Bebas+Neue&family=Cinzel:wght@400;700&family=Heebo:wght@400;700&family=Inter:wght@400;700;900&family=Josefin+Sans:wght@400;700&family=Kanit:wght@400;700&family=Lora:ital,wght@0,400;0,700;1,400&family=Merriweather:wght@400;700&family=Michroma&family=Montserrat:wght@400;700;900&family=Nunito:wght@400;700&family=Outfit:wght@300;400;700;900&family=Oswald:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@400;700;900&family=Quicksand:wght@400;700&family=Raleway:wght@400;700&family=Rubik:wght@400;700&family=Space+Grotesk:wght@400;700&family=Syncopate:wght@400;700&family=Syne:wght@400;700;800&family=Ubuntu:wght@400;700&family=Work+Sans:wght@400;700&display=swap" rel="stylesheet" />
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
