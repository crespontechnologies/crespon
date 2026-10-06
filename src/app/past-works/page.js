"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FadeIn, RevealText, Magnetic } from "@/components/common/Motion";
import CustomCursor from "@/components/common/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import "@/app/past-works/projects.css";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FILTERS = ["All", "Full-Stack", "E-Commerce", "SEO & Local", "Academic"];

const projects = [
  {
    id: "theroamerscult",
    title: "The Roamers Cult — Premium Tourism Platform & Full Management",
    category: "Tourism & Enterprise",
    groups: ["Full-Stack", "SEO & Local"],
    client: "The Roamers Cult",
    role: "Full-Stack Development · SEO · Hosting · Ongoing Management",
    problem:
      "Scattered bookings, manual trip updates, weak search visibility and no central way to manage content, enquiries and data.",
    solution:
      "One complete platform: custom admin dashboard, structured SQL database, fast cloud hosting and a blog + SEO engine so the team runs everything without developer help.",
    features: [
      "Custom admin dashboard for trips, enquiries & content",
      "Normalized SQL schema with secure REST APIs",
      "Blog engine with on-page SEO & structured data",
      "Cloud deployment with monitoring and backups",
    ],
    result:
      "Stronger organic traffic, faster content publishing and one place to run the whole business.",
    tech: ["Next.js", "Node.js", "SQL Database", "Advanced SEO", "Cloud Deployment"],
    image: "/cresponwork (4).png",
    link: "https://theroamerscult.com",
    featured: true,
    wide: true,
  },
  {
    id: "clikit24",
    title: "Clikit24 — E-Commerce & Custom 3D Framing Platform",
    category: "E-Commerce & 3D Tech",
    groups: ["Full-Stack", "E-Commerce"],
    client: "Clikit24 Brand",
    role: "Full-Stack Development · Payments · Performance",
    problem:
      "Customers couldn't visualise custom frames before buying, causing wrong orders, returns and low trust in online payments.",
    solution:
      "Live 3D frame customizer (size, colour, material) with real-time preview, Razorpay payments with server-side verification and a clean order pipeline.",
    features: [
      "Interactive 3D frame customization tool",
      "Razorpay integration with signature verification",
      "Spring Boot REST APIs with SQL order management",
      "Optimized, mobile-first storefront",
    ],
    result: "Fewer order mistakes, smoother checkout and a store customers can trust.",
    tech: ["Next.js", "Spring Boot", "SQL", "Razorpay APIs", "Tailwind CSS"],
    image: "/cresponwork (3).png",
    link: "https://clikit24.com",
    featured: true,
    wide: false,
  },
  {
    id: "camping-ecosystem",
    title: "Rajmachi & Pawna Lake Camping — Booking Portals & Blog Engine",
    category: "Camping & Content SEO",
    groups: ["SEO & Local"],
    client: "Subhash Ware & Camping Partners",
    role: "Web Development · Content SEO · DNS & Deployment",
    problem:
      "Bookings depended on phone calls and third-party listings, with no own website ranking on Google for local camping searches.",
    solution:
      "Dedicated booking portals for rajmachicampsite.com and pawnalakescamping.com plus a blog at blog.pawnalakescamping.com to capture search traffic.",
    features: [
      "Dynamic booking & enquiry portals",
      "Keyword-driven blog content strategy",
      "Hostinger DNS setup with Vercel deployment",
      "Tracked with Google Search Console",
    ],
    result:
      "Real search visibility: 185K impressions and 2.6K clicks on pawnalakescamping.com (Search Console, since Jun 2025).",
    tech: ["Next.js", "Blog Strategy", "Hostinger DNS", "Vercel", "SEO Content"],
    image: "/cresponwork (5).png",
    link: "https://rajmachicampsite.com",
    featured: true,
    wide: false,
  },
  {
    id: "travel-agencies",
    title: "Elite Taxi & Shivshambhu Travels — Car Rental Portals",
    category: "Travel & Rental",
    groups: ["Full-Stack", "SEO & Local"],
    client: "Elite Taxi & Shivshambhu Travels",
    role: "Web Development · Backend APIs · Local SEO",
    problem:
      "Rental businesses were invisible in local searches and lost customers who wanted instant fare and availability details.",
    solution:
      "Rental portals with backend APIs for enquiries and vehicle data, plus full Google Business Profile setup and local SEO for 'near me' searches.",
    features: [
      "Vehicle listing & enquiry APIs",
      "Click-to-call and WhatsApp booking flow",
      "Complete Google Business Profile management",
      "Local SEO with city and route pages",
    ],
    result: "More direct calls and bookings from local search.",
    tech: ["React.js", "Node.js", "Google Business Profile", "Local SEO", "APIs"],
    image: "/cresponwork (2).png",
    link: "https://elitetaxi.in",
    featured: false,
    wide: false,
  },
  {
    id: "event-management",
    title: "Sangharsh Events & Kings Events — Event Decoration Platforms",
    category: "Event Management",
    groups: ["SEO & Local"],
    client: "Sangharsh Events & Kings Events",
    role: "Frontend Development · SEO · Lead Funnels",
    problem:
      "Agencies had great work but no online presence to showcase it, and enquiries got lost across calls and chats.",
    solution:
      "Responsive gallery-style websites with SEO content and automated enquiry funnels that capture every lead in one place.",
    features: [
      "Responsive portfolio & package layouts",
      "Automated enquiry forms with instant alerts",
      "SEO-optimized service & location content",
      "Fast loading image galleries",
    ],
    result: "Organized lead capture and a professional brand image for wedding and celebration clients.",
    tech: ["Next.js", "Tailwind CSS", "SEO Optimization", "Enquiry Funnels"],
    image: "/cresponwork (1).png",
    link: "#",
    featured: false,
    wide: false,
  },
  {
    id: "college-python-java",
    title: "Advanced College Projects, Python/Java Systems & GBPs",
    category: "Academic & Local SEO",
    groups: ["Academic", "Full-Stack"],
    client: "Various Students & Local Businesses",
    role: "Software Development · Documentation · Local SEO",
    problem:
      "Students needed complex, working systems with clear logic and documentation; local businesses like Hotel Pawna Darbar needed visibility on Google.",
    solution:
      "Fully documented Java and Python full-stack projects with proper database design and algorithms, plus Google Business Profile management for local reach.",
    features: [
      "Clean architecture with full documentation",
      "SQL/PostgreSQL schema design & queries",
      "REST API based Java and Python systems",
      "GBP optimization, posts and review handling",
    ],
    result: "Projects that run, can be explained confidently, and local businesses that get found.",
    tech: ["Python", "Java", "SQL/PostgreSQL", "Google Business Profile", "REST APIs"],
    image: "/cresponwork (6).png",
    link: "#",
    featured: false,
    wide: false,
  },
];

