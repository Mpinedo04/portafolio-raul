import styles from './Hero.module.css';

export default function Hero({ 
  name = "PORTAFOLIO RAÚL GARCÍA", 
  subHeadline = "CREANDO HISTORIAS A TRAVÉS DEL VISOR",
  headline = "Filmmaker & Editor de Vídeo. Documentando lo ordinario para hacerlo extraordinario.",
  backgroundImage = null,
  heroButtons = {}
}) {
  const heroStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};
  
  // Opción B: Split automático
  const nameParts = (name || "").split(" ");
  const line1 = nameParts[0] || "";
  const line2 = nameParts.slice(1).join(" ") || "";
  
  const { 
    primaryText = "Ver Proyectos", 
    primaryUrl = "/portfolio", 
    secondaryText = "Trabajemos Juntos", 
    secondaryUrl = "/contacto" 
  } = heroButtons || {};

  return (
    <section className={styles.hero} style={heroStyle}>
      <div className={styles.overlay}></div>
      <div className={`${styles.content} container`}>
        <h2 className="fade-in" data-sanity="home.subHeadline">{subHeadline}</h2>
        <h1 className={`${styles.title} fade-in uppercase`} data-sanity="home.headline">
          <span className={styles.line1}>{line1}</span>
          <span className={styles.line2}>{line2}</span>
        </h1>
        <p className="fade-in">{headline}</p>
        <div className={styles.actions}>
          <a 
            href={primaryUrl} 
            className={styles.primaryBtn}
            data-sanity="home.heroButtons.primaryText"
          >
            {primaryText}
          </a>
          <a 
            href={secondaryUrl} 
            className={styles.secondaryBtn}
            data-sanity="home.heroButtons.secondaryText"
          >
            {secondaryText}
          </a>
        </div>
      </div>
    </section>
  );
}
