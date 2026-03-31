import styles from './Portfolio.module.css';
import { client } from '@/sanity/lib/client';
import VideoEmbed from '@/components/VideoEmbed';

// CARGA DIRECTA Y CONTINUA (Sin Caché)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PortfolioPage() {
  // Consulta ultra-simplificada para evitar fallos de renderizado
  const query = `*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    description,
    role,
    category,
    videoUrl,
    "imageUrl": mainImage.asset->url
  }`;
  
  const allProjects = await client.fetch(query) || [];

  return (
    <div className={styles.portfolio}>
      <section className={styles.headerSection}>
        <div className="container">
          <h1 className="uppercase">MI TRABAJO</h1>
          <p>Catálogo de producciones y colaboraciones de Raúl García.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.list}>
            {allProjects.length > 0 ? (
              allProjects.map((p) => {
                const thumb = p.imageUrl || "https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=2069&auto=format&fit=crop";
                
                return (
                  <div key={p._id} className={styles.projectItem} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '40px' }}>
                    <div className={styles.mediaSide}>
                      {p.videoUrl ? (
                        <VideoEmbed url={p.videoUrl} title={p.title} thumbnail={thumb} />
                      ) : (
                        <img src={thumb} alt={p.title} style={{ width: '100%', borderRadius: '8px' }} />
                      )}
                    </div>
                    <div className={styles.textSide}>
                      <span className={styles.category}>{p.category || 'PROYECTO'}</span>
                      <h3 className="uppercase" style={{ fontSize: '2rem', margin: '10px 0' }}>{p.title}</h3>
                      <p className={styles.description} style={{ opacity: 0.8 }}>{p.description}</p>
                      <div className={styles.roleBlock} style={{ marginTop: '20px' }}>
                        <strong>ROL:</strong> {p.role}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <h2>No se han encontrado proyectos</h2>
                <p>Verifica que tus proyectos en Sanity estén marcados como Publicados.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
