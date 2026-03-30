import styles from './Portfolio.module.css';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';

export const revalidate = 10;

export default async function PortfolioPage() {
  const allProjects = await client.fetch(`*[_type == "project"] | order(_createdAt desc)`) || [];

  let ownProjectsRaw = allProjects.filter(p => p.type === 'Personal');
  let externalProjectsRaw = allProjects.filter(p => p.type === 'Cliente');

  // Fallbacks in case Sanity is still empty
  const ownProjects = ownProjectsRaw.length > 0 ? ownProjectsRaw : [
    { _id: '1', title: 'CATARSIS', category: 'Ficción', role: 'Director & Montador', description: 'Un viaje al subconsciente de un artista en crisis.', link: 'https://youtube.com', placeholder: true },
    { _id: '2', title: 'IMÁGENES OCULTAS', category: 'Documental', role: 'Director de Fotografía', description: 'Explorando los rincones olvidados de la ciudad.', link: 'https://youtube.com', placeholder: true }
  ];

  const externalProjects = externalProjectsRaw.length > 0 ? externalProjectsRaw : [
    { _id: '3', title: 'Campaña Marca X', category: 'Publicidad', role: 'Montador', description: 'Edición rítmica para el lanzamiento de la nueva colección de verano.', link: 'https://youtube.com', placeholder: true },
    { _id: '4', title: 'Video Clip - Artista Y', category: 'Musical', role: 'Operador de Cámara', description: 'Rodaje dinámico con iluminación de alto contraste.', link: 'https://youtube.com', placeholder: true }
  ];

  const ProjectItem = ({ project }) => (
    <div className={styles.projectItem}>
      <div className={styles.mediaSide}>
        <a href={project.videoUrl || project.link || '#'} target="_blank" rel="noopener noreferrer" className={styles.videoPlaceholder}>
           <img 
             src={!project.placeholder && project.mainImage ? urlFor(project.mainImage).url() : "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop"} 
             alt={project.title} 
           />
           <div className={styles.playOverlay}>
              <span>VER VÍDEO</span>
           </div>
        </a>
      </div>
      <div className={styles.textSide}>
        <span className={styles.category}>{project.category || 'Proyecto'}</span>
        <h3>{project.title.toUpperCase()}</h3>
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
            {ownProjects.map(p => <ProjectItem key={p._id} project={p} />)}
          </div>
        </div>
      </section>

      {/* Proyectos Externos */}
      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle}>PROYECTOS EXTERNOS</h2>
          <div className={styles.list}>
            {externalProjects.map(p => <ProjectItem key={p._id} project={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
