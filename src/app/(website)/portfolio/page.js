import styles from './Portfolio.module.css';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import PageBanner from '@/components/PageBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 10;

export default async function PortfolioHub() {
  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]{ brandName, socialLinks, contactEmail, footerDescription, portfolioBanner }`) || {};
  
  const bannerImg = settings.portfolioBanner?.asset ? urlFor(settings.portfolioBanner).url() : null;

  return (
    <>
      <Header brandName={settings?.brandName} socialLinks={settings?.socialLinks} />

      <PageBanner
        title="PROYECTOS"
        subtitle="Selecciona una categoría para explorar mi trayectoria creativa."
        backgroundImage={bannerImg}
      />

      <div className={styles.portfolio}>
        <section className={styles.hubSection}>
          <div className="container">
            <div className={styles.hubGrid}>
              <Link href="/portfolio/propios" className={styles.hubCard}>
                <div className={styles.hubOverlay}>
                  <h2>PROYECTOS PROPIOS</h2>
                  <p>Cortometrajes, estudios y experimentación personal.</p>
                </div>
              </Link>
              <Link href="/portfolio/externos" className={styles.hubCard}>
                <div className={styles.hubOverlay}>
                  <h2>TRABAJOS EXTERNOS</h2>
                  <p>Clientes, empresas y proyectos corporativos.</p>
                </div>
              </Link>
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
