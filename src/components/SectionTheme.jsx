'use client';
import { getColor } from '@/lib/getColor';

export default function SectionTheme({ theme, children }) {
  // Blindaje contra nulos
  const safeTheme = theme || {};
  
  // Helper interno para generar el string RGB
  const getRGB = (color, fallback = '255, 255, 255') => {
    if (!color) return fallback;
    if (color.rgb) return `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
    return fallback;
  };

  // Mapeo de variables CSS locales (sobreescriben a las globales del body)
  const localVars = {
    '--panel-bg': getColor(safeTheme.panelBackgroundColor, 'rgba(var(--foreground-rgb), 0.02)'),
    '--card-bg': getColor(safeTheme.cardBackgroundColor, 'rgba(var(--foreground-rgb), 0.05)'),
    '--nav-bg': getColor(safeTheme.navBackgroundColor, 'rgba(var(--background-rgb), 0.8)'),
    '--accent-teal': getColor(safeTheme.primaryColor, '#1FB3B3'),
    '--accent-teal-rgb': getRGB(safeTheme.primaryColor, '31, 179, 179'),
    '--accent-orange': getColor(safeTheme.secondaryColor, '#D48C45'),
    '--accent-orange-rgb': getRGB(safeTheme.secondaryColor, '212, 140, 107'),
    '--foreground': getColor(safeTheme.textColor, '#FFFFFF'),
    '--foreground-rgb': getRGB(safeTheme.textColor, '255, 255, 255'),
    '--text-secondary': getColor(safeTheme.secondaryTextColor, 'rgba(var(--foreground-rgb), 0.6)'),
    '--border-color': getColor(safeTheme.borderColor, 'rgba(var(--foreground-rgb), 0.1)'),
    '--btn-text': getColor(safeTheme.buttonTextColor, 'var(--background)'),
    '--hero-overlay-rgb': getRGB(safeTheme.heroOverlayColor, '0, 0, 0'),
  };

  return (
    <div style={localVars} className="section-theme-wrapper">
      {children}
    </div>
  );
}
