'use client';

import { useEffect, useRef, useState } from 'react';
import './HeroShowcase.css';

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

const TRACKS = [
  {
    id: 'product',
    title: 'Product & MVP Development',
    badge: 'Strategy',
    steps: [
      {
        title: 'Idea & Roadmap Planning',
        text: 'Defining core features, user personas and precise product milestones.',
      },
      {
        title: 'UI/UX Wireframing',
        text: 'Intuitive interfaces focused on seamless experience and quick conversion.',
      },
      {
        title: 'Rapid MVP Build & Launch',
        text: 'Scalable MVPs built with modern full-stack tech and fast deployment.',
      },
    ],
  },
  {
    id: 'academic',
    title: 'Academic & College Projects',
    badge: 'Engineering',
    steps: [
      {
        title: 'Topic Selection & Synopsis',
        text: 'Project ideas, technical scope definition and official synopsis layout.',
      },
      {
        title: 'Architecture & Coding',
        text: 'Solid database models, clean backend APIs and responsive frontend modules.',
      },
      {
        title: 'Testing & Documentation',
        text: 'Code execution, bug fixes, PPT preparation and complete project report.',
      },
    ],
  },
];

export default function HeroShowcase() {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className={`hw-section ${inView ? 'is-visible' : ''}`}
      aria-labelledby="hw-heading"
    >
      <header className="hw-header">
        <span className="hw-tag hw-reveal" style={{ '--i': 0 }}>
          Execution Pipeline
        </span>
        <h2 id="hw-heading" className="hw-title hw-reveal" style={{ '--i': 1 }}>
          Product Management &amp; <span>Academic Workflows</span>
        </h2>
      </header>

      <div className="hw-grid">
        {TRACKS.map((track, t) => (
          <article
            key={track.id}
            className={`hw-card hw-card--${track.id}`}
            style={{ '--t': t }}
          >
            <div className="hw-card-head">
              <h3>{track.title}</h3>
              <span className="hw-badge">{track.badge}</span>
            </div>

            <ol className="hw-steps">
              {track.steps.map((s, i) => (
                <li key={s.title} className="hw-step" style={{ '--i': i }}>
                  <span className="hw-step-num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div className="hw-step-body">
                    <h4>{s.title}</h4>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </section>
  );
}