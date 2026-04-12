import styles from '../Portfolio.module.css';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import VideoEmbed from '@/components/VideoEmbed';
import PageBanner from '@/components/PageBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmptyState from '@/components/EmptyState';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PropiosPage() {
  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]{ brandName, socialLinks, contactEmail, footerDescription, propiosBanner, propiosTitle, propiosSubtitle }`) || {};
  
  const query = `*[_type == "project" && category == "propio"] | order(orderRank asc, _createdAt desc) {
    _id, title, subtitle, customLabel, description, role, category, videoUrl,
    "imageUrl": mainImage.asset->url
  }`;
  const allProjects = await client.fetch(query) || [];

  const bannerImg = settings.propiosBanner?.asset ? urlFor(settings.propiosBanner).url() : null;

  return (
    <>
      <Header brandName={settings?.brandName} socialLinks={settings?.socialLinks} />

      <PageBanner
        title={settings.propiosTitle || "PROYECTOS PROPIOS"}
        subtitle={settings.propiosSubtitle || "Cortometrajes, estudios y experimentación personal."}
        backgroundImage={bannerImg}
      />

      <div className={styles.portfolio}>
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
                        <span className={styles.category}>{p.customLabel || 'PERSONAL'}</span>
                        <h3 className="uppercase">{p.title}</h3>
                        {p.subtitle && <p className={styles.subtitle}>{p.subtitle}</p>}
                        <p className={styles.description}>{p.description}</p>
                        <div className={styles.roleBlock}>
                          <strong>ROL:</strong> {p.role}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyState
                  type="propios"
                  title="Aún no hay proyectos propios publicados"
                  subtitle="Añade tus trabajos personales desde el Centro de Mando."
                />
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
