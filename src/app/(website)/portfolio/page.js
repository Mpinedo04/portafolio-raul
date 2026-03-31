import styles from './Portfolio.module.css';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import VideoEmbed from '@/components/VideoEmbed';

// DESACTIVAR CACHÉ TOTALMENTE PARA TESTEO PROFUNDO
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ProjectItem = ({ project }) => {
  // Asegurar que tenemos una imagen o un fallback sólido
  const imageUrl = (project.mainImage && project.mainImage.asset) 
    ? urlFor(project.mainImage).url() 
    : "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className={styles.projectItem}>
      <div className={styles.mediaSide}>
        {project.videoUrl ? (
          <VideoEmbed 
            url={project.videoUrl} 
            title={project.title} 
            thumbnail={imageUrl} 
          />
        ) : (
          <div className={styles.videoPlaceholder}>
            <img src={imageUrl} alt={project.title} />
          </div>
        )}
      </div>
      <div className={styles.textSide}>
        <span className={styles.category}>
          {project.category === 'externo' ? 'Proyecto Externo' : 'Proyecto Propio'}
        </span>
        <h3 className="uppercase">{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.roleBlock}>
          <strong>MI ROL:</strong>
          <p>{project.role || "Director / Editor"}</p>
        </div>
      </div>
    </div>
  );
};

export default async function PortfolioPage() {
  // Fetch crudo sin filtros para forzar la visibilidad
  const allProjects = await client.fetch(`*[_type == "project"] | order(_createdAt desc)`) || [];

  return (
    <div className={styles.portfolio}>
      <section className={styles.headerSection}>
        <div className="container">
          <h1 className="uppercase">MI TRABAJO</h1>
          <p>Explora mi catálogo completo de producciones y colaboraciones.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.list}>
            {allProjects.length > 0 ? (
              allProjects.map(p => <ProjectItem key={p._id} project={p} />)
            ) : (
              <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <h2>CARGANDO PROYECTOS...</h2>
                <p>Si esta página no cambia en unos segundos, revisa que tus proyectos estén PUBLICADOS en Sanity y tengan una Imagen Principal.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
