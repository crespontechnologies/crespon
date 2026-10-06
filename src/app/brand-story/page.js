"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { FadeIn, RevealText, Magnetic } from "@/components/common/Motion";
import CustomCursor from "@/components/common/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import "@/app/brand-story/brand-story.css";

/* Heading font (body + code font already aapke project me hain) */
const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/* >>> Apne Crespon logo ka path yahan daalo (public folder me) <<< */
const LOGO = "/cresponBG.png";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const heroStats = [
  { b: "2022", s: "Freelance Start" },
  { b: "2026", s: "Crespon Registered" },
  { b: "360°", s: "Digital Solutions" },
];

const chapters = [
  {
    phase: "Chapter 01 // 2022",
    year: "2022",
    title: "The Solo Freelance Roots & Code Grinds",
    desc: "Every big enterprise starts with late-night coding sessions. Back in 2022, it started with individual freelance full-stack projects—building scalable React apps, writing custom Node.js APIs, and debugging SQL databases. It wasn't just about writing code; it was about understanding how local businesses struggled to get online visibility and how robust tech could solve real-world problems.",
    tags: ["React", "Node.js", "SQL"],
    image: "/cresponbrand (2).png",
  },
  {
    phase: "Chapter 02 // 2024 - 2025",
    year: "2024–25",
    title: "Scaling Ecosystems: Tourism, E-Commerce & Portals",
    desc: "As demand grew, the scope expanded from simple websites to complete digital ecosystems. We engineered advanced e-commerce platforms like Clikit24 with 3D customization, built dynamic camping booking portals for Rajmachi and Pawna Lake, and took charge of full web management, admin dashboards, databases, and killer SEO strategies for major tourism brands like The Roamers Cult.",
    tags: ["E-Commerce", "Portals", "SEO"],
    image: "/cresponbrand (1).png",
  },
  {
    phase: "Chapter 03 // 2026 & Beyond",
    year: "2026+",
    title: "The Birth of Crespon Technologies",
    desc: "To formalize the vision, transition out of solo freelancing, and deliver enterprise-grade digital powerhouses, Crespon Technologies was officially registered. Armed with the core tagline 'Bridging Businesses to Growth', we now deliver 360-degree solutions—combining Next.js frontends, Spring Boot/Node backends, aggressive blog SEO, cloud hosting (Hostinger/Vercel), and local business scaling.",
    tags: ["Next.js", "Spring Boot", "Cloud"],
    image: "/heroimg.png",
  },
];

const pillars = [
  {
    icon: "⚙️",
    title: "Full-Stack Technical Mastery",
    desc: "We don't rely on generic templates. From Next.js, React, and JavaScript to Java, Spring Boot, Python, SQL databases, and custom REST APIs, every system is engineered from scratch for ultimate performance.",
  },
  {
    icon: "🚀",
    title: "Aggressive SEO & Content Growth",
    desc: "A website is useless if no one sees it. Our advanced SEO execution, technical audits, and content blog strategies (such as our work on camping and tourism portals) drive organic traffic that converts into real revenue.",
  },
  {
    icon: "🤝",
    title: "Absolute Business Partnership",
    desc: "We handle the entire technical lifecycle—admin dashboards, database security, cloud deployments on Vercel/Hostinger, domain management, and Google Business Profile optimization—so founders can focus purely on scaling.",
  },
];

