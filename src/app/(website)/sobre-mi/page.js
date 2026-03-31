import styles from './About.module.css';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export const revalidate = 3600; // Refresco eficiente cada hora (ISR)

export async function generateMetadata() {
  const about = await client.fetch(`*[_type == "about"][0]{ seo }`);
  const seo = about?.seo || {};
  
  if (!seo.metaTitle) return {}; 

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
  };
}

export default async function AboutPage() {
  const about = await client.fetch(`*[_type == "about"][0]{
    bio,
    profileImage,
    actionPhotos,
    seo
  }`) || {
    bio: "Mi vocación por el sector audiovisual...",
    profileImage: null,
    actionPhotos: []
  };

  const hasActionPhotos = about.actionPhotos && about.actionPhotos.length > 0;

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
                   src={(about.profileImage && about.profileImage.asset) ? urlFor(about.profileImage).url() : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"} 
                   alt="Raúl García" 
                 />
                 <div className={styles.boxDecor}></div>
              </div>
            </div>
            <div className={styles.textCol}>
              <h2>CÓMO LLEGUÉ AQUÍ</h2>
              <p style={{ whiteSpace: 'pre-line' }}>{about?.bio || ""}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className="container">
          <h2>EN ACCIÓN</h2>
          <div className={styles.photoGrid}>
            {hasActionPhotos ? (
              about.actionPhotos
                .filter(photo => photo && photo.asset)
                .map((photo, i) => (
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
