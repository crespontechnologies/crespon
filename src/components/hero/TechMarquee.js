'use client';

import { useEffect, useRef, useState } from 'react';
import './TechMarquee.css';

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

/* rgb values: CSS mein --c ke through use hote hain */
const CATEGORIES = {
  frontend: { label: 'Frontend', color: '56, 189, 248' },
  backend: { label: 'Backend', color: '129, 140, 248' },
  database: { label: 'Database', color: '52, 211, 153' },
  cloud: { label: 'Cloud & DevOps', color: '251, 191, 36' },
  mobile: { label: 'Mobile', color: '244, 114, 182' },
  marketing: { label: 'SEO & Marketing', color: '212, 175, 55' },
};

/* Jo tech aap use nahi karte, wo line hata dena */
const ROW_ONE = [
  { name: 'React.js', cat: 'frontend' },
  { name: 'Next.js', cat: 'frontend' },
  { name: 'TypeScript', cat: 'frontend' },
  { name: 'JavaScript', cat: 'frontend' },
  { name: 'Tailwind CSS', cat: 'frontend' },
  { name: 'HTML5 & CSS3', cat: 'frontend' },
  { name: 'Redux', cat: 'frontend' },
  { name: 'Framer Motion', cat: 'frontend' },
  { name: 'React Native', cat: 'mobile' },
  { name: 'Flutter', cat: 'mobile' },
  { name: 'Figma', cat: 'frontend' },
  { name: 'Technical SEO', cat: 'marketing' },
];

const ROW_TWO = [
  { name: 'Node.js', cat: 'backend' },
  { name: 'Express.js', cat: 'backend' },
  { name: 'Spring Boot', cat: 'backend' },
  { name: 'Java', cat: 'backend' },
  { name: 'Python', cat: 'backend' },
  { name: 'REST APIs', cat: 'backend' },
  { name: 'PostgreSQL', cat: 'database' },
  { name: 'MongoDB', cat: 'database' },
  { name: 'MySQL', cat: 'database' },
  { name: 'Firebase', cat: 'database' },
  { name: 'AWS', cat: 'cloud' },
  { name: 'Vercel', cat: 'cloud' },
  { name: 'Docker', cat: 'cloud' },
  { name: 'Git & GitHub', cat: 'cloud' },
  { name: 'Google Analytics', cat: 'marketing' },
  { name: 'Google Ads', cat: 'marketing' },
];

function Group({ items, hidden }) {
  return (
    <ul className="tm-group" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li
          key={t.name}
          className="tm-item"
          style={{ '--c': CATEGORIES[t.cat].color }}
        >
          <span className="tm-dot" aria-hidden="true" />
          {t.name}
        </li>
      ))}
    </ul>
  );
}

function Row({ items, reverse, duration, index }) {
  return (
    <div
      className={`tm-marquee ${reverse ? 'is-reverse' : ''}`}
      style={{ '--dur': `${duration}s`, '--r': index }}
    >
      <div className="tm-track">
        <Group items={items} />
        {/* Seamless loop ke liye duplicate (screen readers ke liye hidden) */}
        <Group items={items} hidden />
      </div>
    </div>
  );
}

export default function TechMarquee() {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`tm-section ${inView ? 'is-visible' : ''}`}
      aria-labelledby="tm-heading"
    >
      <header className="tm-header">
        <span className="tm-tag tm-reveal" style={{ '--i': 0 }}>
          Tech Stack
        </span>
        <h2 id="tm-heading" className="tm-title tm-reveal" style={{ '--i': 1 }}>
          Technologies we <span>build with</span>
        </h2>

        <ul className="tm-legend tm-reveal" style={{ '--i': 2 }}>
          {Object.values(CATEGORIES).map((c) => (
            <li key={c.label} style={{ '--c': c.color }}>
              <span className="tm-dot" aria-hidden="true" />
              {c.label}
            </li>
          ))}
        </ul>
      </header>

      <Row items={ROW_ONE} duration={45} index={0} />
      <Row items={ROW_TWO} duration={55} index={1} reverse />
    </section>
  );
}