const ticker = [
  "Bridging Businesses to Growth",
  "Full-Stack Engineering",
  "Killer SEO",
  "Cloud Hosting",
  "Local Business Scaling",
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function StoryImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="bs-img-fallback">
        <Image src={LOGO} alt="Crespon" width={56} height={56} unoptimized />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 900px) 100vw, 480px"
      unoptimized
      className="bs-chapter-img"
      onError={() => setFailed(true)}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BrandStoryPage() {
  const [tlRef, tlIn] = useInView(0.1);

  return (
    <div className={`bs-wrapper ${display.className}`}>
      <CustomCursor />
      <Navbar />

      <main className="bs-page">
        {/* ============ HERO ============ */}
        <section className="bs-hero">
          <span className="bs-orb bs-orb--a" aria-hidden="true" />
          <span className="bs-orb bs-orb--b" aria-hidden="true" />

          <div className="bs-container bs-hero-grid">
            <div className="bs-hero-copy">
              <span className="bs-tag">
                <i className="bs-dot" /> // THE CRESPON NARRATIVE
              </span>
              <RevealText
                text="From Late-Night Code Grinds to Scaling Digital Empires."
                className="bs-title"
              />
              <FadeIn delay={0.3}>
                <p className="bs-lead">
                  This is the story of how a passion for full-stack engineering, relentless
                  problem-solving, and aggressive SEO turned into Crespon Technologies—bridging
                  businesses to unprecedented growth.
                </p>
                <div className="bs-hero-stats">
                  {heroStats.map((s) => (
                    <div key={s.s} className="bs-hero-stat">
                      <b>{s.b}</b>
                      <span>{s.s}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.4}>
              <div className="bs-logo-stage">
                <span className="bs-ring bs-ring--1" aria-hidden="true" />
                <span className="bs-ring bs-ring--2" aria-hidden="true" />
                <div className="bs-logo-card">
                  <Image
                    src={LOGO}
                    alt="Crespon Technologies logo"
                    width={96}
                    height={96}
                    priority
                    unoptimized
                    className="bs-logo-img"
                  />
                  <strong>Crespon Technologies</strong>
                  <span>Bridging Businesses to Growth</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="bs-marquee" aria-hidden="true">
            <div className="bs-marquee-track">
              {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
                <span key={`${t}-${i}`} className="bs-marquee-item">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TIMELINE ============ */}
        <section className="bs-section">
          <div className="bs-container">
            <FadeIn>
              <div className="bs-section-header">
                <span className="bs-eyebrow">Our journey</span>
                <h2>
                  Our Evolution <span>Through Chapters</span>
                </h2>
                <p>The milestones, challenges, and breakthroughs that shaped who we are today.</p>
              </div>
            </FadeIn>

            <div ref={tlRef} className={`bs-timeline ${tlIn ? "is-in" : ""}`}>
              <span className="bs-tl-line" aria-hidden="true" />

              {chapters.map((ch, index) => (
                <div key={ch.phase} className="bs-tl-item">
                  <span className="bs-tl-dot" aria-hidden="true">
                    <img src={LOGO} alt="" />
                  </span>
                  <span className="bs-tl-year">{ch.year}</span>

                  <FadeIn delay={0.1 * (index + 1)}>
                    <article className="bs-chapter-card">
                      <div className="bs-chapter-media">
                        <StoryImage src={ch.image} alt={ch.title} />
                        <span className="bs-phase-badge">{ch.phase}</span>
                      </div>
                      <div className="bs-chapter-content">
                        <h3>{ch.title}</h3>
                        <p>{ch.desc}</p>
                        <ul className="bs-chip-list">
                          {ch.tags.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </FadeIn>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PILLARS ============ */}
        <section className="bs-section">
          <div className="bs-container">
            <FadeIn>
              <div className="bs-section-header">
                <span className="bs-eyebrow">What drives us</span>
                <h2>
                  The Three Pillars of <span>Crespon Technologies</span>
                </h2>
                <p>What sets our execution apart in the competitive digital landscape.</p>
              </div>
            </FadeIn>

            <div className="bs-pillars-grid">
              {pillars.map((p, index) => (
                <FadeIn key={p.title} delay={0.1 * (index + 1)}>
                  <div className="bs-pillar-card">
                    <span className="bs-pillar-icon" aria-hidden="true">
                      {p.icon}
                    </span>
                    <span className="bs-pillar-num">0{index + 1}</span>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="bs-cta-section">
          <div className="bs-container">
            <FadeIn>
              <div className="bs-cta-box">
                <Image
                  src={LOGO}
                  alt="Crespon"
                  width={52}
                  height={52}
                  unoptimized
                  className="bs-cta-logo"
                />
                <h2>Let’s Write the Next Success Story Together.</h2>
                <p>
                  Have an ambitious idea or an existing business that needs aggressive digital
                  scaling? Let’s talk.
                </p>
                <div className="bs-cta-btn">
                  <Magnetic>
                    <a href="/#contact" className="btn btn--gold">
                      Start Your Project
                    </a>
                  </Magnetic>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="bs-footer-slot">
        <Footer />
      </footer>
    </div>
  );
}