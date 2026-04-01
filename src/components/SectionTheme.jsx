'use client';
import { getColor } from '@/lib/getColor';

export default function SectionTheme({ theme = {}, children }) {
  // Helper interno para generar el string RGB
  const getRGB = (color, fallback = '255, 255, 255') => {
    if (!color) return fallback;
    if (color.rgb) return `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
    return fallback;
  };

  // Mapeo de variables CSS locales (sobreescriben a las globales del body)
  const localVars = {
    '--panel-bg': getColor(theme.panelBackgroundColor, 'rgba(var(--foreground-rgb), 0.02)'),
    '--card-bg': getColor(theme.cardBackgroundColor, 'rgba(var(--foreground-rgb), 0.05)'),
    '--nav-bg': getColor(theme.navBackgroundColor, 'rgba(var(--background-rgb), 0.8)'),
    '--accent-teal': getColor(theme.primaryColor, '#1FB3B3'),
    '--accent-teal-rgb': getRGB(theme.primaryColor, '31, 179, 179'),
    '--accent-orange': getColor(theme.secondaryColor, '#D48C45'),
    '--accent-orange-rgb': getRGB(theme.secondaryColor, '212, 140, 107'),
    '--foreground': getColor(theme.textColor, '#FFFFFF'),
    '--foreground-rgb': getRGB(theme.textColor, '255, 255, 255'),
    '--text-secondary': getColor(theme.secondaryTextColor, 'rgba(var(--foreground-rgb), 0.6)'),
    '--border-color': getColor(theme.borderColor, 'rgba(var(--foreground-rgb), 0.1)'),
    '--btn-text': getColor(theme.buttonTextColor, 'var(--background)'),
    '--hero-overlay-rgb': getRGB(theme.heroOverlayColor, '0, 0, 0'),
  };

  return (
    <div style={localVars} className="section-theme-wrapper">
      {children}
    </div>
  );
}
