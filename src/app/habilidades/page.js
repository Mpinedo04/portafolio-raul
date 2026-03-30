'use client';
import { useState, useEffect } from 'react';
import styles from './Skills.module.css';

export default function SkillsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Retraso ligero para que la animación se aprecie al entrar
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const software = [
    { name: 'Adobe Premiere Pro', level: 95, icon: 'Pr' },
    { name: 'After Effects', level: 80, icon: 'Ae' },
    { name: 'DaVinci Resolve', level: 85, icon: 'Dr' },
    { name: 'Adobe Photoshop', level: 75, icon: 'Ps' },
    { name: 'Adobe Audition', level: 70, icon: 'Au' }
  ];

  const education = [
    { date: '2020 - 2022', title: 'Técnico Superior en Iluminación, Captación y Tratamiento de Imagen', institution: 'Centro de Formación Audiovisual X', description: 'Especialización en dirección de fotografía y postproducción digital.' },
    { date: '2018 - 2020', title: 'Grado Medio en Vídeo Disc-jockey y Sonido', institution: 'IES Juan de la Cierva', description: 'Bases de edición de vídeo, mezcla de audio y montaje de eventos.' }
  ];

  const areas = [
    'Dirección de Fotografía',
    'Montaje Cinematográfico',
    'Corrección de Color (Etalonaje)',
    'Diseño Sonoro',
    'Operación de Cámara',
    'Narrativa Audiovisual'
  ];

  return (
    <div className={styles.skills}>
      <header className={styles.header}>
        <div className="container">
          <h1>FORMACIÓN & HABILIDADES</h1>
          <p>Mi expediente académico y dominio de herramientas técnicas.</p>
        </div>
      </header>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            {/* Software Skills */}
            <div className={styles.softwareCol}>
              <h2>SOFTWARE DE EDICIÓN</h2>
              <div className={styles.softwareList}>
                {software.map((s, i) => (
                  <div key={i} className={styles.skillRow}>
                    <div className={styles.skillHead}>
                      <span>{s.name}</span>
                      <span>{s.level}%</span>
                    </div>
                    <div className={styles.barOuter}>
                       <div 
                         className={styles.barInner} 
                         style={{ 
                           width: mounted ? `${s.level}%` : '0%',
                           transition: 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.2s'
                         }}
                       ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialized Areas */}
            <div className={styles.areasCol}>
              <h2>ÁREAS TÉCNICAS</h2>
              <ul className={styles.areaList}>
                {areas.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.eduSection}>
        <div className="container">
          <h2>EXPEDIENTE ACADÉMICO</h2>
          <div className={styles.timeline}>
             {education.map((e, i) => (
               <div key={i} className={styles.eduItem}>
                 <span className={styles.date}>{e.date}</span>
                 <h3>{e.title}</h3>
                 <p className={styles.institution}>{e.institution}</p>
                 <p className={styles.eduDesc}>{e.description}</p>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
