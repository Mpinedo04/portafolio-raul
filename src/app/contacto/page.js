import { Mail, Phone, MapPin } from 'lucide-react';
import styles from './Contact.module.css';
import { client } from '../../../sanity/lib/client';
import ContactForm from './ContactForm';

export const revalidate = 10;

export default async function ContactPage() {
  const settings = await client.fetch(`*[_type == "settings"][0]`) || {
    contactEmail: "contacto@raulgarcia.com",
    contactPhone: "+34 600 000 000",
    contactLocation: "Proyectos nacionales e internacionales."
  };

  return (
    <div className={styles.contact}>
      <header className={styles.header}>
        <div className="container">
          <h1>TRABAJEMOS JUNTOS</h1>
          <p>¿Tienes un proyecto en mente? Cuéntame los detalles y hagámoslo realidad.</p>
        </div>
      </header>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.infoCol}>
              <div className={styles.infoBlock}>
                <Mail size={24} color="var(--accent-teal)" />
                <div className={styles.infoText}>
                  <h3>EMAIL</h3>
                  <p data-sanity="settings.contactEmail">{settings.contactEmail}</p>
                </div>
              </div>
              <div className={styles.infoBlock}>
                <Phone size={24} color="var(--accent-teal)" />
                <div className={styles.infoText}>
                  <h3>TELÉFONO</h3>
                  <p data-sanity="settings.contactPhone">{settings.contactPhone}</p>
                </div>
              </div>
              <div className={styles.infoBlock}>
                <MapPin size={24} color="var(--accent-teal)" />
                <div className={styles.infoText}>
                  <h3>DISPONIBILIDAD</h3>
                  <p data-sanity="settings.contactLocation">{settings.contactLocation}</p>
                </div>
              </div>
            </div>

            <div className={styles.formCol}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
