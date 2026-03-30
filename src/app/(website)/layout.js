import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { client } from '@/sanity/lib/client';
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

export const metadata = {
  title: 'Raúl García | Filmmaker & Audiovisual Portfolio',
  description: 'Portfolio profesional de Raúl García, un creador audiovisual especializado en cortometrajes, documentales y edición de vídeo.',
};

export default async function RootLayout({ children }) {
  const isDraftMode = (await draftMode()).isEnabled;
  
  // Fetch settings for dynamic theme and footer
  const settings = await client.fetch(`*[_type == "settings"][0]`);
  const theme = settings?.theme || {};

  const cssVars = {
    '--background': theme.backgroundColor || '#0A0A0A',
    '--foreground': theme.textColor || '#EDEDED',
    '--accent-teal': theme.primaryColor || '#1FB3B3',
    '--accent-orange': theme.secondaryColor || '#D48C45',
    '--font-primary': theme.headingFont ? `'${theme.headingFont}', sans-serif` : "'Outfit', sans-serif",
  };

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700;800&family=Playfair+Display:wght@700&family=Roboto+Mono&family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body style={cssVars}>
        <Header brandName={settings?.brandName} headerIcons={settings?.headerIcons} />
        <main>{children}</main>
        <Footer brandName={settings?.brandName} contactEmail={settings?.contactEmail} headerIcons={settings?.headerIcons} />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