const highlights = [
  { end: 15, suffix: "+", label: "Active Business Platforms" },
  { end: 360, suffix: "°", label: "Admin, Database & Killer SEO" },
  { end: 100, suffix: "%", label: "Custom APIs & Cloud Hosting" },
  { text: "24/7", label: "Marketing & Uptime Management" },
];

/* Real numbers from Google Search Console — pawnalakescamping.com */
const seoMetrics = [
  { key: "clicks", label: "Total clicks", end: 2.6, decimals: 1, suffix: "K", color: "#4285f4" },
  { key: "imps", label: "Total impressions", end: 185, decimals: 0, suffix: "K", color: "#7c4dff" },
  { key: "ctr", label: "Average CTR", end: 1.4, decimals: 1, suffix: "%", color: "#00a58e" },
  { key: "pos", label: "Average position", end: 15.2, decimals: 1, suffix: "", color: "#f57c00" },
];

const seoInsights = [
  {
    icon: "👁️",
    title: "185K impressions",
    text: "Google already shows the site across a large number of searches — visibility is working and growing.",
  },
  {
    icon: "🎯",
    title: "1.4% CTR = biggest opportunity",
    text: "Sharper titles, meta descriptions and rich results can turn more of those impressions into clicks.",
  },
  {
    icon: "📈",
    title: "Position 15.2 → Top 10",
    text: "Average sits on page 2. Deeper content, internal links and backlinks are the plan to reach page 1.",
  },
];

