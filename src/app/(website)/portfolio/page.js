import styles from './Portfolio.module.css';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import VideoEmbed from '@/components/VideoEmbed';

export const revalidate = 10; // Refresco casi instantáneo para edición rápida

const ProjectItem = ({ project }) => (
  <div className={styles.projectItem}>
    <div className={styles.mediaSide}>
      {project.videoUrl ? (
        <VideoEmbed 
          url={project.videoUrl} 
          title={project.title} 
          thumbnail={(!project.placeholder && project.mainImage && project.mainImage.asset) ? urlFor(project.mainImage).url() : ""} 
        />
      ) : (
        <div className={styles.videoPlaceholder}>
          <img 
            src={(!project.placeholder && project.mainImage && project.mainImage.asset) ? urlFor(project.mainImage).url() : "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop"} 
            alt={project.title} 
          />
        </div>
      )}
    </div>
    <div className={styles.textSide}>
      <span className={styles.category} data-sanity={`project:${project._id}.category`}>
        {project.category === 'propio' ? 'Proyecto Propio' : 'Proyecto Externo'}
      </span>
      <h3 className="uppercase" data-sanity={`project:${project._id}.title`}>{project.title}</h3>
      <p className={styles.description} data-sanity={`project:${project._id}.description`}>{project.description}</p>
      <div className={styles.roleBlock}>
        <strong>MI ROL:</strong>
        <p data-sanity={`project:${project._id}.role`}>{project.role}</p>
      </div>
    </div>
  </div>
);

export default async function PortfolioPage() {
  const allProjects = await client.fetch(`*[_type == "project"] | order(_createdAt desc)`) || [];

  // Lógica robusta: Si no tiene categoría o es desconocida, va a "Propios"
  const ownProjectsRaw = allProjects.filter(p => !p.category || p.category === 'propio');
  const externalProjectsRaw = allProjects.filter(p => p.category === 'externo');

  // Si hay cualquier proyecto en Sanity, no mostramos los fallbacks
  const hasRealProjects = allProjects.length > 0;

  const ownProjects = hasRealProjects ? ownProjectsRaw : [
    { _id: '1', title: 'CATARSIS', category: 'propio', role: 'Director & Montador', description: 'Un viaje al subconsciente de un artista en crisis.', link: 'https://youtube.com', placeholder: true },
    { _id: '2', title: 'IMÁGENES OCULTAS', category: 'propio', role: 'Director de Fotografía', description: 'Explorando los rincones olvidados de la ciudad.', link: 'https://youtube.com', placeholder: true }
  ];

  const externalProjects = hasRealProjects ? externalProjectsRaw : [
    { _id: '3', title: 'Campaña Marca X', category: 'externo', role: 'Montador', description: 'Edición rítmica para el lanzamiento de la nueva colección de verano.', link: 'https://youtube.com', placeholder: true },
    { _id: '4', title: 'Video Clip - Artista Y', category: 'externo', role: 'Operador de Cámara', description: 'Rodaje dinámico con iluminación de alto contraste.', link: 'https://youtube.com', placeholder: true }
  ];

  return (
    <div className={styles.portfolio}>
      <section className={styles.headerSection}>
        <div className="container">
          <h1 data-sanity="project.title">MI TRABAJO</h1>
          <p>Una selección de mis proyectos más recientes...</p>
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
