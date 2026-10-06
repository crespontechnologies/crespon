'use client';

import { useEffect, useRef, useState } from 'react';
import './ContactSection.css';

const PHONE_DISPLAY = '+91 74991 23353';
const PHONE_TEL = '+917499123353';
const WA_NUMBER = '917499123353';
const EMAIL = 'info@crespon.com';

/* Element viewport mein aate hi true (sirf ek baar) */
function useInView({ threshold = 0.12, rootMargin = '0px 0px -8% 0px' } = {}) {
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

const CONTACTS = [
  {
    label: 'Call us',
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_TEL}`,
    color: '56, 189, 248',
    icon: (
      <Icon>
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
      </Icon>
    ),
  },
  {
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    color: '129, 140, 248',
    icon: (
      <Icon>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </Icon>
    ),
  },
  {
    label: 'WhatsApp',
    value: 'Chat with us',
    href: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      'Hi Crespon Technologies, I want to discuss a project.'
    )}`,
    external: true,
    color: '52, 211, 153',
    icon: (
      <Icon>
        <path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z" />
        <path d="M9 9.5c.4 2 2.5 4.1 4.5 4.5l1.2-1.3-1.8-1-.8.6c-.7-.3-1.5-1.1-1.8-1.8l.6-.8-1-1.8z" />
      </Icon>
    ),
  },
  {
    label: 'Location',
    value: 'Pune, Maharashtra, India',
    color: '212, 175, 55',
    icon: (
      <Icon>
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </Icon>
    ),
  },
];

const SERVICES = [
  'Website',
  'Software / App',
  'SEO',
  'Digital Marketing',
  'Product / MVP',
  'Other',
];

const EMPTY = { name: '', phone: '', email: '', message: '' };

export default function ContactSection() {
  const [ref, inView] = useInView();
  const formRef = useRef(null);
  const [data, setData] = useState(EMPTY);
  const [picked, setPicked] = useState([]);
  const [status, setStatus] = useState('');

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }));

  const toggleService = (s) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const buildMessage = () =>
    [
      'Hello Crespon Technologies,',
      `Name: ${data.name.trim()}`,
      `Phone: ${data.phone.trim()}`,
      `Email: ${data.email.trim()}`,
      picked.length ? `Interested in: ${picked.join(', ')}` : null,
      `Message: ${data.message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');

  const finish = (text) => {
    setStatus(text);
    setData(EMPTY);
    setPicked([]);
    setTimeout(() => setStatus(''), 6000);
  };

  /* Primary: WhatsApp par message bhejo */
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    finish('WhatsApp opened. Please press send there to deliver your message.');
  };

  /* Secondary: email app mein draft kholo */
  const handleEmail = () => {
    if (!formRef.current?.reportValidity()) return;
    const subject = encodeURIComponent(`Project enquiry from ${data.name.trim()}`);
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    finish('Your email app should open with the message ready to send.');
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`ct-section ${inView ? 'is-visible' : ''}`}
      aria-labelledby="ct-heading"
    >
      <header className="ct-header">
        <span className="ct-tag ct-reveal" style={{ '--i': 0 }}>
          Get in Touch
        </span>
        <h2 id="ct-heading" className="ct-title ct-reveal" style={{ '--i': 1 }}>
          Let&apos;s talk about your <span>next project</span>
        </h2>
        <p className="ct-lead ct-reveal" style={{ '--i': 2 }}>
          Tell us what you are building. We will understand your goals and get
          back to you with the right plan.
        </p>
      </header>

      <div className="ct-card">
        <div className="ct-grid">
          {/* ---------- Contact info ---------- */}
          <ul className="ct-info">
            {CONTACTS.map((c, i) => {
              const inner = (
                <>
                  <span className="ct-icon">{c.icon}</span>
                  <span className="ct-info-text">
                    <small>{c.label}</small>
                    <strong>{c.value}</strong>
                  </span>
                </>
              );
              return (
                <li
                  key={c.label}
                  className="ct-info-item"
                  style={{ '--c': c.color, '--i': i }}
                >
                  {c.href ? (
                    <a
                      href={c.href}
                      className="ct-info-link"
                      {...(c.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="ct-info-link is-static">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* ---------- Form ---------- */}
          <form ref={formRef} className="ct-form" onSubmit={handleSubmit}>
            <div className="ct-row">
              <div className="ct-field">
                <label htmlFor="ct-name">Your name</label>
                <input
                  id="ct-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Full name"
                  value={data.name}
                  onChange={set('name')}
                  required
                />
              </div>
              <div className="ct-field">
                <label htmlFor="ct-phone">Phone number</label>
                <input
                  id="ct-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  value={data.phone}
                  onChange={set('phone')}
                  required
                />
              </div>
            </div>

            <div className="ct-field">
              <label htmlFor="ct-email">Email address</label>
              <input
                id="ct-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={data.email}
                onChange={set('email')}
                required
              />
            </div>

            <fieldset className="ct-field ct-services">
              <legend>What do you need?</legend>
              <div className="ct-chips">
                {SERVICES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`ct-chip ${picked.includes(s) ? 'is-on' : ''}`}
                    aria-pressed={picked.includes(s)}
                    onClick={() => toggleService(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="ct-field">
              <label htmlFor="ct-message">Project details</label>
              <textarea
                id="ct-message"
                rows={4}
                placeholder="Briefly describe what you want to build or improve..."
                value={data.message}
                onChange={set('message')}
                required
              />
            </div>

            <div className="ct-actions">
              <button type="submit" className="ct-btn ct-btn--wa">
                <Icon>
                  <path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z" />
                </Icon>
                Send on WhatsApp
              </button>
              <button type="button" className="ct-btn ct-btn--mail" onClick={handleEmail}>
                <Icon>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </Icon>
                Send by Email
              </button>
            </div>

            <p className="ct-status" role="status" aria-live="polite">
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}