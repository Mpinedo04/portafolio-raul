import Hero from '@/components/Hero';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './page.module.css';
import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';
import VideoEmbed from '@/components/VideoEmbed';

export const revalidate = 10; // Revalidate every 10 seconds for CMS updates

export default async function Home() {
  // Fetch data dynamically, rendering placeholders if Sanity is empty
  const profile = await client.fetch(`*[_type == "profile"][0]`) || {
    name: "RAÚL GARCÍA",
    headline: "Filmmaker & Editor de Vídeo. Documentando lo ordinario para hacerlo extraordinario.",
    bio: "Hola, soy Raúl. Mi pasión es la creación audiovisual desde los cimientos: desde la idea inicial hasta el montaje final.\nMe especializo en capturar la esencia de cada momento, ya sea en un set de rodaje profesional o en proyectos documentales independientes."
  };

  const projects = await client.fetch(`*[_type == "project" && featured == true] | order(_createdAt desc)`) || [];
  const displayProjects = projects.length > 0 ? projects : [];

  return (
    <div>
      <Hero 
        name={profile.name} 
        headline={profile.headline} 
        backgroundImage={profile.heroImage ? urlFor(profile.heroImage).url() : null}
      />
        
      {/* Breve descripción sobre mí */}
      <section className={styles.intro}>
        <div className="container">
          <div className={styles.introContent}>
            <div className={styles.introText}>
              <h2>ACERCA DE MÍ</h2>
              {profile.bio.split('\n').map((paragraph, i) => (
                paragraph.trim() && <p key={i}>{paragraph}</p>
              ))}
              <Link href="/sobre-mi" className={styles.link}>
                Conoce mi historia <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos destacados */}
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.header}>
            <h2>TRABAJOS DESTACADOS</h2>
            <Link href="/portfolio" className={styles.viewAll}>
              Ver Portfolio Completo
            </Link>
          </div>
            
          <div className={styles.grid}>
            {displayProjects.length > 0 ? (
              displayProjects.map((project) => (
                <div key={project._id} className={styles.projectCard}>
                  <div className={styles.imageWrapper}>
                    {project.videoUrl ? (
                      <VideoEmbed 
                        url={project.videoUrl} 
                        title={project.title} 
                        thumbnail={project.mainImage ? urlFor(project.mainImage).url() : ""} 
                      />
                    ) : (
                      <img 
                        src={project.mainImage ? urlFor(project.mainImage).url() : "https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=2069&auto=format&fit=crop"} 
                        alt={project.title} 
                      />
                    )}
                  </div>
                  <div className={styles.projectInfo}>
                    <h3 className="uppercase">{project.title}</h3>
                    <p>{project.description && project.description.substring(0, 100)}...</p>
                    <span className={styles.role}>Rol: {project.role}</span>
                  </div>
                </div>
              ))
            ) : (
              // Fallback cards if no featured projects exist in Sanity
              <>
                <div className={styles.projectCard}>
                  <div className={styles.imageWrapper}>
                    <img src="https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=2069&auto=format&fit=crop" alt="Proyecto destacato" />
                  </div>
                  <div className={styles.projectInfo}>
                    <h3>CATARSIS</h3>
                    <p>Cortometraje de ficción. Drama psicológico.</p>
                    <span className={styles.role}>Rol: Director & Montador</span>
                  </div>
                </div>
                <div className={styles.projectCard}>
                  <div className={styles.imageWrapper}>
                    <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" alt="Proyecto destacato" />
                  </div>
                  <div className={styles.projectInfo}>
                    <h3>IMÁGENES OCULTAS</h3>
                    <p>Documental experimental sobre la vida urbana.</p>
                    <span className={styles.role}>Rol: Director de Fotografía</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