const seoPillars = [
  {
    icon: "⚙️",
    title: "Technical SEO",
    items: ["Core Web Vitals & speed", "Sitemap, robots & HTTPS", "Schema / structured data", "Mobile-first indexing"],
  },
  {
    icon: "📝",
    title: "On-Page SEO",
    items: ["Title & meta optimization", "Heading structure", "Keyword mapping", "Internal linking"],
  },
  {
    icon: "✍️",
    title: "Content & Blogs",
    items: ["Keyword research", "Search-intent blog posts", "Content calendar", "Refresh old content"],
  },
  {
    icon: "📍",
    title: "Local SEO & GBP",
    items: ["Google Business Profile", "Reviews & posts", "Maps & NAP citations", "City / route pages"],
  },
  {
    icon: "🔗",
    title: "Off-Page SEO",
    items: ["Quality backlinks", "Local directories", "Brand mentions", "Link health audits"],
  },
  {
    icon: "📊",
    title: "Tracking & Reports",
    items: ["Search Console", "Analytics goals", "Clicks, CTR, position", "Monthly improvement plan"],
  },
];

const skills = [
  {
    icon: "💻",
    title: "Software Development",
    items: ["Full-stack web apps", "Java & Python systems", "REST API design", "Clean, documented code"],
  },
  {
    icon: "🎨",
    title: "Frontend",
    items: ["Next.js / React.js", "Tailwind CSS", "Responsive UI", "Animations & performance"],
  },
  {
    icon: "🛠️",
    title: "Backend & Database",
    items: ["Node.js & Spring Boot", "SQL / PostgreSQL", "Auth & payments", "Admin dashboards"],
  },
  {
    icon: "🚀",
    title: "SEO & Marketing",
    items: ["Technical & local SEO", "Blog strategy", "Google Business Profile", "Lead funnels"],
  },
  {
    icon: "☁️",
    title: "Hosting & DevOps",
    items: ["Vercel & Hostinger", "DNS & domains", "Cloud deployment", "Uptime monitoring"],
  },
  {
    icon: "🧩",
    title: "Problem Solving",
    items: ["Root-cause analysis", "Efficient algorithms", "Scalable architecture", "Debug & optimize"],
  },
];

const steps = [
  { n: "01", title: "Understand", text: "Find the real business problem before writing code." },
  { n: "02", title: "Analyze", text: "Break it down, list constraints and edge cases." },
  { n: "03", title: "Design", text: "Plan data, APIs and UI for the simplest solid fix." },
  { n: "04", title: "Build", text: "Develop clean, tested and documented features." },
  { n: "05", title: "Optimize", text: "Improve speed, SEO and reliability after launch." },
];

const ticker = [
  "Next.js",
  "React.js",
  "Node.js",
  "Spring Boot",
  "Java",
  "Python",
  "PostgreSQL",
  "SQL",
  "Tailwind CSS",
  "Razorpay",
  "REST APIs",
  "Vercel",
  "Hostinger",
  "Technical SEO",
  "Search Console",
  "Google Business Profile",
];




