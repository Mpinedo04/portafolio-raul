import Hero from '@/components/Hero';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './page.module.css';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import VideoEmbed from '@/components/VideoEmbed';
import SectionTheme from '@/components/SectionTheme';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 10; // Refresco rápido para edición

export async function generateMetadata() {
  const home = await client.fetch(`*[_type == "home" && _id == "home"][0]{ seo }`);
  const seo = home?.seo || {};
  
  if (!seo.metaTitle) return {}; 

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
  };
}

export default async function Home() {
  // Fetch from the new HOME schema including localTheme and settings for Header/Footer
  const home = await client.fetch(`*[_type == "home" && _id == "home"][0]{
    name, 
    subHeadline,
    headline,
    heroImage,
    heroButtons,
    localTheme,
    seo
  }`) || {
    name: "RAÚL GARCÍA",
    subHeadline: "CREANDO HISTORIAS A TRAVÉS DEL VISOR",
    headline: "Filmmaker & Editor de Vídeo",
    heroImage: null,
    heroButtons: {
      primaryText: "Ver Proyectos",
      primaryUrl: "/portfolio",
      secondaryText: "Trabajemos Juntos",
      secondaryUrl: "/contacto"
    },
    localTheme: {}
  };

  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]{ brandName, socialLinks, contactEmail, footerDescription }`) || {};
  const about = await client.fetch(`*[_type == "about" && _id == "about"][0]{ bio }`) || { bio: "" };
  const projects = await client.fetch(`*[_type == "project" && featured == true] | order(_createdAt desc)`) || [];
  const displayProjects = projects.length > 0 ? projects : [];

  return (
    <SectionTheme theme={home.localTheme}>
      <Header brandName={settings?.brandName} socialLinks={settings?.socialLinks} />
      <div className={styles.about}>
        <Hero 
          name={home.name} 
          subHeadline={home.subHeadline}
          headline={home.headline} 
          backgroundImage={(home.heroImage && home.heroImage.asset) ? urlFor(home.heroImage).url() : null}
          heroButtons={home.heroButtons}
          data-sanity-group="home"
        />

          
        {/* Breve descripción sobre mí */}
        <section className={styles.intro}>
          <div className="container">
            <div className={styles.introContent}>
              <div className={styles.introText} data-sanity="about.bio">
                <h2>ACERCA DE MÍ</h2>
                {(() => {
                  const bio = about?.bio || "";
                  const truncatedBio = bio.length > 280 ? bio.substring(0, 280) + "..." : bio;
                  return truncatedBio.split('\n').map((paragraph, i) => (
                    paragraph.trim() && <p key={i}>{paragraph}</p>
                  ));
                })()}
                <Link href="/sobre-mi" className={styles.link} data-sanity="about.seo">
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
                          thumbnail={(project.mainImage && project.mainImage.asset) ? urlFor(project.mainImage).url() : ""} 
                        />
                      ) : (
                        <img 
                          src={(project.mainImage && project.mainImage.asset) ? urlFor(project.mainImage).url() : "https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=2069&auto=format&fit=crop"} 
                          alt={project.title} 
                        />
                      )}
                    </div>
                    <div className={styles.projectInfo}>
                      <h3 className="uppercase">{project.title}</h3>
                      <p>{(project.description || "").substring(0, 100)}...</p>
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
      <Footer 
        brandName={settings?.brandName} 
        contactEmail={settings?.contactEmail} 
        footerDescription={settings?.footerDescription}
        socialLinks={settings?.socialLinks} 
      />
    </SectionTheme>
  );
}
