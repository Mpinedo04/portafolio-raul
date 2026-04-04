import styles from './PageBanner.module.css';

export default function PageBanner({ title, subtitle, backgroundImage }) {
  const bgStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <section className={`${styles.banner} ${backgroundImage ? '' : styles.noImage}`} style={bgStyle}>
      <div className={styles.overlay}></div>
      <div className={`${styles.content} container`}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
