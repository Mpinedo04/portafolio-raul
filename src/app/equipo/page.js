import { Camera, Cpu, Layers, Lightbulb, Mic, Monitor } from 'lucide-react';
import styles from './Equipment.module.css';

export default function EquipmentPage() {
  const categories = [
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

  const pcSpecs = [
    { label: 'PROCESADOR', value: 'AMD Ryzen 9 5950X (16 Núcleos)' },
    { label: 'GRÁFICA', value: 'NVIDIA RTX 3080 10GB VRAM' },
    { label: 'RAM', value: '64GB DDR4 3600MHz' },
    { label: 'ALMACENAMIENTO', value: '4TB NVMe Gen4 SSD + 12TB HDD RAID' },
    { label: 'MONITOR', value: '2x ASUS ProArt 27" 4K (Calibración Rec.709)' }
  ];

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
            {categories.map((cat, idx) => (
              <div key={idx} className={styles.card}>
                <div className={styles.cardHeader}>
                  {cat.icon}
                  <h2>{cat.title}</h2>
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
