import styles from './About.module.css';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Download, FileText } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 10;

export async function generateMetadata() {
  const about = await client.fetch(`*[_type == "about" && _id == "about"][0]{ seo }`);
  const seo = about?.seo || {};
  if (!seo.metaTitle) return {};
  return { title: seo.metaTitle, description: seo.metaDescription };
}

export default async function AboutPage() {
  const about = await client.fetch(`*[_type == "about" && _id == "about"][0]{
    bio, title, subtitle, storyTitle,
    profileImage, bannerImage, stages, cvFile, seo,
    galleryTitle, actionPhotos
  }`) || {};

  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]{ brandName, socialLinks, contactEmail, footerDescription }`) || {};
  const stages = about.stages || [];
  const bannerImg = about.bannerImage?.asset ? urlFor(about.bannerImage).url() : null;
  const hasActionPhotos = Array.isArray(about.actionPhotos) && about.actionPhotos.length > 0;

  return (
    <>
      <Header brandName={settings?.brandName} socialLinks={settings?.socialLinks} />

      <PageBanner
        title={about.title || "BIO & TRAYECTORIA"}
        subtitle={about.subtitle || "La evolución de un apasionado por el séptimo arte."}
        backgroundImage={bannerImg}
      />

      <div className={styles.page}>
        {/* Intro: foto + bio corta */}
        <section className={styles.intro}>
          <div className="container">
            <div className={styles.introGrid}>
              <div className={styles.imageCol}>
                <div className={styles.profileBox}>
                  <img
                    src={about.profileImage?.asset ? urlFor(about.profileImage).url() : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"}
                    alt="Raúl García"
                  />
                </div>
              </div>
              <div className={styles.textCol}>
                <h2>{about.storyTitle || "CÓMO LLEGUÉ AQUÍ"}</h2>
                <p className="text-justified" style={{ whiteSpace: 'pre-line' }}>
                  {about.bio || ""}
                </p>
                {about.cvFile?.asset?._ref && (
                  <a
                    href={`https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xa9cwnu5'}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${about.cvFile.asset._ref.replace('file-', '').replace('-pdf', '.pdf')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cvButton}
                    download
                  >
                    <FileText size={18} />
                    <span>Descargar CV</span>
                    <Download size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline alternado */}
        {stages.length > 0 && (
          <section className={styles.timeline}>
            <div className="container">
              <h2 className={styles.timelineTitle}>MI TRAYECTORIA</h2>
              <div className={styles.timelineList}>
                {stages.map((stage, i) => (
                  <div key={i} className={`${styles.timelineItem} ${i % 2 !== 0 ? styles.reverse : ''}`}>
                    <div className={styles.timelineImage}>
                      {stage.stageImage?.asset ? (
                        <img src={urlFor(stage.stageImage).width(600).url()} alt={stage.stageTitle || `Etapa ${i + 1}`} />
                      ) : (
                        <div className={styles.imagePlaceholder}></div>
                      )}
                    </div>
                    <div className={styles.timelineText}>
                      <h3>{stage.stageTitle}</h3>
                      <p className="text-justified">{stage.stageText}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Galería En Acción */}
        <section className={styles.gallery}>
          <div className="container">
            <h2 className={styles.timelineTitle}>{about.galleryTitle || "EN ACCIÓN"}</h2>
            
            <div className={styles.photoGrid}>
              {hasActionPhotos ? (
                about.actionPhotos
                  .filter(photo => photo?.asset)
                  .map((photo, i) => (
                    <img key={i} src={urlFor(photo).url()} alt={`Rodaje ${i + 1}`} />
                  ))
              ) : (
                <>
                  <img src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop" alt="Rodaje Placeholder 1" />
                  <img src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop" alt="Rodaje Placeholder 2" />
                  <img src="https://images.unsplash.com/photo-1540655037529-dec987208707?q=80&w=2070&auto=format&fit=crop" alt="Rodaje Placeholder 3" />
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
