'use client';
import { useState } from 'react';
import { Send } from 'lucide-react';
import styles from './Contact.module.css';

export default function ContactForm({ initialStatus = '', formId: propFormId }) {
  const [status, setStatus] = useState(initialStatus);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('ENVIANDO...');

    const formId = propFormId || process.env.NEXT_PUBLIC_FORMSPREE_ID;
    
    if (!formId || formId === 'tu_id_aquí' || formId.includes('tu_id')) {
      setStatus('FORMULARIO NO CONFIGURADO. ESCRÍBEME POR EMAIL.');
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contacto-nombre">NOMBRE COMPLETO *</label>
          <input id="contacto-nombre" type="text" name="nombre" placeholder="Escribe tu nombre" autoComplete="name" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="contacto-email">CORREO ELECTRÓNICO *</label>
          <input id="contacto-email" type="email" name="email" placeholder="tu@email.com" autoComplete="email" required />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="contacto-telefono">NÚMERO DE TELÉFONO *</label>
        <input id="contacto-telefono" type="tel" name="telefono" placeholder="Tu número de contacto" autoComplete="tel" required />
      </div>
      <div className={styles.field}>
        <label htmlFor="contacto-mensaje">MENSAJE / DETALLES DEL PROYECTO *</label>
        <textarea id="contacto-mensaje" name="mensaje" rows="6" placeholder="Cuéntame sobre tu idea..." required></textarea>
      </div>
      <button type="submit" className={styles.submitBtn}>
        {status || 'ENVIAR MENSAJE'} <Send size={18} />
      </button>
      <p role="status" aria-live="polite" className={styles.srOnly}>{status}</p>
    </form>
  );
}
