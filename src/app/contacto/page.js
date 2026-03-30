'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import styles from './Contact.module.css';

export default function ContactPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('ENVIANDO...');

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    
    if (!formId || formId === 'tu_id_aquí' || formId.includes('tu_id')) {
      // Si no hay ID de Formspree, simulamos el envío para probar la UI
      setTimeout(() => {
        setStatus('MENSAJE ENVIADO (Modo Prueba)');
        e.target.reset();
        setTimeout(() => setStatus(''), 3000);
      }, 1500);
      return;
    }

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('MENSAJE ENVIADO CON ÉXITO');
        e.target.reset();
      } else {
        setStatus('ERROR AL ENVIAR. INTENTA DE NUEVO.');
      }
    } catch (error) {
      console.error(error);
      setStatus('ERROR DE CONEXIÓN.');
    }
    
    setTimeout(() => {
      setStatus('');
    }, 4000);
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
                  <p>contacto@raulgarcia.com</p>
                </div>
              </div>
              <div className={styles.infoBlock}>
                <Phone size={24} color="var(--accent-teal)" />
                <div className={styles.infoText}>
                  <h3>TELÉFONO</h3>
                  <p>+34 600 000 000</p>
                </div>
              </div>
              <div className={styles.infoBlock}>
                <MapPin size={24} color="var(--accent-teal)" />
                <div className={styles.infoText}>
                  <h3>DISPONIBILIDAD</h3>
                  <p>Proyectos nacionales e internacionales.</p>
                </div>
              </div>
            </div>

            <div className={styles.formCol}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label>NOMBRE COMPLETO *</label>
                    <input type="text" name="nombre" placeholder="Escribe tu nombre" required />
                  </div>
                  <div className={styles.field}>
                    <label>CORREO ELECTRÓNICO *</label>
                    <input type="email" name="email" placeholder="tu@email.com" required />
                  </div>
                </div>
                <div className={styles.field}>
                  <label>NÚMERO DE TELÉFONO *</label>
                  <input type="tel" name="telefono" placeholder="Tu número de contacto" required />
                </div>
                <div className={styles.field}>
                  <label>MENSAJE / DETALLES DEL PROYECTO *</label>
                  <textarea name="mensaje" rows="6" placeholder="Cuéntame sobre tu idea..." required></textarea>
                </div>
                <button type="submit" className={styles.submitBtn}>
                  {status || 'ENVIAR MENSAJE'} <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
