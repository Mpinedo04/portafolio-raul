import { Mail, Phone, MapPin } from 'lucide-react';
import styles from './Contact.module.css';
import { client } from '@/sanity/lib/client';
import ContactForm from './ContactForm';

export const revalidate = 3600; // Un flujo más eficiente (1 hora)

export async function generateMetadata() {
  const contact = await client.fetch(`*[_type == "contact" && _id == "contact"][0]{ seo }`);
  const seo = contact?.seo || {};
  
  if (!seo.metaTitle) return {}; 

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
  };
}

export default async function ContactPage() {
  const contact = await client.fetch(`*[_type == "contact" && _id == "contact"][0]`) || {
    contactEmail: "FCraulinho2004@gmail.com",
    contactPhone: "+34 600 000 000",
    contactLocation: "Proyectos nacionales e internacionales.",
    formspreeId: ""
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
                  <p data-sanity="contact.contactEmail">{contact.contactEmail}</p>
                </div>
              </div>
              <div className={styles.infoBlock}>
                <Phone size={24} color="var(--accent-teal)" />
                <div className={styles.infoText}>
                   <h3>TELÉFONO</h3>
                  <p data-sanity="contact.contactPhone">{contact.contactPhone}</p>
                </div>
              </div>
              <div className={styles.infoBlock}>
                <MapPin size={24} color="var(--accent-teal)" />
                <div className={styles.infoText}>
                  <h3>DISPONIBILIDAD</h3>
                  <p data-sanity="contact.contactLocation">{contact.contactLocation}</p>
                </div>
              </div>
            </div>

            <div className={styles.formCol}>
              <ContactForm formId={contact.formspreeId} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
