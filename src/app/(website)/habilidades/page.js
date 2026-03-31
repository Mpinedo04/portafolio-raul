import SkillsClient from './SkillsClient';
import { client } from '@/sanity/lib/client';

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: 'Habilidades & Formación | Raúl García',
    description: 'Conoce mi stack tecnológico y trayectoria académica en el sector audiovisual.'
  };
}

export default async function SkillsPage() {
  const allSkills = await client.fetch(`*[_type == "skill"]`) || [];


  // Categorize elements
  const softwareRaw = allSkills.filter(s => s.category === 'video' || s.category === 'audio');
  const areasRaw = allSkills.filter(s => s.category === 'especializacion');
  const educationRaw = allSkills.filter(s => s.category === 'educacion');

  // Map to format that SkillsClient expects (with fallbacks if empty)
  const software = softwareRaw.length > 0 
    ? softwareRaw.map(s => ({ _id: s._id, name: s.name, level: s.level || 50 }))
    : [
        { name: 'Adobe Premiere Pro', level: 95 },
        { name: 'After Effects', level: 80 },
        { name: 'DaVinci Resolve', level: 85 }
      ];

  const areas = areasRaw.length > 0
    ? areasRaw.map(s => ({ _id: s._id, name: s.name }))
    : [
        { name: 'Dirección de Fotografía' },
        { name: 'Montaje Cinematográfico' },
        { name: 'Corrección de Color (Etalonaje)' }
      ];

  const education = educationRaw.length > 0
    ? educationRaw.map(s => ({
        _id: s._id,
        date: s.period || '',
        title: s.name,
        institution: s.institution || '',
        description: ''
      }))
    : [
        { date: '2020 - 2022', title: 'Técnico Superior', institution: 'Centro de Formación', description: 'Especialización en dirección de fotografía.' }
      ];

  return (
    <SkillsClient 
      software={software} 
      areas={areas} 
      education={education} 
    />
  );
}
