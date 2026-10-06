'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import './HeroSlider.css';

const AUTOPLAY_MS = 5000;

const slides = [
  {
    tag: 'Web Development',
    title: 'Modern & Responsive Web Solutions',
    desc: 'High-performance websites, corporate portals and custom web applications, optimized for speed and conversion.',
    features: ['Business Websites', 'E-commerce Platforms', 'Web Apps'],
    image: '/hero2.png',
  },
  {
    tag: 'Software & Applications',
    title: 'Custom Software & Mobile Apps',
    desc: 'Robust software systems, admin dashboards and cross-platform mobile apps built for seamless user experiences.',
    features: ['Enterprise Systems', 'iOS & Android Apps', 'CRM / ERP Tools'],
    image: '/hero6.png',
  },
  {
    tag: 'SEO & Ranking',
    title: 'Get Found, Rank Higher & Grow',
    desc: 'Technical SEO, keyword strategy and organic search growth designed to put your brand at the top.',
    features: ['Keyword Research', 'Technical SEO', 'Organic Growth'],
    image: '/hero3.png',
  },
  {
    tag: 'Product Management',
    title: 'Build Better Products & Strategy',
    desc: 'Take your idea from vision to launch with product roadmaps, user research and agile delivery.',
    features: ['Product Strategy', 'User Insights', 'Agile Delivery'],
    image: '/hero5.png',
  },
  {
    tag: 'Digital Marketing',
    title: 'Drive Traffic, Leads & Sales',
    desc: 'Reach the right audience, run high-converting campaigns and scale your visibility across digital channels.',
    features: ['Social Media Ads', 'Google Ads', 'Content Marketing'],
    image: '/hero4.png',
  },
];

const pad = (n) => String(n).padStart(2, '0');

export default function HeroSlider({ onOpenModal }) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [hoverPause, setHoverPause] = useState(false);
  const [focusPause, setFocusPause] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const rootRef = useRef(null);
  const touchRef = useRef(null);
  const total = slides.length;

  const goTo = useCallback((i) => setIndex((i + total) % total), [total]);
  const next = useCallback(() => setIndex((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setIndex((p) => (p - 1 + total) % total), [total]);

  /* Reduced motion + tab visibility */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onMq = (e) => setReduceMotion(e.matches);
    const onVis = () => setTabHidden(document.hidden);
    mq.addEventListener('change', onMq);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      mq.removeEventListener('change', onMq);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  /* Scroll par reveal (sirf ek baar) */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
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
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Touch swipe */
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!touchRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : prev();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  const paused = hoverPause || focusPause || tabHidden;
  const autoplay = inView && !reduceMotion;
  const active = slides[index];

  return (
    <section
      ref={rootRef}
      className={`hs-wrap ${inView ? 'is-visible' : ''}`}
      aria-roledescription="carousel"
      aria-label="Our services"
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHoverPause(true)}
      onPointerLeave={() => setHoverPause(false)}
      onFocus={() => setFocusPause(true)}
      onBlur={() => setFocusPause(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="hs-grid">
        {/* ---------- Content ---------- */}
        <div
          className="hs-content"
          key={index}
          aria-live={autoplay && !paused ? 'off' : 'polite'}
        >
          <span className="hs-tag hs-in" style={{ '--i': 0 }}>
            {active.tag}
          </span>
          <h3 className="hs-title hs-in" style={{ '--i': 1 }}>
            {active.title}
          </h3>
          <p className="hs-desc hs-in" style={{ '--i': 2 }}>
            {active.desc}
          </p>

          <ul className="hs-features hs-in" style={{ '--i': 3 }}>
            {active.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onOpenModal}
            className="hs-cta hs-in"
            style={{ '--i': 4 }}
          >
            Inquire Service <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        {/* ---------- Image (sab slides stacked, crossfade) ---------- */}
        <div className="hs-media">
          {slides.map((s, i) => (
            <Image
              key={s.image}
              src={s.image}
              alt={i === index ? s.title : ''}
              aria-hidden={i !== index}
              fill
              sizes="(max-width: 860px) 100vw, 40vw"
              priority={i === 0}
              className={`hs-img ${i === index ? 'is-active' : ''}`}
            />
          ))}
          <span className="hs-media-shade" aria-hidden="true" />
          <span className="hs-counter" aria-hidden="true">
            {pad(index + 1)} <i>/ {pad(total)}</i>
          </span>
        </div>
      </div>

      {/* ---------- Controls ---------- */}
      <div className="hs-controls">
        <div className="hs-dots" role="group" aria-label="Choose slide">
          {slides.map((s, i) => {
            const isActive = i === index;
            return (
              <button
                key={s.tag}
                type="button"
                className={`hs-dot ${isActive ? 'is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}: ${s.tag}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="hs-dot-bar">
                  {isActive && (
                    <span
                      key={index}
                      className={`hs-dot-fill ${autoplay ? 'is-running' : ''} ${
                        paused ? 'is-paused' : ''
                      }`}
                      style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                      onAnimationEnd={autoplay ? next : undefined}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hs-arrows">
          <button type="button" className="hs-arrow" onClick={prev} aria-label="Previous slide">
            &larr;
          </button>
          <button type="button" className="hs-arrow" onClick={next} aria-label="Next slide">
            &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}