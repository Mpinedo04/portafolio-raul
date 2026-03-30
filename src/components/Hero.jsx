import styles from './Hero.module.css';

export default function Hero({ 
  name = "RAÚL GARCÍA", 
  headline = "Filmmaker & Editor de Vídeo. Documentando lo ordinario para hacerlo extraordinario.",
  backgroundImage = null,
  heroButtons = {}
}) {
  const heroStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};
  
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
        <h2 className="fade-in">CREANDO HISTORIAS A TRAVÉS DEL VISOR</h2>
        <h1 className={`${styles.title} fade-in uppercase`}>{name}</h1>
        <p className="fade-in">{headline}</p>
        <div className={styles.actions}>
          <a 
            href={primaryUrl} 
            className={styles.primaryBtn}
            data-sanity="profile.heroButtons.primaryText"
          >
            {primaryText}
          </a>
          <a 
            href={secondaryUrl} 
            className={styles.secondaryBtn}
            data-sanity="profile.heroButtons.secondaryText"
          >
            {secondaryText}
          </a>
        </div>
      </div>
    </section>
  );
}
