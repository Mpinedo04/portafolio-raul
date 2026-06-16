'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { getIcon } from '@/lib/icons';
import styles from './Header.module.css';

const SocialIcons = {
  Youtube: () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <circle className="icon-bg" cx="12" cy="12" r="11" fill="currentColor" opacity="0.12"/>
      <path className="icon-fill" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      <path className="icon-stroke" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon className="icon-stroke" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <circle className="icon-bg" cx="12" cy="12" r="11" fill="currentColor" opacity="0.12"/>
      <path className="icon-fill" fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      <rect className="icon-stroke" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle className="icon-stroke" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" cx="12" cy="12" r="4"/>
      <line className="icon-stroke" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <circle className="icon-bg" cx="12" cy="12" r="11" fill="currentColor" opacity="0.12"/>
      <path className="icon-fill" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      <path className="icon-stroke" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline className="icon-stroke" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="22,6 12,13 2,6"/>
    </svg>
  ),
};

export default function Header({ brandName = "RAÚL GARCÍA", socialLinks = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderIcon = (name) => {
    const Icon = SocialIcons[name];
    if (Icon) return <Icon />;
    const IconComponent = getIcon(name);
    return <IconComponent size={20} />;
  };

  const iconsToRender = (socialLinks && socialLinks.length > 0) ? socialLinks : [
    { platform: 'Youtube', url: 'https://www.youtube.com/@Raaulinhoo' },
    { platform: 'Instagram', url: 'https://www.instagram.com/raaulinhoo_2004/' },
    { platform: 'Mail', url: 'https://mail.google.com/mail/?view=cm&fs=1&to=raulgarciafernandez2004@gmail.com' }
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={`${styles.logo} uppercase`}>
          {(brandName || "RAÚL GARCÍA").replace(/[\u200B-\u200D\uFEFF]/g, '').trim().toUpperCase()}
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          <div 
            className={styles.dropdown}
            onMouseEnter={() => !isOpen && setIsOpenDropdown(true)}
            onMouseLeave={() => setIsOpenDropdown(false)}
          >
            <Link href="/portfolio" className={`${styles.navLink} ${pathname?.startsWith('/portfolio') ? styles.active : ''}`}>
              PROYECTOS
            </Link>
            <div className={`${styles.dropdownMenu} ${isOpenDropdown ? styles.show : ''}`}>
              <Link href="/portfolio/propios" className={pathname === '/portfolio/propios' ? styles.active : ''} onClick={() => setIsOpenDropdown(false)}>Proyectos Propios</Link>
              <hr />
              <Link href="/portfolio/externos" className={pathname === '/portfolio/externos' ? styles.active : ''} onClick={() => setIsOpenDropdown(false)}>Trabajos Externos</Link>
            </div>
          </div>
          <Link href="/sobre-mi" className={pathname === '/sobre-mi' ? styles.active : ''}>SOBRE MÍ</Link>
          <Link href="/equipo" className={pathname === '/equipo' ? styles.active : ''}>EQUIPO</Link>
          <Link href="/estudios" className={pathname === '/estudios' ? styles.active : ''}>ESTUDIOS</Link>
          <Link href="/contacto" className={pathname === '/contacto' ? styles.active : ''}>CONTACTO</Link>
        </nav>

        {/* Social Icons */}
        <div className={styles.socials}>
          {iconsToRender.map((item, i) => (
            <a 
              key={i} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.iconLink}
              data-platform={item.platform.toLowerCase()}
            >
              {renderIcon(item.platform)}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileSection}>
              <span>Proyectos</span>
              <Link href="/portfolio/propios" className={pathname === '/portfolio/propios' ? styles.active : ''} onClick={() => setIsOpen(false)}>Proyectos Propios</Link>
              <Link href="/portfolio/externos" className={pathname === '/portfolio/externos' ? styles.active : ''} onClick={() => setIsOpen(false)}>Trabajos Externos</Link>
            </div>
            <Link href="/sobre-mi" className={pathname === '/sobre-mi' ? styles.active : ''} onClick={() => setIsOpen(false)}>Sobre Mí</Link>
            <Link href="/equipo" className={pathname === '/equipo' ? styles.active : ''} onClick={() => setIsOpen(false)}>Equipo</Link>
            <Link href="/estudios" className={pathname === '/estudios' ? styles.active : ''} onClick={() => setIsOpen(false)}>Estudios</Link>
            <Link href="/contacto" className={pathname === '/contacto' ? styles.active : ''} onClick={() => setIsOpen(false)}>Contacto</Link>
          </div>
        )}
      </div>
    </header>
  );
}
