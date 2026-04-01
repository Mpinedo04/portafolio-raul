'use client';

export default function DynamicFont({ fontName }) {
  if (!fontName) return null;

  // Extraer el nombre de la fuente (ej: 'Bebas Neue' de "'Bebas Neue', sans-serif")
  const family = fontName.split(',')[0].replace(/['"]/g, '');
  const urlFriendlyName = family.replace(/ /g, '+');

  return (
    <link
      href={`https://fonts.googleapis.com/css2?family=${urlFriendlyName}:wght@300;400;700;900&display=swap`}
      rel="stylesheet"
    />
  );
}
