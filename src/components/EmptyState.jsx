import { Film, Clapperboard, Camera, GraduationCap, Wrench } from 'lucide-react';
import styles from './EmptyState.module.css';

const iconMap = {
  projects: Clapperboard,
  propios: Film,
  externos: Camera,
  studies: GraduationCap,
  equipment: Wrench,
};

export default function EmptyState({ 
  type = 'projects',
  title = 'Contenido en preparación',
  subtitle = 'Añade contenido desde el Centro de Mando.'
}) {
  const Icon = iconMap[type] || Film;

  return (
    <div className={styles.emptyState}>
      <div className={styles.iconWrapper}>
        <Icon size={48} strokeWidth={1.5} />
      </div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div className={styles.decorLine}></div>
    </div>
  );
}
