'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './SEOWorkCase.css';

/* Element viewport mein aate hi true (sirf ek baar) */
function useInView({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
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

/* 0 se target tak count-up (decimals support ke saath) */
function useCountUp(target, active, { duration = 1400, delay = 0, decimals = 0 } = {}) {
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
      setValue(target * (1 - Math.pow(1 - t, 3)));
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

  return value.toFixed(decimals);
}

const STATS = [
  { target: 185, decimals: 0, suffix: 'K+', label: 'Impressions' },
  { target: 2.6, decimals: 1, suffix: 'K+', label: 'Clicks' },
];

const STRATEGIES = [
  {
    label: 'Research',
    title: 'Intent-Based Keyword Clustering',
    text: 'We find high-intent search queries that competitors overlook and map them to the right pages, so the traffic that arrives is ready to convert.',
  },
  {
    label: 'Performance',
    title: 'Core Web Vitals Optimization',
    text: 'Faster loading, stable layouts and clean rendering, so pages meet the performance standards Google uses as a ranking signal.',
  },
  {
    label: 'Authority',
    title: 'Technical Metadata & Structure',
    text: 'Structured data, clean metadata and a solid site architecture that support steady, long-term organic growth.',
  },
];

function Stat({ target, decimals, suffix, label, index, active }) {
  const value = useCountUp(target, active, { delay: 700 + index * 150, decimals });
  return (
    <div className="sw-stat">
      <span className="sw-stat-num">
        {value}
        {suffix}
      </span>
      <span className="sw-stat-label">{label}</span>
    </div>
  );
}

export default function SEOWorkCase() {
  const [ref, inView] = useInView();

  return (
    <section
      id="work"
      ref={ref}
      className={`sw-section ${inView ? 'is-visible' : ''}`}
      aria-labelledby="sw-heading"
    >
      {/* ---------- Header ---------- */}
      <header className="sw-header">
        <span className="sw-tag sw-reveal" style={{ '--i': 0 }}>
          SEO Case Study
        </span>
        <h2 id="sw-heading" className="sw-title sw-reveal" style={{ '--i': 1 }}>
          Ranking Higher Through <span>Technical SEO</span>
        </h2>
        <p className="sw-lead sw-reveal" style={{ '--i': 2 }}>
          Deep intent-based keyword mapping and technical optimization that turn
          search visibility into steady organic traffic.
        </p>
      </header>

      {/* ---------- Card ---------- */}
      <div className="sw-card">
        <div className="sw-grid">
          {/* Left: Search Console proof */}
          <figure className="sw-figure">
            <div className="sw-media">
              <Image
                src="/cresponseo.png"
                alt="Google Search Console performance report for Pawna Lake Camping"
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                className="sw-img"
              />
              <div className="sw-stats">
                {STATS.map((s, i) => (
                  <Stat key={s.label} {...s} index={i} active={inView} />
                ))}
              </div>
            </div>
            <figcaption className="sw-caption">
              Google Search Console, Pawna Lake Camping
            </figcaption>
          </figure>

          {/* Right: Strategy rows */}
          <ol className="sw-list">
            {STRATEGIES.map((s, i) => (
              <li key={s.title} className="sw-row" style={{ '--i': i }}>
                <span className="sw-row-label">
                  0{i + 1} / {s.label}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}