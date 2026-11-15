import styles from './Footer.module.css';

export default function Footer({ 
  brandName = "RAÚL GARCÍA", 
  contactEmail = "raulgarciafernandez2004@gmail.com",
  footerDescription = "Filmmaker & Editor de Vídeo especializado en proyectos cinematográficos y documentales."
}) {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.left}>
          <h3>{(brandName || "RAÚL GARCÍA").toUpperCase()}</h3>
          <p>{footerDescription}</p>
        </div>
        <div className={styles.center}>
          <h4>CONTACTO</h4>
          <p>{contactEmail}</p>
        </div>
        <div className={styles.right}>
          <p>© {new Date().getFullYear()} {brandName}. Todos los derechos reservados.</p>
          <p className={styles.credit}>
            Hecho por Miguel ·{' '}
            <a href="mailto:pinedofacimiguel@gmail.com">pinedofacimiguel@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
