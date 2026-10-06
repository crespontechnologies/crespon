'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';

const LINKS = [
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/services', label: 'Services' },
  { href: '/past-works', label: 'Past Works' },
  { href: '/brand-story', label: 'Brand Story' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  // Scroll: shrink bar, hide on scroll down / show on scroll up, progress line
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
      if (y > 200 && y > lastY + 4) setHidden(true);
      else if (y < lastY - 4 || y <= 200) setHidden(false);
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock page scroll while the mobile menu is open + close on Escape
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const isActive = (href) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <nav
      className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden && !isOpen ? 'hidden' : ''} ${isOpen ? 'menu-open' : ''}`}
    >
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />

      <div className="nav-container">
        {/* Brand Logo */}
        <Link href="/" className="logo-box" onClick={() => setIsOpen(false)}>
          <img src="/cresponBG.png" alt="Crespon Logo" className="logo-img" />
          <span className="logo-text">CRESPON</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="menu-toggle"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
        >
          <span className={`hamburger-icon ${isOpen ? 'open' : ''}`}></span>
        </button>

        {/* Navigation Links */}
        <div id="primary-navigation" className={`nav-links ${isOpen ? 'active' : ''}`}>
          {LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? 'current' : ''}`}
              aria-current={isActive(link.href) ? 'page' : undefined}
              style={{ '--i': i }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="nav-btn"
            style={{ '--i': LINKS.length }}
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </nav>
  );
}