const marketingStrategies = [
  {
    icon: "📣",
    tag: "Social",
    title: "Social Media Marketing",
    text: "Brand ko wahan dikhao jahan aapke customers roz scroll karte hain.",
    items: [
      "Instagram & Facebook content calendar",
      "Reels, carousels & story campaigns",
      "Community engagement & DM funnels",
      "Monthly performance review",
    ],
  },
  {
    icon: "🎯",
    tag: "Paid",
    title: "Performance Ads",
    text: "Har rupee ka hisaab — sahi audience, sahi budget, sahi message.",
    items: [
      "Google Ads & Meta Ads setup",
      "Audience & keyword targeting",
      "A/B testing of creatives",
      "Retargeting for warm visitors",
    ],
  },
  {
    icon: "📍",
    tag: "Local",
    title: "Local Marketing & GBP",
    text: "'Near me' searches se seedha call, direction aur booking.",
    items: [
      "Google Business Profile growth",
      "Review collection & replies",
      "City / route landing pages",
      "Maps & citation listings",
    ],
  },
  {
    icon: "✍️",
    tag: "Content",
    title: "Content & Blog Marketing",
    text: "Search-intent content jo traffic laye aur trust bhi banaye.",
    items: [
      "Keyword-driven blog strategy",
      "Destination & service guides",
      "Content refresh & repurposing",
      "Internal linking for authority",
    ],
  },
  {
    icon: "💬",
    tag: "Retention",
    title: "WhatsApp & Email Marketing",
    text: "Purane customers ko repeat customers me convert karo.",
    items: [
      "WhatsApp broadcast & catalogue",
      "Automated enquiry follow-ups",
      "Offer & festival campaigns",
      "Email newsletters & drip flows",
    ],
  },
  {
    icon: "🎨",
    tag: "Brand",
    title: "Branding & Creatives",
    text: "Professional look jo pehli nazar me bharosa jeete.",
    items: [
      "Logo, colours & brand voice",
      "Social post & ad creatives",
      "Offer banners & posters",
      "Consistent look across platforms",
    ],
  },
];
 
const marketingFunnel = [
  { n: "01", title: "Attract", text: "SEO, blogs, ads aur social se naye logon tak pahunchna." },
  { n: "02", title: "Engage", text: "Fast website, clear offers aur helpful content se interest banana." },
  { n: "03", title: "Convert", text: "Enquiry forms, click-to-call aur WhatsApp se booking lena." },
  { n: "04", title: "Retain", text: "Follow-ups, reviews aur offers se repeat business badhana." },
];
 
const marketingWhy = [
  { icon: "🔗", title: "Website + Marketing, ek hi team", text: "Build karne wali team hi promote karti hai — koi gap nahi." },
  { icon: "📊", title: "Data-backed decisions", text: "Search Console & Analytics se har campaign track hota hai." },
  { icon: "🤝", title: "Ongoing management", text: "Launch ke baad bhi monitoring, reports aur improvements." },
];


/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */





