'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getIcon, IconMap } from '@/lib/icons';
import styles from './Header.module.css';

export default function Header({ brandName = "RAÚL GARCÍA", socialLinks = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderIcon = (name) => {
    const IconComponent = getIcon(name);
    return <IconComponent size={20} />;
  };

  const iconsToRender = (socialLinks && socialLinks.length > 0) ? socialLinks : [
    { platform: 'Youtube', url: 'https://www.youtube.com/@Raaulinhoo' },
    { platform: 'Instagram', url: 'https://www.instagram.com/raaulinhoo_2004/' },
    { platform: 'Mail', url: 'https://mail.google.com/mail/?view=cm&fs=1&to=FCraulinho2004@gmail.com' }
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        <Link 
          href="/" 
          className={`${styles.logo} uppercase`}
          data-sanity="settings.brandName"
        >
          {(brandName || "RAÚL GARCÍA").replace(/[\u200B-\u200D\uFEFF]/g, '').trim().toUpperCase()}
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          <div 
            className={styles.dropdown}
            onMouseEnter={() => !isOpen && setIsOpenDropdown(true)}
            onMouseLeave={() => setIsOpenDropdown(false)}
          >
            <Link href="/portfolio" className={styles.navLink}>
              PORTFOLIO
            </Link>
            <div className={`${styles.dropdownMenu} ${isOpenDropdown ? styles.show : ''}`}>
              <Link href="/portfolio/propios" onClick={() => setIsOpenDropdown(false)}>Proyectos Propios</Link>
              <hr />
              <Link href="/portfolio/externos" onClick={() => setIsOpenDropdown(false)}>Trabajos Externos</Link>
            </div>
          </div>
          <Link href="/sobre-mi">SOBRE MÍ</Link>
          <Link href="/equipo">EQUIPO</Link>
          <Link href="/contacto">CONTACTO</Link>
        </nav>

        {/* Social Icons */}
        <div className={styles.socials} data-sanity="settings.socialLinks">
          {iconsToRender.map((item, i) => (
            <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              {renderIcon(item.platform)}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {(() => {
            const Icon = getIcon(isOpen ? 'X' : 'Menu');
            return <Icon size={24} />;
          })()}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileSection}>
              <span>Portfolio</span>
              <Link href="/portfolio/propios" onClick={() => setIsOpen(false)}>Proyectos Propios</Link>
              <Link href="/portfolio/externos" onClick={() => setIsOpen(false)}>Trabajos Externos</Link>
            </div>
            <Link href="/sobre-mi" onClick={() => setIsOpen(false)}>Sobre Mí</Link>
            <Link href="/equipo" onClick={() => setIsOpen(false)}>Equipo</Link>
            <Link href="/contacto" onClick={() => setIsOpen(false)}>Contacto</Link>
          </div>
        )}
      </div>
    </header>
  );
}
