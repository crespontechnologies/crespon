'use client';

import { useEffect, useRef, useState } from 'react';
import './TrustBadges.css';

/* Element viewport mein aate hi true (sirf ek baar) */
function useInView({ threshold = 0.25, rootMargin = '0px 0px -8% 0px' } = {}) {
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
    width="20"
    height="20"
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

const BADGES = [
  {
    title: 'Milestone-Based Delivery',
    text: 'Clear agile milestones and rapid execution',
    color: '56, 189, 248',
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </Icon>
    ),
  },
  {
    title: 'Scalable Architecture',
    text: 'Built with robust full-stack frameworks',
    color: '129, 140, 248',
    icon: (
      <Icon>
        <path d="M12 3 4 6v6c0 4.5 3.2 7.7 8 9 4.8-1.3 8-4.5 8-9V6z" />
        <path d="m9 12 2 2 4-4" />
      </Icon>
    ),
  },
  {
    title: 'Dedicated Support',
    text: 'End-to-end guidance and maintenance',
    color: '212, 175, 55',
    icon: (
      <Icon>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <rect x="3" y="14" width="4" height="6" rx="1.5" />
        <rect x="17" y="14" width="4" height="6" rx="1.5" />
        <path d="M19 20c0 1.2-1.5 2-4 2h-2" />
      </Icon>
    ),
  },
];

export default function TrustBadges() {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`tb-section ${inView ? 'is-visible' : ''}`}
      aria-label="Why clients trust us"
    >
      <ul className="tb-grid">
        {BADGES.map((b, i) => (
          <li
            key={b.title}
            className="tb-card"
            style={{ '--c': b.color, '--i': i }}
          >
            <span className="tb-icon">{b.icon}</span>
            <div className="tb-body">
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}