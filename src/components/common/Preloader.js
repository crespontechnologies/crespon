'use client';
import { useEffect, useRef, useState } from 'react';
import './Preloader.css';

const MIN_DURATION = 2200; // minimum time the loader stays on screen (ms)
const MAX_WAIT = 8000;     // safety: never block the site longer than this (ms)
const HOLD_AT_100 = 350;   // short beat at 100% before the exit starts (ms)
const EXIT_DURATION = 1300; // must match the curtain timing in Preloader.css (ms)

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getStatus(p) {
  if (p < 40) return 'Getting things ready';
  if (p < 85) return 'Loading content';
  return 'Almost there';
}

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  // loading -> complete (100%) -> exiting (curtain opens) -> done (unmounted)
  const [phase, setPhase] = useState('loading');

  // Keep the latest callback without restarting the animation if the parent re-renders
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Progress: eased over a minimum duration, but held at 92% until the page has really loaded
  useEffect(() => {
    let raf;
    let loaded = document.readyState === 'complete';
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener('load', onLoad);

    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const raw = Math.min(elapsed / MIN_DURATION, 1);
      const eased = 1 - Math.pow(1 - raw, 2.2);
      const cap = loaded || elapsed > MAX_WAIT ? 100 : 92;
      const value = Math.min(Math.round(eased * 100), cap);

      setProgress((prev) => (prev === value ? prev : value));

      if (value >= 100) {
        setPhase('complete');
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  // Phase transitions
  useEffect(() => {
    if (phase === 'complete') {
      const t = setTimeout(() => setPhase('exiting'), HOLD_AT_100);
      return () => clearTimeout(t);
    }
    if (phase === 'exiting') {
      const t = setTimeout(() => {
        setPhase('done');
        if (onCompleteRef.current) onCompleteRef.current();
      }, EXIT_DURATION);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Lock page scroll while the loader covers the screen
  useEffect(() => {
    if (phase === 'done') return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  if (phase === 'done') return null;

  const status = getStatus(progress);

  return (
    <div
      className={`preloader ${phase === 'complete' ? 'is-complete' : ''} ${phase === 'exiting' ? 'is-exiting' : ''}`}
    >
      {/* Two panels that open like a curtain when loading finishes */}
      <div className="preloader-panel preloader-panel-top" />
      <div className="preloader-panel preloader-panel-bottom" />

      <div className="preloader-content">
        <div className="preloader-glow" />

        <div
          className="preloader-ring"
          role="progressbar"
          aria-label="Loading Crespon Technologies"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <svg viewBox="0 0 200 200" className="preloader-svg" aria-hidden="true">
            <defs>
              <linearGradient id="preloader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#7dd3fc" />
              </linearGradient>
            </defs>

            {/* Slowly rotating dashed outer ring */}
            <circle className="preloader-orbit" cx="100" cy="100" r="97" />

            {/* Track + progress */}
            <circle className="preloader-track" cx="100" cy="100" r={RADIUS} />
            <circle
              className="preloader-progress"
              cx="100"
              cy="100"
              r={RADIUS}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
            />
          </svg>

          <img
            src="/cresponBG.png"
            alt="Crespon Technologies"
            className="preloader-logo"
          />
        </div>

        <h2 className="preloader-title">Crespon Technologies</h2>
        <p className="preloader-subtitle">Bridging Businesses to Growth</p>

        <div className="preloader-meta">
          <span key={status} className="preloader-status">
            {status}
          </span>
          <span className="preloader-count">{progress}%</span>
        </div>
      </div>
    </div>
  );
}