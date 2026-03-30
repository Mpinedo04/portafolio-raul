import styles from './Portfolio.module.css';

export default function PortfolioPage() {
  const ownProjects = [
    { id: 1, title: 'CATARSIS', category: 'Ficción', role: 'Director & Montador', description: 'Un viaje al subconsciente de un artista en crisis.', video: 'https://youtube.com' },
    { id: 2, title: 'IMÁGENES OCULTAS', category: 'Documental', role: 'Director de Fotografía', description: 'Explorando los rincones olvidados de la ciudad.', video: 'https://youtube.com' }
  ];

  const externalProjects = [
    { id: 3, title: 'Campaña Marca X', category: 'Publicidad', role: 'Montador', description: 'Edición rítmica para el lanzamiento de la nueva colección de verano.', video: 'https://youtube.com' },
    { id: 4, title: 'Video Clip - Artista Y', category: 'Musical', role: 'Operador de Cámara', description: 'Rodaje dinámico con iluminación de alto contraste.', video: 'https://youtube.com' }
  ];

  const ProjectItem = ({ project }) => (
    <div className={styles.projectItem}>
      <div className={styles.mediaSide}>
        <div className={styles.videoPlaceholder}>
           <img src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop" alt={project.title} />
           <div className={styles.playOverlay}>
              <span>VER VÍDEO</span>
           </div>
        </div>
      </div>
      <div className={styles.textSide}>
        <span className={styles.category}>{project.category}</span>
        <h3>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.roleBlock}>
          <strong>MI ROL:</strong>
          <p>{project.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.portfolio}>
      <section className={styles.headerSection}>
        <div className="container">
          <h1>MI TRABAJO</h1>
          <p>Una selección de mis proyectos más recientes, desde cortometrajes personales hasta trabajos comerciales para marcas.</p>
        </div>
      </section>

      {/* Proyectos Propios */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>PROYECTOS PROPIOS</h2>
          <div className={styles.list}>
            {ownProjects.map(p => <ProjectItem key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      {/* Proyectos Externos */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>PROYECTOS EXTERNOS</h2>
          <div className={styles.list}>
            {externalProjects.map(p => <ProjectItem key={p.id} project={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
