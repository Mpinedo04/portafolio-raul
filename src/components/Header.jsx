'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ brandName = "RAÚL GARCÍA", headerIcons = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Procesa los iconos predeterminados si no hay en Sanity
  const defaultIcons = [
    { icon: 'Play', url: 'https://www.youtube.com/@Raaulinhoo' },
    { icon: 'Aperture', url: 'https://instagram.com' },
    { icon: 'Mail', url: 'mailto:social@raulgarcia.com' }
  ];

  const iconsToRender = headerIcons.length > 0 ? headerIcons : defaultIcons;

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        <Link 
          href="/" 
          className={`${styles.logo} uppercase`}
          data-sanity="settings.brandName"
        >
          {brandName}
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/sobre-mi">Sobre Mí</Link>
          <Link href="/equipo">Equipo</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>

        {/* Social Icons Desktop */}
        <div className={styles.socials}>
          {iconsToRender.map((item, index) => {
            const IconComponent = Icons[item.icon] || Icons.Link;
            return (
              <a key={index} href={item.url} target="_blank" rel="noopener noreferrer">
                <IconComponent size={20} />
              </a>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className={styles.mobileMenu}>
            <Link href="/portfolio" onClick={() => setIsOpen(false)}>Portfolio</Link>
            <Link href="/sobre-mi" onClick={() => setIsOpen(false)}>Sobre Mí</Link>
            <Link href="/equipo" onClick={() => setIsOpen(false)}>Equipo</Link>
            <Link href="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link>
          </div>
        )}
      </div>
    </header>
  );
}
