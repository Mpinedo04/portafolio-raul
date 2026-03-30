'use client';
import { useState, useEffect } from 'react';
import styles from './Skills.module.css';

export default function SkillsClient({ software, areas, education }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Retraso ligero para que la animación se aprecie al entrar
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
                  <div 
                    key={i} 
                    className={styles.skillRow}
                    data-sanity={s._id ? `${s._id}` : undefined}
                  >
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
                  <li 
                    key={i}
                    data-sanity={a._id ? `${a._id}` : undefined}
                  >
                    {a.name}
                  </li>
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
               <div 
                 key={i} 
                 className={styles.eduItem}
                 data-sanity={e._id ? `${e._id}` : undefined}
               >
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