function useInView(threshold = 0.3) {
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

function Counter({ end, decimals = 0, suffix = "", duration = 1500 }) {
  const [ref, inView] = useInView(0.4);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(end);
      return undefined;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="proj-num">
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function ProjectImage({ src, alt, fallbackText }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className="proj-img-fallback">{fallbackText || alt}</div>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 900px) 100vw, 540px"
      unoptimized
      className="proj-img"
      onError={() => setFailed(true)}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [seoRef, seoIn] = useInView(0.25);

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.groups.includes(filter));

  const countFor = (f) =>
    f === "All" ? projects.length : projects.filter((p) => p.groups.includes(f)).length;

  return (
    <div className="proj-wrapper">
      <CustomCursor />
      <Navbar />

      <main className="proj-page">
        {/* ============ HERO ============ */}
        <section className="proj-hero">
          <span className="proj-orb proj-orb--a" aria-hidden="true" />
          <span className="proj-orb proj-orb--b" aria-hidden="true" />

          <div className="proj-container proj-hero-grid">
            <div className="proj-hero-copy">
              <span className="proj-tag">
                <i className="proj-dot" /> // PAST WORK & CASE STUDIES
              </span>
              <RevealText
                text="Complete Ecosystems. Full-Stack Engineering. Killer SEO."
                className="proj-title"
              />
              <FadeIn delay={0.3}>
                <p className="proj-lead">
                  Real businesses, real problems. Full tourism web management, e-commerce with 3D
                  customization, camping portals, rental apps and Java/Python systems — each built
                  by solving the problem first, then ranking it on Google.
                </p>
                <div className="proj-hero-actions">
                  <a href="#portfolio" className="proj-btn proj-btn--solid">
                    View Projects
                  </a>
                  <a href="#seo" className="proj-btn proj-btn--ghost">
                    See SEO Results ↓
                  </a>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.4}>
              <div className="proj-hero-card">
                <div className="proj-hero-card-top">
                  <span className="proj-live">
                    <i className="proj-dot" /> Google Search Console
                  </span>
                  <span className="proj-hero-domain">pawnalakescamping.com</span>
                </div>
                <div className="proj-mini-grid">
                  {seoMetrics.map((m) => (
                    <div key={m.key} className="proj-mini" style={{ "--c": m.color }}>
                      <span>{m.label}</span>
                      <b>
                        <Counter end={m.end} decimals={m.decimals} suffix={m.suffix} />
                      </b>
                    </div>
                  ))}
                </div>
                <p className="proj-hero-card-note">Web search · since 04 Jun 2025</p>
              </div>
            </FadeIn>
          </div>

          <div className="proj-marquee" aria-hidden="true">
            <div className="proj-marquee-track">
              {[...ticker, ...ticker].map((t, i) => (
                <span key={`${t}-${i}`} className="proj-marquee-item">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className="proj-section proj-stats-section">
          <div className="proj-container">
            <div className="proj-stats-grid">
              {highlights.map((item, index) => (
                <FadeIn key={item.label} delay={0.1 * (index + 1)}>
                  <div className="proj-stat-card">
                    <b>
                      {item.text ? (
                        item.text
                      ) : (
                        <Counter end={item.end} suffix={item.suffix} />
                      )}
                    </b>
                    <span>{item.label}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SKILLS ============ */}
        <section className="proj-section" id="skills">
          <div className="proj-container">
            <FadeIn>
              <div className="proj-section-header">
                <span className="proj-eyebrow">What we do</span>
                <h2>
                  Tech Skills & <span>Software Development</span>
                </h2>
                <p>
                  From database to deployment to Google ranking — one team handling the complete
                  stack.
                </p>
              </div>
            </FadeIn>

            <div className="proj-skills-grid">
              {skills.map((s, index) => (
                <FadeIn key={s.title} delay={0.06 * ((index % 3) + 1)}>
                  <div className="proj-skill-card">
                    <div className="proj-skill-head">
                      <span className="proj-skill-icon" aria-hidden="true">
                        {s.icon}
                      </span>
                      <h3>{s.title}</h3>
                    </div>
                    <ul>
                      {s.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PROJECTS ============ */}
        <section className="proj-section" id="portfolio">
          <div className="proj-container">
            <FadeIn>
              <div className="proj-section-header">
                <span className="proj-eyebrow">Case studies</span>
                <h2>
                  Featured <span>Business Solutions & Portals</span>
                </h2>
                <p>
                  Every project shows the problem we found, how we solved it and the technology
                  behind it.
                </p>
              </div>
            </FadeIn>

            <div className="proj-filters" role="tablist" aria-label="Filter projects">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={filter === f}
                  className={`proj-chip ${filter === f ? "is-active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f} <em>{countFor(f)}</em>
                </button>
              ))}
            </div>

            <div className="proj-grid">
              {visible.map((p, index) => (
                <article
                  key={`${filter}-${p.id}`}
                  className={`proj-card ${p.featured ? "proj-card--featured" : ""} ${
                    p.wide && filter === "All" ? "proj-card--wide" : ""
                  }`}
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="proj-card-media">
                    <ProjectImage src={p.image} alt={p.title} />
                    <span className="proj-category-badge">{p.category}</span>
                    {p.featured && <span className="proj-featured-badge">★ Featured</span>}
                    {p.link !== "#" && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-media-link"
                        aria-label={`Open ${p.client}`}
                      >
                        Visit site ↗
                      </a>
                    )}
                  </div>

                  <div className="proj-card-content">
                    <span className="proj-client">Client / Brand: {p.client}</span>
                    <h3>{p.title}</h3>
                    <span className="proj-role">{p.role}</span>

                    <div className="proj-ps">
                      <div className="proj-ps-box proj-ps-box--problem">
                        <strong>🧩 Problem</strong>
                        <p>{p.problem}</p>
                      </div>
                      <span className="proj-ps-arrow" aria-hidden="true">
                        →
                      </span>
                      <div className="proj-ps-box proj-ps-box--solution">
                        <strong>✅ Solution</strong>
                        <p>{p.solution}</p>
                      </div>
                    </div>

                    <ul className="proj-feature-list">
                      {p.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>

                    <p className="proj-result">
                      <b>Result:</b> {p.result}
                    </p>

                    <ul className="proj-tech-list">
                      {p.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>

                    {p.link !== "#" && (
                      <div className="proj-action">
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="proj-link-btn"
                        >
                          Live Preview <span>↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SEO ============ */}
        <section className="proj-section" id="seo">
          <div className="proj-container">
            <FadeIn>
              <div className="proj-section-header">
                <span className="proj-eyebrow">Search Engine Optimization</span>
                <h2>
                  SEO That Shows in <span>Real Numbers</span>
                </h2>
                <p>
                  We don't just build websites — we make them findable. Live data from Google
                  Search Console for pawnalakescamping.com.
                </p>
              </div>
            </FadeIn>

            <div ref={seoRef} className={`proj-seo-panel ${seoIn ? "is-in" : ""}`}>
              {/* Screenshot */}
              <div className="proj-seo-shot">
                <div className="proj-shot-frame">
                  <ProjectImage
                    src="/cresponseo.png"
                    alt="Google Search Console performance report for pawnalakescamping.com"
                    fallbackText="Add your Search Console screenshot at /public/projects/gsc-pawnalakes.png"
                  />
                </div>
                <p className="proj-shot-cap">
                  Google Search Console · pawnalakescamping.com · Web search · from 04 Jun 2025
                </p>
              </div>

              {/* Metrics */}
              <div className="proj-seo-data">
                <div className="proj-kpis">
                  {seoMetrics.map((m) => (
                    <div key={m.key} className="proj-kpi" style={{ "--c": m.color }}>
                      <span>{m.label}</span>
                      <b>
                        <Counter end={m.end} decimals={m.decimals} suffix={m.suffix} />
                      </b>
                    </div>
                  ))}
                </div>

                {/* Position gauge */}
                <div className="proj-block">
                  <div className="proj-block-head">
                    <strong>Average ranking position</strong>
                    <span>Goal: Top 10</span>
                  </div>
                  <div className="proj-gauge">
                    <div className="proj-gauge-zones">
                      <span className="z1">Page 1</span>
                      <span className="z2">Page 2</span>
                      <span className="z3">Page 3</span>
                    </div>
                    <div className="proj-marker" style={{ "--pos": "50.7%" }}>
                      <b>15.2</b>
                    </div>
                  </div>
                </div>

                {/* Funnel */}
                <div className="proj-block">
                  <div className="proj-block-head">
                    <strong>Impressions → Clicks</strong>
                    <span>1.4% CTR</span>
                  </div>
                  <div className="proj-funnel">
                    <div className="proj-funnel-row">
                      <span>Impressions</span>
                      <div className="proj-bar">
                        <i style={{ "--w": "100%", background: "#7c4dff" }} />
                      </div>
                      <em>185K</em>
                    </div>
                    <div className="proj-funnel-row">
                      <span>Clicks</span>
                      <div className="proj-bar">
                        <i style={{ "--w": "1.4%", background: "#4285f4" }} />
                      </div>
                      <em>2.6K</em>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="proj-insights">
              {seoInsights.map((s, index) => (
                <FadeIn key={s.title} delay={0.08 * (index + 1)}>
                  <div className="proj-insight">
                    <span className="proj-insight-icon" aria-hidden="true">
                      {s.icon}
                    </span>
                    <div>
                      <h4>{s.title}</h4>
                      <p>{s.text}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Pillars */}
            <FadeIn>
              <h3 className="proj-subhead">
                How we do <span>SEO</span>
              </h3>
            </FadeIn>
            <div className="proj-pillars">
              {seoPillars.map((s, index) => (
                <FadeIn key={s.title} delay={0.06 * ((index % 3) + 1)}>
                  <div className="proj-pillar">
                    <div className="proj-skill-head">
                      <span className="proj-skill-icon" aria-hidden="true">
                        {s.icon}
                      </span>
                      <h3>{s.title}</h3>
                    </div>
                    <ul>
                      {s.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>





 <section className="proj-section" id="marketing">
          <div className="proj-container">
            <FadeIn>
              <div className="proj-section-header">
                <span className="proj-eyebrow">Digital Marketing</span>
                <h2>
                  Crespon Delivers <span>Best-in-Class Marketing</span>
                </h2>
                <p>
                  Website banana kaafi nahi — usse sahi logon tak pahunchana zaroori hai. Ye hain
                  hamari proven marketing strategies jo traffic ko customers me badalti hain.
                </p>
              </div>
            </FadeIn>
 
            <div className="proj-mk-grid">
              {marketingStrategies.map((m, index) => (
                <FadeIn key={m.title} delay={0.06 * ((index % 3) + 1)}>
                  <div className="proj-mk-card">
                    <div className="proj-mk-top">
                      <span className="proj-skill-icon" aria-hidden="true">
                        {m.icon}
                      </span>
                      <span className="proj-mk-tag">{m.tag}</span>
                    </div>
                    <h3>{m.title}</h3>
                    <p className="proj-mk-text">{m.text}</p>
                    <ul>
                      {m.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
 
            <FadeIn>
              <h3 className="proj-subhead">
                Our <span>Marketing Funnel</span>
              </h3>
            </FadeIn>
            <div className="proj-mk-funnel">
              {marketingFunnel.map((s, index) => (
                <FadeIn key={s.n} delay={0.07 * (index + 1)}>
                  <div className="proj-mk-step">
                    <span className="proj-step-num">{s.n}</span>
                    <h4>{s.title}</h4>
                    <p>{s.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
 
            <div className="proj-mk-why">
              {marketingWhy.map((w, index) => (
                <FadeIn key={w.title} delay={0.08 * (index + 1)}>
                  <div className="proj-insight">
                    <span className="proj-insight-icon" aria-hidden="true">
                      {w.icon}
                    </span>
                    <div>
                      <h4>{w.title}</h4>
                      <p>{w.text}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
 
            <div className="proj-mk-actions">
              <a href="/#contact" className="proj-btn proj-btn--solid">
                Get a Marketing Plan
              </a>
              <a href="#seo" className="proj-btn proj-btn--ghost">
                See Real Results ↑
              </a>
            </div>
          </div>
        </section>




        {/* ============ PROCESS ============ */}
        <section className="proj-section" id="process">
          <div className="proj-container">
            <FadeIn>
              <div className="proj-section-header">
                <span className="proj-eyebrow">How we work</span>
                <h2>
                  Our <span>Problem-Solving</span> Approach
                </h2>
                <p>The same focused process behind every project we deliver.</p>
              </div>
            </FadeIn>

            <div className="proj-steps">
              {steps.map((s, index) => (
                <FadeIn key={s.n} delay={0.07 * (index + 1)}>
                  <div className="proj-step">
                    <span className="proj-step-num">{s.n}</span>
                    <h4>{s.title}</h4>
                    <p>{s.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="proj-cta-section">
          <div className="proj-container">
            <FadeIn>
              <div className="proj-cta-box">
                <h2>Want to Scale Your Business With Advanced Web Systems?</h2>
                <p>
                  Let’s build a high-performance web platform, secure SQL database, and powerful
                  SEO strategy for your brand.
                </p>
                <div className="proj-cta-btn">
                  <Magnetic>
                    <a href="/#contact" className="btn btn--gold">
                      Start a Project
                    </a>
                  </Magnetic>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="proj-footer-slot">
        <Footer />
      </footer>
    </div>
  );
}