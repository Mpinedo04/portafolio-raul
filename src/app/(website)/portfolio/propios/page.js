import styles from '../Portfolio.module.css';
import { client } from '@/sanity/lib/client';
import VideoEmbed from '@/components/VideoEmbed';
import SectionTheme from '@/components/SectionTheme';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PropiosPage() {
  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]{ brandName, socialLinks, contactEmail, footerDescription }`) || {};
  const query = `*[_type == "project" && category == "propio"] | order(_createdAt desc) {
    _id,
    title,
    description,
    role,
    category,
    videoUrl,
    "imageUrl": mainImage.asset->url
  }`;
  
  const allProjects = await client.fetch(query) || [];

  return (
    <SectionTheme theme={{}}>
      <Header brandName={settings?.brandName} socialLinks={settings?.socialLinks} />
      <div className={styles.portfolio}>
      <section className={styles.headerSection}>
        <div className="container">
          <h1 className="uppercase">PROYECTOS PROPIOS</h1>
          <p>Explora mis cortometrajes, proyectos de estudio y pof producciones personales.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.list}>
            {allProjects.length > 0 ? (
              allProjects.map((p) => {
                const thumb = p.imageUrl || "https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=2069&auto=format&fit=crop";
                return (
                  <div key={p._id} className={styles.projectItem}>
                    <div className={styles.mediaSide}>
                      {p.videoUrl ? (
                        <VideoEmbed url={p.videoUrl} title={p.title} thumbnail={thumb} />
                      ) : (
                        <img src={thumb} alt={p.title} className={styles.mainImage} />
                      )}
                    </div>
                    <div className={styles.textSide}>
                      <span className={styles.category}>PERSONAL</span>
                      <h3 className="uppercase">{p.title}</h3>
                      <p className={styles.description}>{p.description}</p>
                      <div className={styles.roleBlock}>
                        <strong>ROL:</strong> {p.role}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.emptyState}>
                <h2>Aún no hay proyectos propios publicados</h2>
                <p>Añade tus trabajos personales desde el Centro de Mando satisfactoriamente.</p>
              </div>
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
