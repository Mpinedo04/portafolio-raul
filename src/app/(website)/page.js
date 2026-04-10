import Hero from '@/components/Hero';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './page.module.css';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import VideoEmbed from '@/components/VideoEmbed';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 10;

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
  const home = await client.fetch(`*[_type == "home" && _id == "home"][0]{
    name, 
    subHeadline,
    headline,
    heroImage,
    heroButtons,
    seo
  }`) || {
    name: "PORTAFOLIO RAÚL GARCÍA",
    subHeadline: "CREANDO HISTORIAS A TRAVÉS DEL VISOR",
    headline: "Filmmaker & Editor de Vídeo",
    heroImage: null,
    heroButtons: {
      primaryText: "Todos mis proyectos",
      primaryUrl: "/portfolio",
      secondaryText: "Trabajemos Juntos",
      secondaryUrl: "/contacto"
    },
  };

  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]{ brandName, socialLinks, contactEmail, footerDescription }`) || {};
  const about = await client.fetch(`*[_type == "about" && _id == "about"][0]{ bio }`) || { bio: "" };
  const projects = await client.fetch(`*[_type == "project" && featured == true] | order(orderRank asc, _createdAt desc) {
    _id, title, subtitle, customLabel, role, category, videoUrl,
    "imageUrl": mainImage.asset->url
  }`) || [];

  return (
    <>
      <Header brandName={settings?.brandName} socialLinks={settings?.socialLinks} />
      <div className={styles.about}>
        <Hero 
          name={home.name} 
          subHeadline={home.subHeadline}
          headline={home.headline} 
          backgroundImage={(home.heroImage?.asset) ? urlFor(home.heroImage).url() : null}
          heroButtons={home.heroButtons}
        />

        <section className={styles.intro}>
          <div className="container">
            <div className={styles.introContent}>
              <div className={styles.introText}>
                <h2>ACERCA DE MÍ</h2>
                {(() => {
                  const bio = about?.bio || "";
                  const truncatedBio = bio.length > 280 ? bio.substring(0, 280) + "..." : bio;
                  return truncatedBio.split('\n').map((paragraph, i) => (
                    paragraph.trim() && <p key={i}>{paragraph}</p>
                  ));
                })()}
                <Link href="/sobre-mi" className={styles.link}>
                  Conoce mi historia <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.featured}>
          <div className="container">
            <div className={styles.header}>
              <h2>TRABAJOS DESTACADOS</h2>
              <Link href="/portfolio" className={styles.viewAll}>
                Todos mis proyectos
              </Link>
            </div>
              
            <div className={styles.grid}>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project._id} className={styles.projectCard}>
                    <div className={styles.imageWrapper}>
                      {project.videoUrl ? (
                        <VideoEmbed 
                          url={project.videoUrl} 
                          title={project.title} 
                          thumbnail={(project.mainImage?.asset) ? urlFor(project.mainImage).url() : ""} 
                        />
                      ) : (
                        <img 
                          src={(project.mainImage?.asset) ? urlFor(project.mainImage).url() : "https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=2069&auto=format&fit=crop"} 
                          alt={project.title} 
                        />
                      )}
                    </div>
                    <div className={styles.projectInfo}>
                      <span className={styles.badge}>{project.customLabel || project.category || "PROYECTO"}</span>
                      <h3 className="uppercase">{project.title}</h3>
                      {project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
                      <span className={styles.role}>Rol: {project.role}</span>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className={styles.projectCard}>
                    <div className={styles.imageWrapper}>
                      <img src="https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=2069&auto=format&fit=crop" alt="Proyecto destacado" />
                    </div>
                    <div className={styles.projectInfo}>
                      <span className={styles.badge}>PROYECTO</span>
                      <h3>CATARSIS</h3>
                      <p className={styles.subtitle}>Cortometraje de ficción</p>
                      <span className={styles.role}>Rol: Director & Montador</span>
                    </div>
                  </div>
                  <div className={styles.projectCard}>
                    <div className={styles.imageWrapper}>
                      <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" alt="Proyecto destacado" />
                    </div>
                    <div className={styles.projectInfo}>
                      <span className={styles.badge}>PROYECTO</span>
                      <h3>IMÁGENES OCULTAS</h3>
                      <p className={styles.subtitle}>Documental experimental</p>
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
    </>
  );
}
