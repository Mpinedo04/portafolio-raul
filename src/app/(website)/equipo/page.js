import { Camera, Layers, Lightbulb, Mic, Monitor, Wrench, Box } from 'lucide-react';
import styles from './Equipment.module.css';
import { client } from '@/sanity/lib/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const revalidate = 10;

export default async function EquipmentPage() {
  const settings = await client.fetch(`*[_type == "settings" && _id == "settings"][0]{ brandName, socialLinks, contactEmail, footerDescription }`) || {};
  const workstationDoc = await client.fetch(`*[_id == "workstation-specs"][0]`);
  const allEquipment = await client.fetch(`*[_type == "equipment" && _id != "workstation-specs"]`) || [];

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
    <>
      <Header brandName={settings?.brandName} socialLinks={settings?.socialLinks} />
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
                <div key={idx} className={styles.card}>
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

        <section className={styles.pcSection}>
          <div className="container">
            <div className={styles.pcHeader}>
              <Monitor size={40} color="var(--color-accent)" />
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
      <Footer 
        brandName={settings?.brandName} 
        contactEmail={settings?.contactEmail} 
        footerDescription={settings?.footerDescription}
        socialLinks={settings?.socialLinks} 
      />
    </>
  );
}
