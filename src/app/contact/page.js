"use client";

import { useRef, useState } from "react";
import { FadeIn, RevealText, Magnetic } from "@/components/common/Motion";
import CustomCursor from "@/components/common/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import "@/app/contact/contact.css";

const PHONE_DISPLAY = "+91 74991 23353";
const PHONE_TEL = "+917499123353";
const WHATSAPP_NUMBER = "917499123353"; // country code + number, no "+"
const EMAIL = "info@crespon.com";

const SERVICES = [
  "Web Development",
  "E-Commerce Website",
  "Custom Software & Apps",
  "Product Development / MVP",
  "SEO & Digital Presence",
  "Digital Marketing",
  "Branding & UI/UX Design",
  "AI Solutions & Automation",
  "College / Final-Year Project",
  "Something else",
];

const INITIAL = { name: "", phone: "", email: "", service: SERVICES[0], message: "" };

const PATHS = {
  call: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  whatsapp: "M3 21l1.7-5A9 9 0 1 1 8 19.3L3 21zM9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.2-2-1-.8.7a4 4 0 0 1-2-2l.7-.8-1-2L9 9.5z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm18 2-10 7L2 6",
  pin: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 5v5l3 2",
  arrow: "M7 17 17 7M8 7h9v9",
};

const Icon = ({ name, size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={PATHS[name]} />
  </svg>
);

const ACTIONS = [
  {
    key: "call",
    icon: "call",
    label: "Call us",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_TEL}`,
  },
  {
    key: "wa",
    icon: "whatsapp",
    label: "WhatsApp",
    value: "Chat with us instantly",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Crespon, I'd like to discuss a project.")}`,
    external: true,
  },
  {
    key: "mail",
    icon: "mail",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
];

export default function ContactPage() {
  const formRef = useRef(null);
  const [form, setForm] = useState(INITIAL);
  const [note, setNote] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const buildText = () =>
    [
      "Hello Crespon, I'd like to discuss a project.",
      "",
      `Name: ${form.name.trim()}`,
      form.phone.trim() && `Phone: ${form.phone.trim()}`,
      form.email.trim() && `Email: ${form.email.trim()}`,
      `Service: ${form.service}`,
      "",
      `Details: ${form.message.trim()}`,
    ]
      .filter((line) => line !== false)
      .join("\n");

  const finish = (msg) => {
    setNote(msg);
    setForm(INITIAL);
  };

  // Primary action: open WhatsApp with the form details pre-filled
  const sendWhatsApp = (e) => {
    e.preventDefault();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildText())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    finish("WhatsApp is open with your details. Press Send there to confirm.");
  };

  // Secondary action: open the email app with the same details
  const sendEmail = () => {
    if (!formRef.current.reportValidity()) return;
    const subject = `New enquiry: ${form.service} (${form.name.trim()})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildText())}`;
    finish("Your email app is open with your details. Press Send there to confirm.");
  };

  return (
    <div className="contact-wrapper">
      <CustomCursor />
      <Navbar />

      <main className="contact-page">
        <div className="contact-container contact-grid">
          {/* LEFT: intro + quick contact */}
          <section className="contact-intro">
            <span className="contact-tag">// Get in touch</span>
            <RevealText text="Let’s build something great together." className="contact-title" />
            <FadeIn delay={0.25}>
              <p className="contact-lead">
                Tell us about your website, software, SEO, AI or college project. We’ll
                understand your goal first and then suggest the right solution.
              </p>

              <ul className="contact-actions">
                {ACTIONS.map((a) => (
                  <li key={a.key}>
                    <a
                      href={a.href}
                      className={`contact-action contact-action--${a.key}`}
                      {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span className="contact-action-icon"><Icon name={a.icon} /></span>
                      <span className="contact-action-text">
                        <strong>{a.label}</strong>
                        <small>{a.value}</small>
                      </span>
                      <span className="contact-action-go"><Icon name="arrow" size={16} /></span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="contact-meta">
                <div className="contact-meta-item">
                  <Icon name="pin" size={16} />
                  <span>Pune, Maharashtra, India</span>
                </div>
                <div className="contact-meta-item">
                  <Icon name="clock" size={16} />
                  <span>Reply within 24 business hours</span>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* RIGHT: form */}
          <FadeIn delay={0.15}>
            <section className="contact-form-card" aria-labelledby="contact-form-title">
              <header className="contact-form-head">
                <div>
                  <h2 id="contact-form-title">Send us a message</h2>
                  <p>Share a few details and we’ll get back to you.</p>
                </div>
                <span className="contact-live"><i aria-hidden="true" />Available</span>
              </header>

              <form ref={formRef} onSubmit={sendWhatsApp} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name <b>*</b></label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required autoComplete="name" placeholder="Your full name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" inputMode="tel" value={form.phone} onChange={handleChange} autoComplete="tel" placeholder="+91 00000 00000" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" placeholder="you@company.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">Service</label>
                    <select id="service" name="service" value={form.service} onChange={handleChange}>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project details <b>*</b></label>
                  <textarea id="message" name="message" rows={3} value={form.message} onChange={handleChange} required placeholder="Tell us your goal, requirements or idea..." />
                </div>

                {note && <p className="form-success-msg" role="status">{note}</p>}

                <div className="form-actions">
                  <Magnetic>
                    <button type="submit" className="btn btn--gold">Send on WhatsApp</button>
                  </Magnetic>
                  <button type="button" className="form-alt-btn" onClick={sendEmail}>Send via Email</button>
                </div>
                <p className="form-hint">Your details open pre-filled in WhatsApp or your email app. Nothing is stored on our website.</p>
              </form>
            </section>
          </FadeIn>
        </div>
      </main>

      <div className="contact-footer-slot">
        <Footer />
      </div>
    </div>
  );
}