'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Footer.css';

const WA_URL = `https://wa.me/917499123353?text=${encodeURIComponent(
  'Hi Crespon Technologies, I want to discuss a project.'
)}`;

/* Element viewport mein aate hi true (sirf ek baar) */
function useInView({ threshold = 0.1, rootMargin = '0px 0px -5% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

const SERVICES = [
  'Web Development',
  'Software & Apps',
  'Product & MVP',
  'SEO & Visibility',
  'Digital Marketing',
];

const COMPANY = [
  { label: 'Home', href: '/' },
  { label: 'Our Work', href: '/#work' },
  { label: 'Contact', href: '/#contact' },
];

const STEPS = ['Understand', 'Build', 'Connect', 'Grow'];

/* Social links yahan add karo, jaise { label: 'LinkedIn', href: '...' } */
const SOCIALS = [];

const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export default function Footer({ onOpenModal }) {
  const [ref, inView] = useInView();

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer ref={ref} className={`ft-footer ${inView ? 'is-visible' : ''}`}>
      {/* ---------- CTA strip ---------- */}
      <div className="ft-cta ft-reveal" style={{ '--i': 0 }}>
        <div className="ft-cta-text">
          <h2>Have a project in mind?</h2>
          <p>Let&apos;s understand your goals and build the right plan.</p>
        </div>
        <div className="ft-cta-actions">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="ft-btn ft-btn--wa">
            WhatsApp Us
          </a>
          <button type="button" onClick={onOpenModal} className="ft-btn ft-btn--ghost">
            Get in Touch <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>

      {/* ---------- Main columns ---------- */}
      <div className="ft-main">
        <div className="ft-col ft-brand ft-reveal" style={{ '--i': 1 }}>
          <Link href="/" className="ft-logo" aria-label="Crespon Technologies home">
            <Image src="/cresponBG.png" alt="" width={36} height={36} />
            <span>Crespon</span>
          </Link>
          <p>
            A business technology and growth partner. We build websites,
            software and products, and help businesses get found and grow.
          </p>
          <ol className="ft-steps" aria-label="Our approach">
            {STEPS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          {SOCIALS.length > 0 && (
            <ul className="ft-socials">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav className="ft-col ft-reveal" style={{ '--i': 2 }} aria-label="Services">
          <h3>Services</h3>
          <ul>
            {SERVICES.map((s) => (
              <li key={s}>
                <Link href="/contact">{s}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="ft-col ft-reveal" style={{ '--i': 3 }} aria-label="Company">
          <h3>Company</h3>
          <ul>
            {COMPANY.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ft-col ft-reveal" style={{ '--i': 4 }}>
          <h3>Contact</h3>
          <ul className="ft-contact">
            <li>
              <Icon>
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
              </Icon>
              <a href="tel:+917499123353">+91 74991 23353</a>
            </li>
            <li>
              <Icon>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </Icon>
              <a href="mailto:info@crespon.com">info@crespon.com</a>
            </li>
            <li>
              <Icon>
                <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </Icon>
              <span>Pune, Maharashtra, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="ft-bottom ft-reveal" style={{ '--i': 5 }}>
        <p>&copy; {new Date().getFullYear()} Crespon Technologies. All rights reserved.</p>
        <div className="ft-legal">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
        <button type="button" className="ft-top" onClick={toTop} aria-label="Back to top">
          <Icon>
            <path d="M12 19V5M5 12l7-7 7 7" />
          </Icon>
        </button>
      </div>
    </footer>
  );
}