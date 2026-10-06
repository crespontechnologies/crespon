'use client';
import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

// Anything matching this gets the "target lock" treatment
const INTERACTIVE =
  'a[href], button, [role="button"], [role="tab"], summary, select, label[for], ' +
  'input[type="submit"], input[type="button"], input[type="checkbox"], input[type="radio"], ' +
  '.interactive, [data-cursor]';

// Text fields keep the native I-beam cursor (custom cursor hides itself there)
const TEXT_FIELD =
  'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]), ' +
  'textarea, [contenteditable=""], [contenteditable="true"]';

const BASE_SIZE = 40;      // idle reticle size (px)
const LOCK_PADDING = 8;    // gap between element edge and brackets (px)
const MAX_LOCK_W = 420;    // elements bigger than this get a soft ring instead of brackets
const MAX_LOCK_H = 160;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  const layerRef = useRef(null);
  const dotRef = useRef(null);
  const reticleRef = useRef(null);
  const labelRef = useRef(null);
  const rippleRef = useRef(null);

  const startPos = useRef({ x: -100, y: -100 });
  const enabledRef = useRef(false);

  // Turn on only after a real mouse moves (touch never enables it).
  // This works on touch-screen laptops too, where CSS media queries can misreport.
  useEffect(() => {
    const onPointer = (e) => {
      startPos.current = { x: e.clientX, y: e.clientY };
      const isMouse = e.pointerType === 'mouse';
      if (isMouse !== enabledRef.current) {
        enabledRef.current = isMouse;
        setEnabled(isMouse);
      }
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => window.removeEventListener('pointermove', onPointer);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    const layer = layerRef.current;
    const dot = dotRef.current;
    const reticle = reticleRef.current;
    const label = labelRef.current;
    const ripple = rippleRef.current;
    if (!layer || !dot || !reticle || !label || !ripple) return;

    root.classList.add('has-custom-cursor');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mouse = { x: -100, y: -100 };
    const ret = { x: -100, y: -100, w: BASE_SIZE, h: BASE_SIZE };
    let shown = false;
    let down = false;
    let lockEl = null;
    let mode = 'idle'; // idle | lock | hover | text
    let labelOn = false;
    let raf;

    const setMode = (next) => {
      if (next === mode) return;
      layer.classList.remove('is-lock', 'is-hover', 'is-text');
      if (next !== 'idle') layer.classList.add(`is-${next}`);
      mode = next;
    };

    const setLabel = (text) => {
      if (text) {
        label.textContent = text;
        labelOn = true;
        layer.classList.add('has-label');
      } else if (labelOn) {
        labelOn = false;
        layer.classList.remove('has-label');
      }
    };

    const releaseTarget = () => {
      lockEl = null;
      setLabel('');
      setMode('idle');
    };

    const placeLabel = () => {
      if (!labelOn) return;
      const w = label.offsetWidth;
      const x = mouse.x + 24 + w > window.innerWidth ? mouse.x - 24 - w : mouse.x + 24;
      const y = mouse.y + 28 > window.innerHeight - 40 ? mouse.y - 40 : mouse.y + 28;
      label.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      placeLabel();
      if (!shown) {
        shown = true;
        ret.x = mouse.x; // snap on first appearance so it never flies in from the corner
        ret.y = mouse.y;
        layer.classList.add('is-visible');
      }
    };

    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;

      if (t.closest(TEXT_FIELD)) {
        lockEl = null;
        setLabel('');
        setMode('text');
        return;
      }

      const el = t.closest(INTERACTIVE);
      if (!el) {
        releaseTarget();
        return;
      }

      lockEl = el;
      const b = el.getBoundingClientRect();
      const big = b.width > MAX_LOCK_W || b.height > MAX_LOCK_H;
      setMode(big ? 'hover' : 'lock');

      const holder = t.closest('[data-cursor]');
      setLabel(holder ? holder.getAttribute('data-cursor') : '');
      placeLabel();
    };

    const onDown = () => {
      down = true;
      layer.classList.add('is-down');
      // Click pulse
      ripple.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      ripple.classList.remove('go');
      ripple.getBoundingClientRect(); // force reflow so the animation restarts
      ripple.classList.add('go');
    };

    const onUp = () => {
      down = false;
      layer.classList.remove('is-down');
    };

    const onLeave = () => {
      shown = false;
      layer.classList.remove('is-visible');
    };

    const loop = () => {
      let tx = mouse.x;
      let ty = mouse.y;
      let tw = down ? BASE_SIZE - 8 : BASE_SIZE;
      let th = tw;

      if (lockEl) {
        if (!lockEl.isConnected) {
          releaseTarget();
        } else {
          const b = lockEl.getBoundingClientRect();
          const near =
            mouse.x >= b.left - 12 && mouse.x <= b.right + 12 &&
            mouse.y >= b.top - 12 && mouse.y <= b.bottom + 12;

          if (!near) {
            releaseTarget(); // element scrolled/moved away from the pointer
          } else if (mode === 'lock') {
            const pad = down ? LOCK_PADDING - 4 : LOCK_PADDING;
            tx = b.left + b.width / 2;
            ty = b.top + b.height / 2;
            tw = Math.max(b.width + pad * 2, 32);
            th = Math.max(b.height + pad * 2, 32);
          } else if (mode === 'hover') {
            tw = th = down ? 52 : 64;
          }
        }
      }

      const kPos = reduceMotion ? 1 : mode === 'lock' ? 0.28 : 0.18;
      const kSize = reduceMotion ? 1 : 0.22;

      ret.x += (tx - ret.x) * kPos;
      ret.y += (ty - ret.y) * kPos;
      ret.w += (tw - ret.w) * kSize;
      ret.h += (th - ret.h) * kSize;

      reticle.style.width = `${ret.w}px`;
      reticle.style.height = `${ret.h}px`;
      reticle.style.transform = `translate3d(${ret.x - ret.w / 2}px, ${ret.y - ret.h / 2}px, 0)`;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);
    root.addEventListener('mouseleave', onLeave);

    // Appear right away at the current mouse position
    onMove({ clientX: startPos.current.x, clientY: startPos.current.y });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      root.removeEventListener('mouseleave', onLeave);
      root.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={layerRef} className="cursor-layer" aria-hidden="true">
      <div ref={rippleRef} className="cursor-ripple">
        <span className="cursor-ripple-ring" />
      </div>

      <div ref={reticleRef} className="cursor-reticle">
        <span className="reticle-fill" />
        <span className="reticle-ticks" />
        <span className="reticle-ring" />
        <span className="reticle-spin" />
        <i className="corner tl" />
        <i className="corner tr" />
        <i className="corner bl" />
        <i className="corner br" />
      </div>

      <div ref={dotRef} className="cursor-dot">
        <span className="cursor-dot-core" />
      </div>

      <div ref={labelRef} className="cursor-label" />
    </div>
  );
}