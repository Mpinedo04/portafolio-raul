import styles from './About.module.css';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import SectionTheme from '@/components/SectionTheme';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 10;

export async function generateMetadata() {
  const about = await client.fetch(`*[_type == "about" && _id == "about"][0]{ seo }`);
  const seo = about?.seo || {};
  
  if (!seo.metaTitle) return {}; 

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
  };
}

export default async function AboutPage() {
  const about = await client.fetch(`*[_type == "about" && _id == "about"][0]{
    bio,
    title,
    subtitle,
    storyTitle,
    galleryTitle,
    profileImage,
    actionPhotos,
    localTheme,
    seo
  }`) || {
    bio: "Mi vocación por el sector audiovisual...",
    profileImage: null,
    actionPhotos: [],
    localTheme: {}
  };

  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]{ brandName, socialLinks, contactEmail, footerDescription }`) || {};
  const hasActionPhotos = (about.actionPhotos || []).length > 0;
  const skills = await client.fetch(`*[_type == "skill"] | order(category asc, level desc)`) || [];
  
  // Agrupar habilidades por categoría para mayor orden
  const skillsByCategory = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Otros';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categoryTitles = {
    video: 'Software de Edición',
    audio: 'Audio & Sonido',
    educacion: 'Formación Académica',
    especializacion: 'Especialización'
  };

  return (
    <SectionTheme theme={about.localTheme}>
      <Header brandName={settings?.brandName} socialLinks={settings?.socialLinks} />
      <div className={styles.about}>
        <header className={styles.header}>
          <div className="container" data-sanity="about.seo">
            <h1 data-sanity="about.title">{about.title || "BIO & TRAYECTORIA"}</h1>
            <p data-sanity="about.subtitle">{about.subtitle || "La evolución de un apasionado por el séptimo arte."}</p>
          </div>
        </header>

        <section className={styles.content}>
          <div className="container">
            <div className={styles.grid}>
              <div className={styles.imageCol}>
                <div className={styles.profileBox}>
                   <img 
                     data-sanity="about.profileImage"
                     src={(about.profileImage && about.profileImage.asset) ? urlFor(about.profileImage).url() : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"} 
                     alt="Raúl García" 
                   />
                   <div className={styles.boxDecor}></div>
                </div>
              </div>
              <div className={styles.textCol}>
                <h2 data-sanity="about.storyTitle">{about.storyTitle || "CÓMO LLEGUÉ AQUÍ"}</h2>
                <p data-sanity="about.bio" style={{ whiteSpace: 'pre-line' }}>{about?.bio || ""}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 🎓 SECCIÓN DE HABILIDADES Y FORMACIÓN */}
        <section className={styles.skillsSection}>
          <div className="container">
            <h2 className="uppercase">Habilidades & Formación</h2>
            <div className={styles.skillsGrid}>
              {Object.keys(skillsByCategory).map(cat => (
                <div key={cat} className={styles.skillCategory}>
                  <h3>{categoryTitles[cat] || cat}</h3>
                  <ul>
                    {skillsByCategory[cat].map((skill, i) => (
                      <li key={i} data-sanity={`skill:${skill._id}`}>
                        <span className={styles.skillName}>{skill.name}</span>
                        {skill.level && (
                          <div className={styles.progressBar}>
                            <div className={styles.progress} style={{ width: `${skill.level}%` }}></div>
                          </div>
                        )}
                        {skill.institution && <span className={styles.details}>{skill.institution} | {skill.period}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.gallery}>
          <div className="container">
            <h2 data-sanity="about.galleryTitle">{about.galleryTitle || "EN ACCIÓN"}</h2>
            <div className={styles.photoGrid}>
              {hasActionPhotos ? (
                about.actionPhotos
                  .filter(photo => photo && photo.asset)
                  .map((photo, i) => (
                    <img key={i} src={urlFor(photo).url()} alt={`Rodaje ${i+1}`} data-sanity={`about.actionPhotos[${i}]`} />
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
      <Footer 
        brandName={settings?.brandName} 
        contactEmail={settings?.contactEmail} 
        footerDescription={settings?.footerDescription}
        socialLinks={settings?.socialLinks} 
      />
    </SectionTheme>
  );
}
