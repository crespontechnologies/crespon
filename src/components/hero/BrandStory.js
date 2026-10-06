'use client';

import { useEffect, useRef, useState } from 'react';
import './BrandStory.css';

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

const STATS = [
  { id: 'one', target: 3, suffix: '+', label: 'Years of Experience' },
  { id: 'two', target: 13, suffix: '+', label: 'Clients Served' },
  { id: 'three', target: 6, suffix: '', label: 'Core Services' },
];

const STEPS = [
  { title: 'Understand', text: 'Business, customers & goals' },
  { title: 'Build', text: 'Web, software & products' },
  { title: 'Connect', text: 'SEO, marketing & automation' },
  { title: 'Grow', text: 'Measurable, long-term growth' },
];

function Stat({ id, target, suffix, label, index, active }) {
  const count = useCountUp(target, active, { delay: 300 + index * 120 });
  return (
    <div className={`bs-stat bs-stat--${id}`} style={{ '--i': index }}>
      <span className="bs-stat-num">
        {count}
        {suffix}
      </span>
      <span className="bs-stat-label">{label}</span>
    </div>
  );
}

export default function BrandStory() {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`bs-section ${inView ? 'is-visible' : ''}`}
      aria-labelledby="bs-heading"
    >
      <div className="bs-card">
        <div className="bs-top">
          <span className="bs-tag bs-reveal" style={{ '--i': 0 }}>
            Our Story
          </span>

          <h2 id="bs-heading" className="bs-title bs-reveal" style={{ '--i': 1 }}>
            From freelance roots to <span>Crespon Technologies</span>
          </h2>

          <p className="bs-text bs-reveal" style={{ '--i': 2 }}>
            What started 3 years ago as an independent freelance venture has grown
            into a full technology partner. We have worked with{' '}
            <strong>13+ clients</strong> on custom web apps, software systems and
            end-to-end growth solutions, and today we scale forward as an
            official tech company.
          </p>
        </div>

        <div className="bs-stats">
          {STATS.map((s, i) => (
            <Stat key={s.id} {...s} index={i} active={inView} />
          ))}
        </div>

        <ol className="bs-steps" aria-label="Our process">
          {STEPS.map((s, i) => (
            <li key={s.title} className="bs-step" style={{ '--i': i }}>
              <span className="bs-step-num">0{i + 1}</span>
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}