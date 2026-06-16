import { Camera, Layers, Lightbulb, Mic, Monitor, Wrench, Box, Headphones, Disc, Film } from 'lucide-react';
import styles from './Equipment.module.css';
import { client } from '@/sanity/lib/client';
import { urlForOptimized } from '@/sanity/lib/image';
import PageBanner from '@/components/PageBanner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmptyState from '@/components/EmptyState';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CATEGORY_CONFIG = {
  video_camaras:        { label: 'Cámaras',               icon: Camera,     group: 'video' },
  video_objetivos:      { label: 'Objetivos',              icon: Layers,     group: 'video' },
  video_accesorios:     { label: 'Accesorios de Vídeo',    icon: Wrench,     group: 'video' },
  sonido_microfonos:    { label: 'Micrófonos',             icon: Mic,        group: 'sonido' },
  sonido_grabadoras:    { label: 'Grabadoras',             icon: Disc,       group: 'sonido' },
  sonido_accesorios:    { label: 'Accesorios de Sonido',   icon: Headphones, group: 'sonido' },
  iluminacion_focos:    { label: 'Focos / Luces',          icon: Lightbulb,  group: 'iluminacion' },
  iluminacion_accesorios:{ label: 'Accesorios de Iluminación', icon: Wrench, group: 'iluminacion' },
  extras_croma:         { label: 'Croma / Fondos',         icon: Film,       group: 'extras' },
  extras_otros:         { label: 'Otros',                  icon: Box,        group: 'extras' },
};

const GROUP_LABELS = {
  video: '🎥 VÍDEO',
  sonido: '🎙️ SONIDO',
  iluminacion: '💡 ILUMINACIÓN',
  extras: '📦 EXTRAS',
};

export default async function EquipmentPage() {
  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]{ brandName, socialLinks, contactEmail, footerDescription }`) || {};
  const allEquipment = await client.fetch(`*[_type == "equipment"] | order(orderRank asc, category asc)`) || [];
  const workstation = await client.fetch(`*[_type == "workstation" && _id == "workstation"][0]{ title, subtitle, bannerImage, components }`) || {};

  // Group equipment by their top-level group
  const grouped = {};
  allEquipment.forEach(eq => {
    const rawCategory = typeof eq.category === 'string' ? eq.category : JSON.stringify(eq.category);
    // Strip zero-width spaces, BOM, and other invisible characters that corrupt exact-string matching
    const safeCategory = (rawCategory || '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .toLowerCase()
      .trim();
    
    // Explicitly check the object directly
    let config = CATEGORY_CONFIG[safeCategory];
    
    if (!config) {
      config = { label: `DEBUG_v4: [${safeCategory}]`, icon: Box, group: 'extras' };
    }
    
    const groupKey = config.group;
    if (!grouped[groupKey]) grouped[groupKey] = [];
    grouped[groupKey].push({ ...eq, config });
  });

  const pcComponents = workstation.components || [
    { componentName: 'PROCESADOR', value: 'AMD Ryzen 9 5950X', specs: '16 Núcleos / 32 Hilos' },
    { componentName: 'GRÁFICA', value: 'NVIDIA RTX 3080', specs: '10GB VRAM' },
    { componentName: 'RAM', value: '64GB DDR4', specs: '3600MHz' },
    { componentName: 'ALMACENAMIENTO', value: '4TB NVMe + 12TB HDD', specs: 'Gen4 SSD + RAID' },
    { componentName: 'MONITOR', value: 'ASUS ProArt 27"', specs: '4K Calibración Rec.709' },
  ];

  const bannerImg = workstation.bannerImage?.asset ? urlForOptimized(workstation.bannerImage, { width: 1600, quality: 82 }) : null;

  return (
    <>
      <Header brandName={settings?.brandName} socialLinks={settings?.socialLinks} />

      <PageBanner
        title={workstation.title || "EQUIPO TÉCNICO"}
        subtitle={workstation.subtitle || "Herramientas de alta gama para resultados cinematográficos."}
        backgroundImage={bannerImg}
      />

      <div className={styles.page}>
        {/* Equipment groups */}
        {Object.entries(GROUP_LABELS).map(([groupKey, groupLabel]) => {
          const items = grouped[groupKey];
          if (!items || items.length === 0) return null;

          return (
            <section key={groupKey} className={groupKey === 'sonido' || groupKey === 'extras' ? styles.sectionAlt : styles.section}>
              <div className="container">
                <h2 className={styles.groupTitle}>{groupLabel}</h2>
                <div className={styles.equipGrid}>
                  {items.map((eq, i) => {
                    const IconComp = eq.config.icon;
                    return (
                      <div key={eq._id || i} className={styles.card}>
                        {eq.image?.asset ? (
                          <div className={styles.cardImage}>
                            <img src={urlForOptimized(eq.image, { width: 700, quality: 78 })} alt={eq.name} />
                          </div>
                        ) : (
                          <div className={styles.cardIconRow}>
                            <IconComp size={22} />
                            <span className={styles.catLabel}>{eq.config.label}</span>
                          </div>
                        )}
                        <div className={styles.cardBody}>
                          <h3>{eq.name}</h3>
                          {eq.model && <p className={styles.model}>{eq.model}</p>}
                          {eq.specs && <p className={styles.specs}>{eq.specs}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        {/* Empty state if no equipment */}
        {allEquipment.length === 0 && (
          <section className={styles.section}>
            <div className="container">
              <div className={styles.emptyState}>
                <EmptyState
                  type="equipment"
                  title="Inventario en preparación"
                  subtitle="Añade equipos desde el Centro de Mando."
                />
              </div>
            </div>
          </section>
        )}

        {/* Workstation */}
        <section className={styles.pcSection}>
          <div className="container">
            <div className={styles.pcHeader}>
              <Monitor size={64} color="var(--color-accent)" />
              <h2>ESTACIÓN DE EDICIÓN</h2>
            </div>
            <div className={styles.pcGrid}>
              {pcComponents.map((c, i) => (
                <div key={i} className={styles.pcSpec}>
                  <strong>{c.componentName}</strong>
                  <span className={styles.pcValue}>{c.value}</span>
                  {c.specs && <span className={styles.pcDetail}>{c.specs}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
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
