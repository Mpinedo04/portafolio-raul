import styles from './Footer.module.css';

export default function Footer({ 
  brandName = "RAÚL GARCÍA", 
  contactEmail = "contacto@raulgarcia.com",
  headerIcons = [] 
}) {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.left}>
          <h3 data-sanity="settings.brandName">{brandName.toUpperCase()}</h3>
          <p>Filmmaker & Editor de Vídeo especializado en proyectos cinematográficos y documentales.</p>
        </div>
        <div className={styles.center}>
          <div className={styles.links}>
            {(headerIcons || []).length > 0 ? (
              headerIcons.map((item, index) => (
                <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.icon}
                </a>
              ))
            ) : (
              <>
                <a href="https://youtube.com/@Raaulinhoo" target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href={`mailto:${contactEmail}`} data-sanity="settings.contactEmail">Gmail</a>
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
