/**
 * Helper experto para procesar colores de Sanity (Hex y RGBA)
 * @param {Object|string} color - El dato de color de Sanity
 * @param {string} fallback - El color de respaldo si falla el dato
 * @returns {string} - El color final procesado para CSS
 */
export function getColor(color, fallback = '#0A0A0A') {
  if (!color) return fallback;
  
  // Caso 1: Ya es un string (Ej: #ffffff)
  if (typeof color === 'string') return color;
  
  // Caso 2: Objeto Hex de Sanity
  if (color.hex) return color.hex;
  
  // Caso 3: Objeto RGB con alfa de Sanity
  if (color.rgb) {
    const { r, g, b, a = 1 } = color.rgb;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  
  return fallback;
}
