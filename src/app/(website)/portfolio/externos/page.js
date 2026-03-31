import styles from '../Portfolio.module.css';
import { client } from '@/sanity/lib/client';
import VideoEmbed from '@/components/VideoEmbed';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ExternosPage() {
  const query = `*[_type == "project" && category == "externo"] | order(_createdAt desc) {
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
          <h1 className="uppercase">TRABAJOS EXTERNOS</h1>
          <p>Explora mis trabajos profesionales para clientes, marcas y empresas.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.list}>
            {allProjects.length > 0 ? (
              allProjects.map((p) => {
                const thumb = p.imageUrl || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop";
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
                      <span className={styles.category}>PROFESIONAL</span>
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
                <h2>Aún no hay trabajos externos publicados</h2>
                <p>Gestiona tus colaboraciones profesionales desde el Centro de Mando satisfactoriamente.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
