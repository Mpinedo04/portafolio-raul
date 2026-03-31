import React from 'react'
import { Select } from '@sanity/ui'
import { set, unset } from 'sanity'

const fonts = [
  { title: 'Bebas Neue (Cinematográfica)', value: "'Bebas Neue', sans-serif" },
  { title: 'Syncopate (Moderna Extra-ancha)', value: "'Syncopate', sans-serif" },
  { title: 'Syne (Artística / Festival)', value: "'Syne', sans-serif" },
  { title: 'Michroma (Técnica / Sci-fi)', value: "'Michroma', sans-serif" },
  { title: 'Playfair Display (Elegante Clásica)', value: "'Playfair Display', serif" },
  { title: 'Outfit (Premium / Limpia)', value: "'Outfit', sans-serif" },
  { title: 'Inter (Estándar Profesional)', value: "'Inter', sans-serif" },
]

export const FontSelector = (props) => {
  const { value, onChange, elementProps } = props

  const handleChange = React.useCallback(
    (event) => {
      const inputValue = event.currentTarget.value
      onChange(inputValue ? set(inputValue) : unset())
    },
    [onChange]
  )

  return (
    <div style={{ padding: '10px 0' }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syncopate:wght@400;700&family=Syne:wght@400;700;800&family=Michroma&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;700;900&family=Inter:wght@400;700&display=swap');
        `}
      </style>
      <Select
        {...elementProps}
        onChange={handleChange}
        value={value}
      >
        <option value="">-- Elige un estilo para los títulos --</option>
        {fonts.map((font) => (
          <option 
            key={font.value} 
            value={font.value}
            style={{ fontFamily: font.value, fontSize: '1.2rem' }}
          >
            {font.title}
          </option>
        ))}
      </Select>
      
      {value && (
        <div style={{ 
          marginTop: '15px', 
          padding: '20px', 
          border: '1px solid #ccc', 
          borderRadius: '8px',
          fontFamily: value,
          fontSize: '2rem',
          textAlign: 'center',
          background: '#f9f9f9',
          color: '#111'
        }}>
          ESTE ES UN TÍTULO DE RAÚL GARCÍA
        </div>
      )}
    </div>
  )
}
