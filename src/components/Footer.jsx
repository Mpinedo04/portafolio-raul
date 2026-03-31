import * as Icons from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer({ 
  brandName = "RAÚL GARCÍA", 
  contactEmail = "contacto@raulgarcia.com",
  socialLinks = [] 
}) {
  // Mapeo automático de iconos de Lucide
  const renderIcon = (name) => {
    const IconComponent = Icons[name] || Icons.Link;
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
          <div className={styles.links} data-sanity="settings.socialLinks">
            {(socialLinks || []).length > 0 ? (
              socialLinks.map((item, index) => (
                <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                  {renderIcon(item.platform)}
                </a>
              ))
            ) : (
              // Fallback icons if none in Sanity
              <>
                <a href="https://youtube.com/@Raaulinhoo" target="_blank" rel="noopener noreferrer"><Icons.Youtube /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Icons.Instagram /></a>
                <a href={`mailto:${contactEmail}`} data-sanity="settings.contactEmail"><Icons.Mail /></a>
              </>
            )}
          </div>
        </div>
        <div className={styles.right}>
          <p>© {new Date().getFullYear()} {brandName}. Todos los derechos reservados.</p>
          <p className={styles.credits}>Designed with passion by Antigravity</p>
        </div>
      </div>
    </footer>
  );
}
