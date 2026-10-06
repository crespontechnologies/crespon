"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FadeIn, RevealText, Magnetic } from "@/components/common/Motion";
import CustomCursor from "@/components/common/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import "@/app/philosophy/philosophy.css";

/* =========================================================
   Icons
   ========================================================= */
const ICONS = {
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  phone: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  branch: (
    <>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </>
  ),
  headset: (
    <>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  arrow: (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>
  ),
};

function Icon({ name, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

/* =========================================================
   Content
   ========================================================= */
const TERMINAL_LINES = [
  "crespon init --goal growth",
  "crespon build --focus performance",
  "crespon connect --seo --analytics",
  "crespon launch --support always",
];

const PILLARS = [
  {
    icon: "compass",
    num: "01",
    label: "Strategy",
    file: "strategy",
    title: "Business-First Approach",
    text: "Every project starts with your business model, audience and revenue goals, not with design or code.",
    example: "Intent-based keyword mapping and conversion-focused user flows for e-commerce and booking portals.",
  },
  {
    icon: "zap",
    num: "02",
    label: "Architecture",
    file: "architecture",
    title: "Performance by Design",
    text: "We build on Next.js, Spring Boot and optimized SQL so your product is fast, stable and search-friendly.",
    example: "Removing render-blocking assets to reach sub-second loads and strong Core Web Vitals.",
  },
  {
    icon: "eye",
    num: "03",
    label: "Transparency",
    file: "transparency",
    title: "Clear Execution",
    text: "No hidden costs and no jargon. You get defined milestones and clean, production-ready code that scales.",
    example: "Milestone updates and GitHub version control for smooth, trackable deployments.",
  },
  {
    icon: "users",
    num: "04",
    label: "Partnership",
    file: "partnership",
    title: "Long-Term Growth",
    text: "After launch we stay on as your growth partner, with support, performance monitoring and optimization.",
    example: "Ongoing maintenance, analytics tracking and continuous SEO management.",
  },
];

const STEPS = [
  {
    title: "Understand",
    text: "We study your goals, audience and competitors to define the right scope.",
    output: "Scope, sitemap and milestones",
  },
  {
    title: "Build",
    text: "Design and development move in milestones, with Next.js on the front and Spring Boot behind it.",
    output: "Reviewable builds at every milestone",
  },
  {
    title: "Connect",
    text: "We connect analytics, forms, WhatsApp, APIs and search visibility so leads can reach you.",
    output: "Tracking, integrations and SEO",
  },
  {
    title: "Grow",
    text: "After launch we monitor, optimize and iterate to keep your results improving.",
    output: "Regular performance insights",
  },
];

const STACK = [
  { key: "frontend", items: ["Next.js", "React", "Responsive CSS"] },
  { key: "backend", items: ["Spring Boot", "REST APIs"] },
  { key: "database", items: ["Optimized SQL"] },
  { key: "delivery", items: ["GitHub", "SEO", "Core Web Vitals", "Analytics"] },
];

const ALL_TECH = STACK.flatMap((g) => g.items);
const ALL_TECH_REVERSED = [...ALL_TECH].reverse();

const TYPICAL = [
  "Template-based designs that look like everyone else's",
  "Focus on features, not business goals",
  "Heavy plugins and slow-loading pages",
  "Support disappears after launch",
  "Unclear pricing and hidden extras",
];

const CRESPON = [
  "Custom design built around your brand",
  "Features chosen from your business goals",
  "Optimized architecture and fast load times",
  "Continuous support and performance monitoring",
  "Clear milestones and no hidden costs",
];

const STATS = [
  { to: 100, suffix: "%", label: "Custom Built" },
  { to: 360, suffix: "°", label: "Visibility" },
  { to: 0, suffix: "", label: "Hidden Costs" },
];

const DELIVERABLES = [
  { icon: "code", title: "Clean, production-ready code", text: "Well-organized code that is easy to maintain and scale." },
  { icon: "phone", title: "Mobile-first and responsive", text: "Layouts that look and work right on every screen." },
  { icon: "search", title: "SEO-ready structure", text: "Search visibility is built in from day one, not added later." },
  { icon: "eye", title: "Transparent milestones", text: "Clear updates at every stage, so you are always informed." },
  { icon: "branch", title: "GitHub version control", text: "Every change is tracked, safe and easy to deploy." },
  { icon: "headset", title: "Post-launch support", text: "Maintenance, monitoring and optimization after go-live." },
];

const FAQS = [
  {
    q: "How does a project start?",
    a: "With a discovery conversation about your business model, audience and goals. We then share the scope, milestones and plan, and the build begins only after you approve it.",
  },
  {
    q: "Which technologies do you use?",
    a: "Next.js and React on the frontend, Spring Boot on the backend and optimized SQL for data. The final stack is chosen to fit your project's requirements.",
  },
  {
    q: "Will my website be optimized for mobile and SEO?",
    a: "Yes. Every site is mobile-first and responsive, and Core Web Vitals and SEO structure are planned from the start rather than added at the end.",
  },
  {
    q: "What support do I get after launch?",
    a: "We stay on as your growth partner with maintenance, performance monitoring, analytics tracking and ongoing SEO optimization.",
  },
  {
    q: "How are pricing and timelines decided?",
    a: "They depend on scope and requirements. After discovery you receive clear milestones, a timeline and a cost, with no hidden charges.",
  },
];

/* =========================================================
   Hooks and small components
   ========================================================= */

// Becomes true once when the element scrolls into view
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
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
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// Terminal line that types and deletes commands
function Typewriter({ lines }) {
  const [text, setText] = useState(lines[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let line = 0;
    let chars = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const full = lines[line];
      if (!deleting) {
        chars += 1;
        setText(full.slice(0, chars));
        if (chars === full.length) {
          deleting = true;
          timer = setTimeout(tick, 1700);
          return;
        }
        timer = setTimeout(tick, 42);
      } else {
        chars -= 1;
        setText(full.slice(0, chars));
        if (chars === 0) {
          deleting = false;
          line = (line + 1) % lines.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 20);
      }
    };

    setText("");
    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, [lines]);

  return (
    <div className="ph-terminal" aria-hidden="true">
      <b>$</b>
      <span className="ph-terminal-text">{text}</span>
      <i className="ph-caret" />
    </div>
  );
}

// Subtle 3D tilt that follows the mouse (mouse only)
function Tilt({ children }) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={ref} className="ph-tilt" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="ph-tilt-inner">{children}</div>
    </div>
  );
}

// Number that counts up when it scrolls into view
function CountUp({ to, suffix = "" }) {
  const [ref, inView] = useInView(0.5);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const start = performance.now();
    const duration = 1200;
    let raf;
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

// Cursor-following light on cards
function spotlight(e) {
  e.currentTarget.querySelectorAll(".ph-spot").forEach((card) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
}

function WinBar({ title, right }) {
  return (
    <div className="ph-win-bar">
      <span className="ph-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="ph-win-title">{title}</span>
      {right ? <span className="ph-win-right">{right}</span> : null}
    </div>
  );
}

function Step({ index, step }) {
  const [ref, inView] = useInView(0.6);
  return (
    <li ref={ref} className={`ph-step ${inView ? "is-in" : ""}`}>
      <span className="ph-step-num">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <h3>{step.title}</h3>
        <p>{step.text}</p>
        <span className="ph-step-out">Output: {step.output}</span>
      </div>
    </li>
  );
}

function Marquee({ items, reverse = false }) {
  return (
    <div className={`ph-marquee ${reverse ? "is-reverse" : ""}`} aria-hidden="true">
      <div className="ph-marquee-track">
        {[0, 1].map((g) => (
          <div className="ph-marquee-group" key={g}>
            {items.map((t) => (
              <span className="ph-pill" key={t}>
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DiffView() {
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} className={`ph-win ph-diff ${inView ? "is-in" : ""}`}>
      <WinBar
        title="approach.diff"
        right={
          <>
            <span className="ph-legend ph-legend--del">typical</span>
            <span className="ph-legend ph-legend--add">crespon</span>
          </>
        }
      />
      <div className="ph-diff-body">
        {TYPICAL.map((t, i) => (
          <Fragment key={t}>
            <div className="ph-diff-line is-del" style={{ "--i": i * 2 }}>
              <span className="ph-diff-sign" aria-hidden="true">
                −
              </span>
              <span className="ph-sr">Typical approach: </span>
              <span>{t}</span>
            </div>
            <div className="ph-diff-line is-add" style={{ "--i": i * 2 + 1 }}>
              <span className="ph-diff-sign" aria-hidden="true">
                +
              </span>
              <span className="ph-sr">The Crespon way: </span>
              <span>{CRESPON[i]}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   Page
   ========================================================= */
export default function PhilosophyPage() {
  const [active, setActive] = useState(0);

  const onTabKey = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    let next = null;
    if (step) next = (active + step + PILLARS.length) % PILLARS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = PILLARS.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    requestAnimationFrame(() => document.getElementById(`ph-tab-${next}`)?.focus());
  };

  return (
    <div className="philosophy-wrapper">
      <CustomCursor />
      <Navbar />

      <main className="philosophy-page">
        {/* ---------- Hero ---------- */}
        <section className="ph-hero">
          <div className="ph-container ph-hero-grid">
            <div className="ph-hero-copy">
              <span className="ph-tag">// Crespon DNA &amp; Blueprint</span>
              <RevealText text="Code That Solves. Strategy That Scales." className="ph-title" />
              <FadeIn delay={0.3}>
                <p className="ph-lead">
                  Technology should do more than ship features. We build websites and software that solve
                  real business problems and keep growing with you.
                </p>
                <div className="ph-actions">
                  <Magnetic>
                    <a href="/#contact" className="ph-btn ph-btn--primary">
                      Start a Project
                      <Icon name="arrow" size={15} />
                    </a>
                  </Magnetic>
                  <Link href="/past-works" className="ph-btn ph-btn--ghost">
                    See Our Work
                  </Link>
                </div>
                <Typewriter lines={TERMINAL_LINES} />
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <div className="ph-visual">
                <Tilt>
                  <div className="ph-media-ring">
                    <div className="ph-media">
                      <img
                        src="/hero.svg"
                        alt="Website dashboard showing code, performance score and growth chart"
                        width="480"
                        height="360"
                      />
                    </div>
                  </div>
                </Tilt>
                <span className="ph-float ph-float--a">
                  <Icon name="check" size={13} />
                  Core Web Vitals
                </span>
                <span className="ph-float ph-float--b">
                  <Icon name="zap" size={13} />
                  SEO-ready
                </span>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ---------- Principles (tabs) ---------- */}
        <section className="ph-section">
          <div className="ph-container">
            <FadeIn>
              <div className="ph-head">
                <span className="ph-tag">// Our Principles</span>
                <h2>
                  The <span>Crespon</span> Standard
                </h2>
                <p>Four principles that define the quality of every project and every line of code.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="ph-tabs">
                <div
                  className="ph-tablist"
                  role="tablist"
                  aria-label="Crespon principles"
                  onKeyDown={onTabKey}
                >
                  {PILLARS.map((p, i) => (
                    <button
                      key={p.num}
                      type="button"
                      role="tab"
                      id={`ph-tab-${i}`}
                      aria-selected={active === i}
                      aria-controls={`ph-panel-${i}`}
                      tabIndex={active === i ? 0 : -1}
                      className={`ph-tab ${active === i ? "is-active" : ""}`}
                      onClick={() => setActive(i)}
                    >
                      <span className="ph-tab-icon">
                        <Icon name={p.icon} size={16} />
                      </span>
                      <span className="ph-tab-text">
                        <small>
                          {p.num} // {p.label}
                        </small>
                        <b>{p.title}</b>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="ph-win ph-editor">
                  <WinBar
                    title={`standard/${PILLARS[active].num}-${PILLARS[active].file}.ts`}
                    right={`${PILLARS[active].num} / 0${PILLARS.length}`}
                  />
                  {PILLARS.map((p, i) => (
                    <div
                      key={p.num}
                      role="tabpanel"
                      id={`ph-panel-${i}`}
                      aria-labelledby={`ph-tab-${i}`}
                      hidden={active !== i}
                      className="ph-panel"
                    >
                      <p className="ph-cm">
                        // {p.num} · {p.label}
                      </p>
                      <h3>{p.title}</h3>
                      <p className="ph-panel-text">{p.text}</p>
                      <p className="ph-prompt">
                        <span aria-hidden="true">›</span>
                        <b>In practice</b>
                        {p.example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ---------- Process ---------- */}
        <section className="ph-section ph-section--alt">
          <div className="ph-container ph-split">
            <FadeIn>
              <div className="ph-media">
                <img
                  src="/blueprint.svg"
                  alt="Four stacked layers: strategy, design, engineering and growth"
                  width="480"
                  height="360"
                  loading="lazy"
                />
              </div>
            </FadeIn>

            <div>
              <FadeIn>
                <div className="ph-head ph-head--left">
                  <span className="ph-tag">// How We Work</span>
                  <h2>
                    From business goal to <span>working product</span>
                  </h2>
                  <p>Four stages, each with a clear output, so you always know what is being built and why.</p>
                </div>
              </FadeIn>

              <ol className="ph-steps">
                {STEPS.map((s, i) => (
                  <Step key={s.title} index={i} step={s} />
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------- Toolkit ---------- */}
        <section className="ph-section">
          <div className="ph-container">
            <FadeIn>
              <div className="ph-head">
                <span className="ph-tag">// Toolkit</span>
                <h2>
                  The tools we <span>build with</span>
                </h2>
                <p>Proven technologies that balance speed, security and scalability.</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="ph-win ph-stack">
                <WinBar title="stack.json" />
                <pre className="ph-code" tabIndex={0}>
                  <code>
                    <span className="tk-p">{"{"}</span>
                    {"\n"}
                    {STACK.map((g, gi) => (
                      <span key={g.key}>
                        {"  "}
                        <span className="tk-k">&quot;{g.key}&quot;</span>
                        <span className="tk-p">: [</span>
                        {g.items.map((item, ii) => (
                          <span key={item}>
                            <span className="tk-s">&quot;{item}&quot;</span>
                            {ii < g.items.length - 1 ? <span className="tk-p">, </span> : null}
                          </span>
                        ))}
                        <span className="tk-p">]{gi < STACK.length - 1 ? "," : ""}</span>
                        {"\n"}
                      </span>
                    ))}
                    <span className="tk-p">{"}"}</span>
                  </code>
                </pre>
              </div>
            </FadeIn>

            <div className="ph-marquees">
              <Marquee items={ALL_TECH} />
              <Marquee items={ALL_TECH_REVERSED} reverse />
            </div>
          </div>
        </section>

        {/* ---------- Difference ---------- */}
        <section className="ph-section ph-section--alt">
          <div className="ph-container ph-container--mid">
            <FadeIn>
              <div className="ph-head">
                <span className="ph-tag">// The Difference</span>
                <h2>
                  A good website looks great. <span>A great website drives growth.</span>
                </h2>
                <p>
                  We combine thoughtful design with solid backend engineering, so your brand stands out and
                  performs.
                </p>
              </div>
            </FadeIn>

            <DiffView />

            <div className="ph-stats">
              {STATS.map((s) => (
                <div key={s.label} className="ph-stat">
                  <b>
                    <CountUp to={s.to} suffix={s.suffix} />
                  </b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Deliverables ---------- */}
        <section className="ph-section">
          <div className="ph-container">
            <FadeIn>
              <div className="ph-head">
                <span className="ph-tag">// Deliverables</span>
                <h2>
                  What you <span>get</span>
                </h2>
                <p>These commitments come with every project.</p>
              </div>
            </FadeIn>

            <div className="ph-grid ph-grid--3" onPointerMove={spotlight}>
              {DELIVERABLES.map((d, i) => (
                <FadeIn key={d.title} delay={0.06 * (i + 1)}>
                  <div className="ph-card ph-spot">
                    <span className="ph-icon">
                      <Icon name={d.icon} />
                    </span>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="ph-section ph-section--alt">
          <div className="ph-container ph-container--narrow">
            <FadeIn>
              <div className="ph-head">
                <span className="ph-tag">// FAQ</span>
                <h2>
                  Frequently asked <span>questions</span>
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="ph-faq">
                {FAQS.map((f) => (
                  <details key={f.q} className="ph-faq-item">
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="ph-section ph-cta-section">
          <div className="ph-container">
            <FadeIn>
              <div className="ph-cta">
                <img
                  src="/cresponBG.png"
                  alt="Crespon Technologies logo"
                  width="56"
                  height="56"
                  className="ph-cta-logo"
                />
                <div className="ph-cta-text">
                  <span className="ph-cta-eyebrow">// ready when you are</span>
                  <h2>Ready to build something meaningful?</h2>
                  <p>Turn your business challenge into a scalable digital solution.</p>
                </div>
                <div className="ph-cta-actions">
                  <Magnetic>
                    <a href="/#contact" className="ph-btn ph-btn--primary">
                      Start a Project
                      <Icon name="arrow" size={15} />
                    </a>
                  </Magnetic>
                  <Link href="/past-works" className="ph-btn ph-btn--ghost">
                    See Our Work
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Footer wrapper: gives the shared footer proper width and side padding on this page */}
      <div className="ph-footer">
        <div className="ph-footer-inner">
          <Footer />
        </div>
      </div>
    </div>
  );
}