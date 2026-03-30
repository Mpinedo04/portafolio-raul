'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Aperture, Play, Mail } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          RAÚL<span>GARCÍA</span>
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
          <a href="https://www.youtube.com/@Raaulinhoo" target="_blank" rel="noopener noreferrer">
            <Play size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Aperture size={20} />
          </a>
          <a href="mailto:social@raulgarcia.com">
            <Mail size={20} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
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
