import { Mail, MapPin } from 'lucide-react';
import styles from './Contact.module.css';
import { client } from '@/sanity/lib/client';
import { urlForOptimized } from '@/sanity/lib/image';
import ContactForm from './ContactForm';
import PageBanner from '@/components/PageBanner';
import { getSiteSettings } from '@/sanity/lib/settings';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return buildMetadata({
    title: 'Contacto | Raúl García',
    description:
      '¿Tienes un proyecto audiovisual en mente? Escríbeme y hablemos de tu cortometraje, documental o vídeo de marca.',
    path: '/contacto',
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const contact = await client.fetch(`*[_type == "contact" && _id == "contact"][0]`) || {
    title: "TRABAJEMOS JUNTOS",
    subtitle: "¿Tienes un proyecto en mente? Cuéntame los detalles y hagámoslo realidad.",
    contactLocation: "Proyectos nacionales e internacionales.",
    formspreeId: "",
  };

  const finalEmail = settings.contactEmail || "raulgarciafernandez2004@gmail.com";
  const bannerImg = contact.bannerImage?.asset ? urlForOptimized(contact.bannerImage, { width: 2400, quality: 90 }) : null;
  const bannerFocalPoint = contact.bannerImage?.hotspot || null;

  return (
    <>
      <PageBanner
        title={contact.title}
        subtitle={contact.subtitle}
        backgroundImage={bannerImg}
        focalPoint={bannerFocalPoint}
      />

      <div className={styles.page}>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.grid}>
              <div className={styles.infoCol}>
                <div className={styles.infoBlock}>
                  <Mail size={24} color="var(--color-accent)" />
                  <div className={styles.infoText}>
                    <h3>EMAIL</h3>
                    <p>{finalEmail}</p>
                  </div>
                </div>
                <div className={styles.infoBlock}>
                  <MapPin size={24} color="var(--color-accent)" />
                  <div className={styles.infoText}>
                    <h3>DISPONIBILIDAD</h3>
                    <p>{contact.contactLocation}</p>
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
    </>
  );
}
