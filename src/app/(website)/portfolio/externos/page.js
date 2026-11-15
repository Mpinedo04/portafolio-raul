import styles from '../Portfolio.module.css';
import { client } from '@/sanity/lib/client';
import { urlForOptimized } from '@/sanity/lib/image';
import VideoEmbed from '@/components/VideoEmbed';
import PageBanner from '@/components/PageBanner';
import BtsGallery from '@/components/BtsGallery';
import EmptyState from '@/components/EmptyState';
import { getSiteSettings } from '@/sanity/lib/settings';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return buildMetadata({
    title: 'Trabajos externos | Raúl García',
    description:
      'Encargos, spots y proyectos audiovisuales realizados por Raúl García para clientes, marcas y empresas.',
    path: '/portfolio/externos',
  });
}

export default async function ExternosPage() {
  const settings = await getSiteSettings();
  
  const query = `*[_type == "project" && category == "externo"] | order(orderRank asc, _createdAt desc) {
    _id, title, subtitle, customLabel, year, description, role, category, videoUrl, mainImage,
    behindTheScenes[]{
      ...,
      _type,
      "url": coalesce(asset->url, url)
    }
  }`;
  const allProjects = await client.fetch(query) || [];

  const bannerImg = settings.externosBanner?.asset ? urlForOptimized(settings.externosBanner, { width: 2400, quality: 90 }) : null;
  const bannerFocalPoint = settings.externosBanner?.hotspot || null;

  return (
    <>
      <PageBanner
        title={settings.externosTitle || "TRABAJOS EXTERNOS"}
        subtitle={settings.externosSubtitle || "Explora mis trabajos profesionales para clientes, marcas y empresas."}
        backgroundImage={bannerImg}
        focalPoint={bannerFocalPoint}
      />

      <div className={styles.portfolio}>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.list}>
              {allProjects.length > 0 ? (
                allProjects.map((p) => {
                  const thumb = p.mainImage?.asset ? urlForOptimized(p.mainImage, { width: 900, quality: 82 }) : null;
                  const fallbackThumb = thumb || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop";
                  return (
                    <div key={p._id} className={`${styles.projectItem} bts-card-trigger`}>
                      <div className={styles.mediaSide}>
                        {p.videoUrl ? (
                          <VideoEmbed url={p.videoUrl} title={p.title} thumbnail={thumb} />
                        ) : (
                          <img src={fallbackThumb} alt={p.title} className={styles.mainImage} loading="lazy" decoding="async" />
                        )}
                      </div>
                      <div className={styles.textSide}>
                        {p.behindTheScenes && p.behindTheScenes.length > 0 && (
                          <BtsGallery items={p.behindTheScenes} />
                        )}
                        <div className={styles.projectMeta}>
                          <span className={styles.category}>{p.customLabel || 'PROFESIONAL'}</span>
                          {Boolean(p.year) && <span className={styles.yearBadge}>{p.year}</span>}
                        </div>
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
    </>
  );
}
