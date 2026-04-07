import styles from './Studies.module.css';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import PageBanner from '@/components/PageBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmptyState from '@/components/EmptyState';

export const revalidate = 10;

export async function generateMetadata() {
  return {
    title: 'Estudios y Conocimientos | Raúl García',
    description: 'Formación académica, cursos y dominio de software profesional audiovisual.',
  };
}

export default async function StudiesPage() {
  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]{ brandName, socialLinks, contactEmail, footerDescription }`) || {};
  const data = await client.fetch(
    `*[_type == "studies" && _id == "studies"][0]`,
    {},
    { next: { revalidate: 0, tags: ['studies'] } }
  ) || {};

  const education = data.education || [];
  const courses = data.courses || [];
  const software = data.software || [];

  // Group software by category
  const softwareByCategory = software.reduce((acc, sw) => {
    // Basic normalization to ensure "Video", "VIDEO" and "video" group together
    const cat = (sw.category || 'other').toLowerCase().trim();
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(sw);
    return acc;
  }, {});

  const categoryLabels = {
    video: 'Edición de Vídeo',
    audio: 'Audio / Sonido',
    design: 'Diseño / Gráficos',
    vfx: 'Efectos Visuales',
    other: 'Otros',
  };

  const bannerImg = data.bannerImage?.asset ? urlFor(data.bannerImage).url() : null;

  return (
    <>
      <Header brandName={settings?.brandName} socialLinks={settings?.socialLinks} />
      
      <PageBanner 
        title={data.bannerTitle || "ESTUDIOS Y CONOCIMIENTOS"} 
        subtitle="Formación académica, certificaciones y herramientas profesionales."
        backgroundImage={bannerImg}
      />

      <div className={styles.page}>
        {/* Formación Académica */}
        {education.length > 0 && (
          <section className={styles.section}>
            <div className="container">
              <h2 className={styles.sectionTitle}>FORMACIÓN ACADÉMICA</h2>
              <div className={styles.educationList}>
                {education.map((item, i) => (
                  <div key={i} className={styles.educationCard}>
                    {item.logo?.asset && (
                      <div className={styles.logoCol}>
                        <img src={urlFor(item.logo).width(80).url()} alt={item.institution} />
                      </div>
                    )}
                    <div className={styles.eduInfo}>
                      <h3>{item.degree}</h3>
                      <p className={styles.institution}>{item.institution}</p>
                      <div className={styles.eduMeta}>
                        {item.year && <span>{item.year}</span>}
                        {item.grade && <span className={styles.grade}>Nota: {item.grade}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Cursos */}
        {courses.length > 0 && (
          <section className={styles.section}>
            <div className="container">
              <h2 className={styles.sectionTitle}>CURSOS Y CERTIFICACIONES</h2>
              <div className={styles.coursesGrid}>
                {courses.map((course, i) => (
                  <div key={i} className={styles.courseCard}>
                    <h4>{course.courseName}</h4>
                    <p>{course.institution}</p>
                    {course.year && <span className={styles.year}>{course.year}</span>}
                    {course.certificate && (
                      <a href={course.certificate} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                        Ver Certificado →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Software */}
        {Object.keys(softwareByCategory).length > 0 && (
          <section className={styles.sectionAlt}>
            <div className="container">
              <h2 className={styles.sectionTitle}>SOFTWARE Y PROGRAMAS</h2>
              <p className={styles.softwareLegend}>Nivel de dominio del 1 (Básico) al 5 (Experto)</p>
              <div className={styles.softwareGroups} data-debug-grouped="true">
                {Object.entries(softwareByCategory)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([cat, items]) => (
                  <div key={cat} className={styles.softwareGroup}>
                    <h3 className={styles.groupTitle}>{categoryLabels[cat] || cat}</h3>
                    <div className={styles.softwareGrid}>
                      {items.map((sw, i) => (
                        <div key={i} className={styles.softwareCard}>
                          {sw.icon?.asset && (
                            <img src={urlFor(sw.icon).width(64).url()} alt={sw.softwareName} className={styles.swIcon} />
                          )}
                          <div className={styles.swInfo}>
                            <h4>{sw.softwareName}</h4>
                            {sw.level && (
                              <div className={styles.swLevel}>
                                <div className={styles.progressBar}>
                                  <div className={styles.progress} style={{ width: `${(sw.level / 5) * 100}%` }}></div>
                                </div>
                                <div className={styles.levelDots}>
                                  {[1, 2, 3, 4, 5].map(n => (
                                    <span key={n} className={`${styles.levelDot} ${n <= sw.level ? styles.levelDotActive : ''}`}>
                                      {n}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty state */}
        {education.length === 0 && courses.length === 0 && software.length === 0 && (
          <section className={styles.section}>
            <div className="container">
              <div className={styles.emptyState}>
                <EmptyState
                  type="studies"
                  title="Contenido en preparación"
                  subtitle="Añade tus estudios, cursos y software desde el Centro de Mando."
                />
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer 
        brandName={settings?.brandName} 
        contactEmail={settings?.contactEmail} 
        footerDescription={settings?.footerDescription}
        socialLinks={settings?.socialLinks} 
      />
    </>
  );
}
