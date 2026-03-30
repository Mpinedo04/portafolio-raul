import styles from './Hero.module.css';

export default function Hero({ name = "RAÚL GARCÍA", headline = "Filmmaker & Editor de Vídeo. Documentando lo ordinario para hacerlo extraordinario." }) {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`${styles.content} container`}>
        <h2 className="fade-in">CREANDO HISTORIAS A TRAVÉS DEL VISOR</h2>
        <h1 className="fade-in">{name.toUpperCase()}</h1>
        <p className="fade-in">{headline}</p>
        <div className={styles.actions}>
          <a href="/portfolio" className={styles.primaryBtn}>Ver Proyectos</a>
          <a href="/contacto" className={styles.secondaryBtn}>Trabajemos Juntos</a>
        </div>
      </div>
    </section>
  );
}
