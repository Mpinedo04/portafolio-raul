import styles from './Portfolio.module.css';
import Link from 'next/link';

export default async function PortfolioHub() {
  return (
    <div className={styles.portfolio}>
      <section className={styles.headerSection}>
        <div className="container">
          <h1 className="uppercase">PORTFOLIO</h1>
          <p>Selecciona una categoría para explorar mi trayectoria creativa satisfactoriamente.</p>
        </div>
      </section>

      <section className={styles.hubSection}>
        <div className="container">
          <div className={styles.hubGrid}>
            <Link href="/portfolio/propios" className={styles.hubCard}>
              <div className={styles.hubOverlay}>
                <h2>PROYECTOS PROPIOS</h2>
                <p>Cortometrajes, estudios y experimentación personal satisfactoriamente.</p>
              </div>
            </Link>
            <Link href="/portfolio/externos" className={styles.hubCard}>
              <div className={styles.hubOverlay}>
                <h2>TRABAJOS EXTERNOS</h2>
                <p>Clientes, empresas y proyectos corporativos satisfactoriamente.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
