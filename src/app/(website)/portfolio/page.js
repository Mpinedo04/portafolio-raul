import styles from './Portfolio.module.css';
import Link from 'next/link';
import { urlForOptimized } from '@/sanity/lib/image';
import PageBanner from '@/components/PageBanner';
import { getSiteSettings } from '@/sanity/lib/settings';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return buildMetadata({
    title: 'Proyectos | Raúl García',
    description:
      'Selección de cortometrajes, documentales, spots y trabajos audiovisuales de Raúl García: proyectos propios y encargos para clientes.',
    path: '/portfolio',
  });
}

export default async function PortfolioHub() {
  const settings = await getSiteSettings();
  
  const bannerImg = settings.portfolioBanner?.asset ? urlForOptimized(settings.portfolioBanner, { width: 2400, quality: 90 }) : null;
  const bannerFocalPoint = settings.portfolioBanner?.hotspot || null;

  return (
    <>
      <PageBanner
        title={settings.portfolioTitle || "PROYECTOS"}
        subtitle={settings.portfolioSubtitle || "Selecciona una categoría para explorar mi trayectoria creativa."}
        backgroundImage={bannerImg}
        focalPoint={bannerFocalPoint}
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
    </>
  );
}
