import styles from './PageBanner.module.css';

export default function PageBanner({ title, subtitle, backgroundImage, focalPoint = null }) {
  const bgStyle = {};

  if (backgroundImage) {
    bgStyle.backgroundImage = `url(${backgroundImage})`;
  }

  if (focalPoint && typeof focalPoint.x === 'number' && typeof focalPoint.y === 'number') {
    bgStyle.backgroundPosition = `${(focalPoint.x * 100).toFixed(1)}% ${(focalPoint.y * 100).toFixed(1)}%`;
  }

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
