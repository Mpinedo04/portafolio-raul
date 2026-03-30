import { Camera, Layers, Lightbulb, Mic, Monitor, Wrench, Box } from 'lucide-react';
import styles from './Equipment.module.css';
import { client } from '../../../sanity/lib/client';

export const revalidate = 10;

export default async function EquipmentPage() {
  const allEquipment = await client.fetch(`*[_type == "equipment"]`) || [];

  // Helper to get category icon
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

  // Helper to get category title
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

  // Separate the PC Specs from the grid categories
  const pcSpecsDoc = allEquipment.find(doc => doc.category === 'hardware');
  const pcSpecs = pcSpecsDoc?.items?.length > 0 ? pcSpecsDoc.items.map(item => ({ label: item.name, value: item.specs })) : [
    { label: 'PROCESADOR', value: 'AMD Ryzen 9 5950X (16 Núcleos)' },
    { label: 'GRÁFICA', value: 'NVIDIA RTX 3080 10GB VRAM' },
    { label: 'RAM', value: '64GB DDR4 3600MHz' },
    { label: 'ALMACENAMIENTO', value: '4TB NVMe Gen4 SSD + 12TB HDD RAID' },
    { label: 'MONITOR', value: '2x ASUS ProArt 27" 4K (Calibración Rec.709)' }
  ];

  const gridCategoriesDocs = allEquipment.filter(doc => doc.category !== 'hardware');
  
  // Fallback for grid
  const initialCategories = [
    {
      title: 'CÁMARAS',
      icon: <Camera size={24} />,
      items: [
        { name: 'Sony Alpha 7 IV', specs: 'Grabación 4K 60fps, 10-bit 4:2:2' },
        { name: 'Blackmagic Pocket 6K Pro', specs: 'Raw recording, Filtros ND integrados' }
      ]
    },
    {
      title: 'OBJETIVOS',
      icon: <Layers size={24} />,
      items: [
        { name: 'Sigma 24-70mm f/2.8 Art', specs: 'Zoom versátil de alta calidad' },
        { name: 'Sony 50mm f/1.8 FE', specs: 'Óptica fija para retratos y bokeh' },
        { name: 'Viltrox 35mm f/1.8', specs: 'Gran angular luminoso' }
      ]
    },
    {
      title: 'AUDIO',
      icon: <Mic size={24} />,
      items: [
        { name: 'Rode NTG5', specs: 'Micrófono de cañón profesional' },
        { name: 'Zoom H6 Black Edition', specs: 'Grabadora de 6 pistas' },
        { name: 'Sennheiser G4 Lav', specs: 'Sistema inalámbrico de solapa' }
      ]
    },
    {
      title: 'ILUMINACIÓN',
      icon: <Lightbulb size={24} />,
      items: [
        { name: 'Aputure 120D II + Dome', specs: 'Luz principal de alta potencia' },
        { name: 'Godox SL60W', specs: 'Luz secundaria' },
        { name: 'Tubos LED RGB Nanlite Pavotube', specs: 'Efectos de color y ambiente' }
      ]
    }
  ];

  const gridCategories = gridCategoriesDocs.length > 0 
    ? gridCategoriesDocs.map(doc => ({
        title: getCategoryTitle(doc.category),
        icon: getCategoryIcon(doc.category),
        items: doc.items || []
      }))
    : initialCategories;

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
            <Monitor size={40} color="var(--accent-teal)" />
            <h2>WORKSTATION & POSTPRODUCCIÓN</h2>
          </div>
          <div className={styles.pcGrid}>
            {pcSpecs.map((spec, idx) => (
              <div key={idx} className={styles.spec}>
                <strong>{spec.label}</strong>
                <span>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
