'use client';

import { useEffect, useRef, useState } from 'react';
import './HeroCyberCommand.css';

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

/* 0 se target tak count-up, jab active true ho */
function useCountUp(target, active, { duration = 1200, delay = 0 } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    let raf;
    let start;
    const tick = (now) => {
      if (start === undefined) start = now;
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [active, target, duration, delay]);

  return value;
}

const Icon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
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

const ACTIONS = [
  {
    code: '01 // Code',
    title: 'Full Stack MVP',
    sub: 'Next.js & Spring Boot',
    href: '#contact',
    color: '56, 189, 248',
    icon: (
      <Icon>
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
      </Icon>
    ),
  },
  {
    code: '02 // Speed',
    title: 'Rapid Delivery',
    sub: 'Milestone-based execution',
    href: '#contact',
    color: '129, 140, 248',
    icon: (
      <Icon>
        <path d="M13 3 5 13h6l-1 8 8-10h-6z" />
      </Icon>
    ),
  },
  {
    code: '03 // Scale',
    title: 'Growth & SEO',
    sub: 'Rank & convert leads',
    href: '#contact',
    color: '212, 175, 55',
    icon: (
      <Icon>
        <path d="m3 17 6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </Icon>
    ),
  },
  {
    code: '04 // Connect',
    title: 'WhatsApp Chat',
    sub: 'Instant consultation',
    href: 'https://wa.me/917499123353?text=Hi%20Crespon,%20let%27s%20discuss%20my%20project.',
    external: true,
    color: '52, 211, 153',
    icon: (
      <Icon>
        <path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z" />
        <path d="M9 9.5c.4 2 2.5 4.1 4.5 4.5l1.2-1.3-1.8-1-.8.6c-.7-.3-1.5-1.1-1.8-1.8l.6-.8-1-1.8z" />
      </Icon>
    ),
  },
];

const METRICS = [
  { label: 'experience', target: 3, suffix: '+ Years' },
  { label: 'clients_delivered', target: 13, suffix: '+ Clients' },
  { label: 'core_services', target: 6, suffix: ' Services' },
];

function Metric({ label, target, suffix, index, active }) {
  const count = useCountUp(target, active, { delay: 900 + index * 150 });
  return (
    <div className="cc-metric" style={{ '--i': index }}>
      <span className="cc-metric-label">&gt; {label}</span>
      <span className="cc-metric-value">
        {count}
        {suffix}
      </span>
    </div>
  );
}

const STATUS_TEXT = 'Accepting new projects';

export default function HeroCyberCommand() {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`cc-section ${inView ? 'is-visible' : ''}`}
      aria-label="Start your project with Crespon"
    >
      <div className="cc-card">
        {/* ---------- Top bar ---------- */}
        <div className="cc-top">
          <div className="cc-status">
            <span className="cc-dot" aria-hidden="true" />
            <span className="cc-status-text" style={{ '--ch': STATUS_TEXT.length }}>
              {STATUS_TEXT}
            </span>
            <span className="cc-caret" aria-hidden="true" />
          </div>
          <div className="cc-brand">
            Engineered by <span>Crespon Technologies</span>
          </div>
        </div>

        {/* ---------- Actions ---------- */}
        <ul className="cc-grid">
          {ACTIONS.map((a, i) => (
            <li key={a.title} className="cc-cell" style={{ '--i': i }}>
              <a
                href={a.href}
                className="cc-action"
                style={{ '--c': a.color }}
                {...(a.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <span className="cc-action-head">
                  <span className="cc-icon">{a.icon}</span>
                  <span className="cc-code">{a.code}</span>
                </span>
                <span className="cc-action-body">
                  <span className="cc-action-title">{a.title}</span>
                  <span className="cc-action-sub">{a.sub}</span>
                </span>
                <span className="cc-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* ---------- Metrics ---------- */}
        <div className="cc-metrics">
          {METRICS.map((m, i) => (
            <Metric key={m.label} {...m} index={i} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}