import styles from './About.module.css';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export default async function AboutPage() {
  const profile = await client.fetch(`*[_type == "profile"][0]`) || {
    bio: "Mi vocación por el sector audiovisual no fue algo repentino, sino una evolución natural. Desde pequeño me fascinaba cómo una cámara podía capturar no solo imágenes, sino sentimientos.\nEstudié Imagen y Sonido, donde asenté las bases técnicas de lo que hoy es mi profesión. A lo largo de los años, he pasado por diversas etapas: desde la experimentación con cortometrajes caseros hasta la dirección de fotografía en proyectos de mayor envergadura.\nPara mí, cada rodaje es una oportunidad de aprender algo nuevo y de perfeccionar mi estilo cinematográfico. Me gusta involucrarme en todas las fases del proceso, aportando mi visión creativa y técnica para que el resultado final supere las expectativas.",
    profileImage: null,
    actionPhotos: []
  };

  const hasActionPhotos = profile.actionPhotos && profile.actionPhotos.length > 0;

  return (
    <div className={styles.about}>
      <header className={styles.header}>
        <div className="container">
          <h1>BIO & TRAYECTORIA</h1>
          <p>La evolución de un apasionado por el séptimo arte.</p>
        </div>
      </header>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.imageCol}>
              <div className={styles.profileBox}>
                 <img 
                   src={profile.profileImage ? urlFor(profile.profileImage).url() : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"} 
                   alt={profile.name || "Raúl García"} 
                 />
                 <div className={styles.boxDecor}></div>
              </div>
            </div>
            <div className={styles.textCol}>
              <h2>CÓMO LLEGUÉ AQUÍ</h2>
              {profile.bio.split('\n').map((paragraph, i) => (
                paragraph.trim() && <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className="container">
          <h2>EN ACCIÓN</h2>
          <div className={styles.photoGrid}>
            {hasActionPhotos ? (
              profile.actionPhotos.map((photo, i) => (
                <img key={i} src={urlFor(photo).url()} alt={`Rodaje ${i+1}`} />
              ))
            ) : (
              // Fallback demo photos
              <>
                 <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" alt="Rodaje 1" />
                 <img src="https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=2069&auto=format&fit=crop" alt="Rodaje 2" />
                 <img src="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1932&auto=format&fit=crop" alt="Rodaje 3" />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
