'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './HeroMarketingSpotlight.css';

/* Element viewport mein aate hi true (sirf ek baar) */
function useInView({ threshold = 0.2, rootMargin = '0px 0px -8% 0px' } = {}) {
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

/* Emoji ki jagah clean SVG icons */
const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    width="15"
    height="15"
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

const SERVICES = [
  {
    label: 'Advanced SEO',
    icon: (
      <Icon>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </Icon>
    ),
  },
  {
    label: 'Google Ads (PPC)',
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </Icon>
    ),
  },
  {
    label: 'Social Media Growth',
    icon: (
      <Icon>
        <path d="M4 5h16v11H9l-5 4z" />
      </Icon>
    ),
  },
  {
    label: 'Conversion Analytics',
    icon: (
      <Icon>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </Icon>
    ),
  },
];

export default function HeroMarketingSpotlight({ onOpenModal }) {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`ms-section ${inView ? 'is-visible' : ''}`}
      aria-labelledby="ms-heading"
    >
      <div className="ms-card">
        <div className="ms-grid">
          {/* ---------- Content ---------- */}
          <div className="ms-content">
            <span className="ms-tag ms-reveal" style={{ '--i': 0 }}>
              Digital Marketing &amp; Growth
            </span>

            <h2 id="ms-heading" className="ms-title ms-reveal" style={{ '--i': 1 }}>
              More Visibility. More Engagement. <span>More Business.</span>
            </h2>

            <p className="ms-text ms-reveal" style={{ '--i': 2 }}>
              Results-driven digital marketing that improves your search
              rankings, runs high-converting Google and social ad campaigns, and
              builds brand engagement that turns clicks into loyal customers.
            </p>

            <ul className="ms-chips">
              {SERVICES.map((s, i) => (
                <li
                  key={s.label}
                  className="ms-chip ms-reveal"
                  style={{ '--i': 3 + i * 0.6 }}
                >
                  {s.icon}
                  {s.label}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={onOpenModal}
              className="ms-cta ms-reveal"
              style={{ '--i': 6 }}
            >
              Scale Your Brand Today <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          {/* ---------- Image ---------- */}
          <div className="ms-media">
            <Image
              src="/hero10.png"
              alt="Crespon digital marketing services"
              fill
              sizes="(max-width: 860px) 100vw, 40vw"
              className="ms-img"
            />
            <span className="ms-media-shade" aria-hidden="true" />
            <div className="ms-badge">
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m3 17 6-6 4 4 8-8" />
                <path d="M15 7h6v6" />
              </svg>
              Proven ROI &amp; High-Growth Strategy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}