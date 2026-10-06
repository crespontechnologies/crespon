'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './HeroModal.css';

const PHONE_DISPLAY = '+91 74991 23353';
const PHONE_TEL = '+917499123353';
const WA_NUMBER = '917499123353';
const EMAIL = 'info@crespon.com';
const LOCATION = 'Pune, Maharashtra, India';

const SERVICES = [
  'Website Development',
  'Software / Mobile App',
  'Product / MVP',
  'SEO',
  'Digital Marketing',
  'AI & Automation',
  'College / Academic Project',
  'Other',
];

const STEPS = [
  'Share your requirement',
  'We understand your goals and suggest a plan',
  'We build, launch and help you grow',
];

const EMPTY = { name: '', phone: '', email: '', service: '', message: '' };

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Icon = ({ children, size = 16 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
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

const WA_PATH = (
  <>
    <path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z" />
    <path d="M9 9.5c.4 2 2.5 4.1 4.5 4.5l1.2-1.3-1.8-1-.8.6c-.7-.3-1.5-1.1-1.8-1.8l.6-.8-1-1.8z" />
  </>
);
const MAIL_PATH = (
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </>
);

export default function HeroModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false); // DOM mein hai
  const [show, setShow] = useState(false); // animation state
  const [data, setData] = useState(EMPTY);
  const [sent, setSent] = useState(null); // null | 'whatsapp' | 'email'

  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const lastFocus = useRef(null);

  /* Open / close with enter-exit animation */
  useEffect(() => {
    if (isOpen) {
      lastFocus.current = document.activeElement;
      setSent(null);
      setMounted(true);
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setShow(true))
      );
      return () => cancelAnimationFrame(raf);
    }
    setShow(false);
    const t = setTimeout(() => {
      setMounted(false);
      lastFocus.current?.focus?.();
    }, 260);
    return () => clearTimeout(t);
  }, [isOpen]);

  /* Background scroll lock */
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  /* Focus first field once visible */
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => nameRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [show]);

  /* Esc to close + Tab focus trap */
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const nodes = dialogRef.current.querySelectorAll(FOCUSABLE);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mounted, onClose]);

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }));

  const buildMessage = () =>
    [
      'Hello Crespon Technologies,',
      `Name: ${data.name.trim()}`,
      `Phone: ${data.phone.trim()}`,
      `Email: ${data.email.trim()}`,
      data.service ? `Interested in: ${data.service}` : null,
      `Project details: ${data.message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');

  /* Primary: WhatsApp par message ready khulta hai */
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent('whatsapp');
    setData(EMPTY);
  };

  /* Secondary: email app mein draft */
  const handleEmail = () => {
    if (!formRef.current?.reportValidity()) return;
    const subject = encodeURIComponent(`Project enquiry from ${data.name.trim()}`);
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent('email');
    setData(EMPTY);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`hm-overlay ${show ? 'is-open' : ''}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={dialogRef}
        className="hm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hm-title"
        aria-describedby="hm-desc"
      >
        <button type="button" className="hm-close" onClick={onClose} aria-label="Close">
          <Icon size={18}>
            <path d="M6 6l12 12M18 6 6 18" />
          </Icon>
        </button>

        <div className="hm-scroll">
          {/* ---------- Left / top panel ---------- */}
          <div className="hm-top">
            <span className="hm-badge">
              <i aria-hidden="true" />
              Accepting new projects
            </span>
            <h2 id="hm-title">Start your project</h2>
            <p id="hm-desc">
              Share your requirement and we will get back to you with the right
              plan. No obligation.
            </p>
            <ol className="hm-steps">
              {STEPS.map((s, i) => (
                <li key={s}>
                  <span aria-hidden="true">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          {/* ---------- Form / success ---------- */}
          <div className="hm-body">
            {sent ? (
              <div className="hm-done" role="status" aria-live="polite">
                <span className="hm-done-icon">
                  <Icon size={26}>
                    <path d="m5 12 4 4 10-10" />
                  </Icon>
                </span>
                <h3>{sent === 'whatsapp' ? 'WhatsApp opened' : 'Email draft opened'}</h3>
                <p>
                  {sent === 'whatsapp'
                    ? 'Your message is ready in WhatsApp. Please press send there so it reaches us.'
                    : 'Your email app should open with the message ready. Please press send to deliver it.'}
                </p>
                <div className="hm-done-actions">
                  <button type="button" className="hm-btn hm-btn--mail" onClick={() => setSent(null)}>
                    Send another
                  </button>
                  <button type="button" className="hm-btn hm-btn--ghost" onClick={onClose}>
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} className="hm-form" onSubmit={handleSubmit}>
                <div className="hm-row">
                  <div className="hm-field">
                    <label htmlFor="hm-name">Your name</label>
                    <input
                      ref={nameRef}
                      id="hm-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Full name"
                      value={data.name}
                      onChange={set('name')}
                      required
                    />
                  </div>
                  <div className="hm-field">
                    <label htmlFor="hm-phone">Phone number</label>
                    <input
                      id="hm-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                      pattern="[+0-9 ()\-]{10,16}"
                      title="Enter a valid phone number (10 to 16 digits)"
                      value={data.phone}
                      onChange={set('phone')}
                      required
                    />
                  </div>
                </div>

                <div className="hm-field">
                  <label htmlFor="hm-email">Email address</label>
                  <input
                    id="hm-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={data.email}
                    onChange={set('email')}
                    required
                  />
                </div>

                <div className="hm-field">
                  <label htmlFor="hm-service">What do you need?</label>
                  <select id="hm-service" value={data.service} onChange={set('service')}>
                    <option value="">Select a service (optional)</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="hm-field">
                  <label htmlFor="hm-message">Project details</label>
                  <textarea
                    id="hm-message"
                    rows={4}
                    placeholder="Briefly describe what you want to build or improve..."
                    value={data.message}
                    onChange={set('message')}
                    required
                  />
                </div>

                <div className="hm-actions">
                  <button type="submit" className="hm-btn hm-btn--wa">
                    <Icon>{WA_PATH}</Icon>
                    Send on WhatsApp
                  </button>
                  <button type="button" className="hm-btn hm-btn--mail" onClick={handleEmail}>
                    <Icon>{MAIL_PATH}</Icon>
                    Send by Email
                  </button>
                </div>
                <p className="hm-hint">
                  WhatsApp opens with your message ready. Press send there to
                  deliver it.
                </p>
              </form>
            )}
          </div>

          {/* ---------- Direct contact ---------- */}
          <ul className="hm-contact" aria-label="Contact details">
            <li style={{ '--c': '56, 189, 248' }}>
              <a href={`tel:${PHONE_TEL}`}>
                <span className="hm-ci">
                  <Icon>
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                  </Icon>
                </span>
                <span>
                  <small>Call</small>
                  {PHONE_DISPLAY}
                </span>
              </a>
            </li>
            <li style={{ '--c': '129, 140, 248' }}>
              <a href={`mailto:${EMAIL}`}>
                <span className="hm-ci">
                  <Icon>{MAIL_PATH}</Icon>
                </span>
                <span>
                  <small>Email</small>
                  {EMAIL}
                </span>
              </a>
            </li>
            <li style={{ '--c': '52, 211, 153' }}>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                  'Hi Crespon Technologies, I want to discuss a project.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hm-ci">
                  <Icon>{WA_PATH}</Icon>
                </span>
                <span>
                  <small>WhatsApp</small>
                  Chat with us
                </span>
              </a>
            </li>
            <li style={{ '--c': '212, 175, 55' }}>
              <div>
                <span className="hm-ci">
                  <Icon>
                    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </Icon>
                </span>
                <span>
                  <small>Location</small>
                  {LOCATION}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
}