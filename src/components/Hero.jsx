import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={`${styles.content} container`}>
        <h2 className="fade-in">CREANDO HISTORIAS A TRAVÉS DEL VISOR</h2>
        <h1 className="fade-in">RAÚL GARCÍA</h1>
        <p className="fade-in">Filmmaker & Editor de Vídeo. Documentando lo ordinario para hacerlo extraordinario.</p>
        <div className={styles.actions}>
          <a href="/portfolio" className={styles.primaryBtn}>Ver Proyectos</a>
          <a href="/contacto" className={styles.secondaryBtn}>Trabajemos Juntos</a>
        </div>
      </div>
    </section>
  );
}
