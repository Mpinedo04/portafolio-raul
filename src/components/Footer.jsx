import { getIcon } from '@/lib/icons';
import styles from './Footer.module.css';

export default function Footer({ 
  brandName = "RAÚL GARCÍA", 
  contactEmail = "FCraulinho2004@gmail.com",
  footerDescription = "Filmmaker & Editor de Vídeo especializado en proyectos cinematográficos y documentales.",
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
          <h3 data-sanity="settings.brandName">{(brandName || "RAÚL GARCÍA").toUpperCase()}</h3>
          <p data-sanity="settings.footerDescription">{footerDescription}</p>
        </div>
        <div className={styles.center}>
          <h4>CONTACTO</h4>
          <p data-sanity="settings.contactEmail">{contactEmail}</p>
        </div>
        <div className={styles.right}>
          <p>© {new Date().getFullYear()} {brandName}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
