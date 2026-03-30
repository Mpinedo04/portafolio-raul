import { Aperture, Play, Mail, Send } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.left}>
          <h3>RAÚL GARCÍA</h3>
          <p>Filmmaker & Editor de Vídeo especializado en proyectos cinematográficos y documentales.</p>
        </div>
        <div className={styles.center}>
          <div className={styles.links}>
            <a href="https://youtube.com/@Raaulinhoo" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="mailto:contato@raulgarcia.com">Gmail</a>
          </div>
        </div>
        <div className={styles.right}>
          <p>© {new Date().getFullYear()} Raúl García. Todos los derechos reservados.</p>
          <p className={styles.credits}>Designed with passion by Antigravity</p>
        </div>
      </div>
    </footer>
  );
}
