import styles from './Hero.module.css';

export default function Hero({ 
  nameLine1 = "PORTAFOLIO",
  name = "RAÚL GARCÍA", 
  subHeadline = "CREANDO HISTORIAS A TRAVÉS DEL VISOR",
  headline = "Filmmaker & Editor de Vídeo. Documentando lo ordinario para hacerlo extraordinario.",
  backgroundImage = null,
  focalPoint = null,
  heroButtons = {}
}) {
  const heroStyle = {};

  if (backgroundImage) {
    heroStyle.backgroundImage = `url(${backgroundImage})`;
  }

  if (focalPoint && typeof focalPoint.x === 'number' && typeof focalPoint.y === 'number') {
    heroStyle.backgroundPosition = `${(focalPoint.x * 100).toFixed(1)}% ${(focalPoint.y * 100).toFixed(1)}%`;
  }
  
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
          <span className={styles.line1}>{nameLine1}</span>
          <span className={styles.line2}>{name}</span>
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
