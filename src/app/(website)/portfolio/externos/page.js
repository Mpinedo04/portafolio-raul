import styles from '../Portfolio.module.css';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import VideoEmbed from '@/components/VideoEmbed';
import PageBanner from '@/components/PageBanner';
import Header from '@/components/Header';
import BtsGallery from '@/components/BtsGallery';
import Footer from '@/components/Footer';
import EmptyState from '@/components/EmptyState';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ExternosPage() {
  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]{ brandName, socialLinks, contactEmail, footerDescription, externosBanner, externosTitle, externosSubtitle }`) || {};
  
  const query = `*[_type == "project" && category == "externo"] | order(orderRank asc, _createdAt desc) {
    _id, title, subtitle, customLabel, description, role, category, videoUrl,
    "imageUrl": mainImage.asset->url,
    behindTheScenes[]{
      _type,
      "url": coalesce(asset->url, url)
    }
  }`;
  const allProjects = await client.fetch(query) || [];

  const bannerImg = settings.externosBanner?.asset ? urlFor(settings.externosBanner).url() : null;

  return (
    <>
      <Header brandName={settings?.brandName} socialLinks={settings?.socialLinks} />

      <PageBanner
        title={settings.externosTitle || "TRABAJOS EXTERNOS"}
        subtitle={settings.externosSubtitle || "Explora mis trabajos profesionales para clientes, marcas y empresas."}
        backgroundImage={bannerImg}
      />

      <div className={styles.portfolio}>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.list}>
              {allProjects.length > 0 ? (
                allProjects.map((p) => {
                  const thumb = p.imageUrl || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop";
                  return (
                    <div key={p._id} className={`${styles.projectItem} bts-card-trigger`}>
                      <div className={styles.mediaSide}>
                        {p.videoUrl ? (
                          <VideoEmbed url={p.videoUrl} title={p.title} thumbnail={thumb} />
                        ) : (
                          <img src={thumb} alt={p.title} className={styles.mainImage} />
                        )}
                      </div>
                      <div className={styles.textSide}>
                        {p.behindTheScenes && p.behindTheScenes.length > 0 && (
                          <BtsGallery items={p.behindTheScenes} />
                        )}
                        <span className={styles.category}>{p.customLabel || 'PROFESIONAL'}</span>
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
                  type="externos"
                  title="Aún no hay trabajos externos publicados"
                  subtitle="Gestiona tus colaboraciones profesionales desde el Centro de Mando."
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
