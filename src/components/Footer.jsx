import { getIcon } from '@/lib/icons';
import styles from './Footer.module.css';

export default function Footer({ 
  brandName = "RAÚL GARCÍA", 
  contactEmail = "FCraulinho2004@gmail.com",
  socialLinks = [] 
}) {
  const renderIcon = (name) => {
    const IconComponent = getIcon(name);
    return <IconComponent size={24} />;
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.left}>
          <h3 data-sanity="settings.brandName">{brandName.toUpperCase()}</h3>
          <p>Filmmaker & Editor de Vídeo especializado en proyectos cinematográficos y documentales.</p>
        </div>
        <div className={styles.center}>
          {/* Social links removed to avoid redundancy with the Header */}
        </div>
        <div className={styles.right}>
          <p>© {new Date().getFullYear()} {brandName}. Todos los derechos reservados.</p>
          <p className={styles.credits}>Designed with passion by Antigravity</p>
        </div>
      </div>
    </footer>
  );
}
