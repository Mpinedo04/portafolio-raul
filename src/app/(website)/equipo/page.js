import { Camera, Layers, Lightbulb, Mic, Monitor, Wrench, Box } from 'lucide-react';
import styles from './Equipment.module.css';
import { client } from '@/sanity/lib/client';

export const revalidate = 3600; // Refresco eficiente cada hora (ISR)

export default async function EquipmentPage() {
  // 1. Fetch data from Sanity
  const workstationDoc = await client.fetch(`*[_id == "workstation-specs"][0]`);
  const allEquipment = await client.fetch(`*[_type == "equipment" && _id != "workstation-specs"]`) || [];

  // 2. Helper to get category icons
  const getCategoryIcon = (categoryValue) => {
    switch (categoryValue) {
      case 'camaras': return <Camera size={24} />;
      case 'objetivos': return <Layers size={24} />;
      case 'audio': return <Mic size={24} />;
      case 'iluminacion': return <Lightbulb size={24} />;
      case 'accesorios': return <Wrench size={24} />;
      case 'hardware': return <Monitor size={24} />;
      default: return <Box size={24} />;
    }
  };

  // 3. Helper to get category titles
  const getCategoryTitle = (categoryValue) => {
    switch (categoryValue) {
      case 'camaras': return 'Cámaras';
      case 'objetivos': return 'Objetivos';
      case 'audio': return 'Audio';
      case 'iluminacion': return 'Iluminación';
      case 'accesorios': return 'Accesorios';
      case 'hardware': return 'Hardware';
      default: return categoryValue || 'Otros';
    }
  };

  // 4. PC Specs logic (focusing on the dedicated document workstation-specs)
  const pcSpecs = workstationDoc?.items?.length > 0 ? workstationDoc.items : [
    { name: 'PROCESADOR', specs: 'AMD Ryzen 9 5950X (16 Núcleos)' },
    { name: 'GRÁFICA', specs: 'NVIDIA RTX 3080 10GB VRAM' },
    { name: 'RAM', specs: '64GB DDR4 3600MHz' },
    { name: 'ALMACENAMIENTO', specs: '4TB NVMe Gen4 SSD + 12TB HDD RAID' },
    { name: 'MONITOR', specs: '2x ASUS ProArt 27" 4K (Calibración Rec.709)' }
  ];

  const gridCategories = allEquipment.map(doc => ({
    _id: doc._id,
    title: getCategoryTitle(doc.category),
    icon: getCategoryIcon(doc.category),
    items: doc.items || []
  }));

  return (
    <div className={styles.equipment}>
      <header className={styles.header}>
        <div className="container">
          <h1>EQUIPO TÉCNICO</h1>
          <p>Herramientas de alta gama para resultados cinematográficos.</p>
        </div>
      </header>

      <section className={styles.gridSection}>
        <div className="container">
          <div className={styles.categoryGrid}>
            {gridCategories.map((cat, idx) => (
              <div 
                key={idx} 
                className={styles.card}
                data-sanity={cat._id ? `${cat._id}` : undefined}
              >
                <div className={styles.cardHeader}>
                  {cat.icon}
                  <h2 className="uppercase">{cat.title}</h2>
                </div>
                <div className={styles.items}>
                  {cat.items.map((item, i) => (
                    <div key={i} className={styles.item}>
                      <h3>{item.name}</h3>
                      <p>{item.specs}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section 
        className={styles.pcSection}
        data-sanity={workstationDoc?._id ? `${workstationDoc._id}` : undefined}
      >
        <div className="container">
          <div className={styles.pcHeader}>
            <Monitor size={40} color="var(--accent-teal)" />
            <h2>WORKSTATION & POSTPRODUCCIÓN</h2>
          </div>
          <div className={styles.pcGrid}>
            {pcSpecs.map((spec, idx) => (
              <div key={idx} className={styles.spec}>
                <strong>{spec.name}</strong>
                <span>{spec.specs}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
