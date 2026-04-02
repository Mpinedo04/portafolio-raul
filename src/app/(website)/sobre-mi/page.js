import styles from './About.module.css';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
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
    seo
  }`) || {
    bio: "",
    profileImage: null,
    actionPhotos: [],
  };

  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]{ brandName, socialLinks, contactEmail, footerDescription }`) || {};
  const hasActionPhotos = (about.actionPhotos || []).length > 0;

  return (
    <>
      <Header brandName={settings?.brandName} socialLinks={settings?.socialLinks} />
      <div className={styles.about}>
        <header className={styles.header}>
          <div className="container">
            <h1>{about.title || "BIO & TRAYECTORIA"}</h1>
            <p>{about.subtitle || "La evolución de un apasionado por el séptimo arte."}</p>
          </div>
        </header>

        <section className={styles.content}>
          <div className="container">
            <div className={styles.grid}>
              <div className={styles.imageCol}>
                <div className={styles.profileBox}>
                   <img 
                     src={(about.profileImage?.asset) ? urlFor(about.profileImage).url() : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"} 
                     alt="Raúl García" 
                   />
                   <div className={styles.boxDecor}></div>
                </div>
              </div>
              <div className={styles.textCol}>
                <h2>{about.storyTitle || "CÓMO LLEGUÉ AQUÍ"}</h2>
                <p className="text-justified" style={{ whiteSpace: 'pre-line' }}>{about?.bio || ""}</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.gallery}>
          <div className="container">
            <h2>{about.galleryTitle || "EN ACCIÓN"}</h2>
            <div className={styles.photoGrid}>
              {hasActionPhotos ? (
                about.actionPhotos
                  .filter(photo => photo?.asset)
                  .map((photo, i) => (
                    <img key={i} src={urlFor(photo).url()} alt={`Rodaje ${i+1}`} />
                  ))
              ) : (
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
    </>
  );
}
