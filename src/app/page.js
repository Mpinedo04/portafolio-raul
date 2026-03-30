import Hero from '@/components/Hero';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <Hero />
      
      {/* Breve descripción sobre mí */}
      <section className={styles.intro}>
        <div className="container">
          <div className={styles.introContent}>
            <div className={styles.introText}>
              <h2>ACERCA DE MÍ</h2>
              <p>Hola, soy Raúl. Mi pasión es la creación audiovisual desde los cimientos: desde la idea inicial hasta el montaje final.</p>
              <p>Me especializo en capturar la esencia de cada momento, ya sea en un set de rodaje profesional o en proyectos documentales independientes.</p>
              <Link href="/sobre-mi" className={styles.link}>
                Conoce mi historia <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos destacados */}
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.header}>
            <h2>TRABAJOS DESTACADOS</h2>
            <Link href="/portfolio" className={styles.viewAll}>
              Ver Portfolio Completo
            </Link>
          </div>
          
          <div className={styles.grid}>
            {/* Project Card Placeholder 1 */}
            <div className={styles.projectCard}>
              <div className={styles.imageWrapper}>
                <img src="https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=2069&auto=format&fit=crop" alt="Proyecto destacato" />
              </div>
              <div className={styles.projectInfo}>
                <h3>CATARSIS</h3>
                <p>Cortometraje de ficción. Drama psicológico.</p>
                <span className={styles.role}>Rol: Director & Montador</span>
              </div>
            </div>

            {/* Project Card Placeholder 2 */}
            <div className={styles.projectCard}>
              <div className={styles.imageWrapper}>
                <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" alt="Proyecto destacato" />
              </div>
              <div className={styles.projectInfo}>
                <h3>IMÁGENES OCULTAS</h3>
                <p>Documental experimental sobre la vida urbana.</p>
                <span className={styles.role}>Rol: Director de Fotografía</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
