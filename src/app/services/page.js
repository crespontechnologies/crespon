"use client";

import Image from "next/image";
import { FadeIn, RevealText, Magnetic } from "@/components/common/Motion";
import CustomCursor from "@/components/common/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import "@/app/services/services.css";

/* ------------------------------------------------------------------ */
/*  Content data                                                       */
/* ------------------------------------------------------------------ */

const heroChips = ["Web", "Software", "AI & Automation", "Product", "SEO", "Marketing", "Branding"];

const approach = [
  {
    step: "01",
    title: "Understand",
    text: "We start by deeply understanding your business, customers, goals, challenges, and existing systems.",
  },
  {
    step: "02",
    title: "Build",
    text: "We develop the exact technology, website, app, or digital system tailored precisely to your requirements.",
  },
  {
    step: "03",
    title: "Connect",
    text: "We connect your business with customers through strong digital presence, SEO, marketing, and automation.",
  },
  {
    step: "04",
    title: "Grow",
    text: "Our ultimate goal is measurable growth: stronger operations, better visibility, and long-term scalability.",
  },
];

const bridgePairs = [
  { from: "Problems", to: "Solutions" },
  { from: "Ideas", to: "Products" },
  { from: "Businesses", to: "Customers" },
  { from: "Offline", to: "Online" },
  { from: "Technology", to: "Business" },
  { from: "Potential", to: "Growth" },
];

const services = [
  {
    num: "01 // WEB DEVELOPMENT",
    title: "Business & E-Commerce Web Apps",
    text: "Professional, responsive, and high-performance websites that serve as powerful growth engines rather than just online brochures.",
    items: [
      "Business & Corporate Websites",
      "E-Commerce & Booking Platforms",
      "Custom Web Applications & Portals",
      "Website Management, Maintenance & Updates",
      "Speed & Performance Optimization",
    ],
  },
  {
    num: "02 // SOFTWARE & SYSTEMS",
    title: "Custom Software & Business Systems",
    text: "Tailored software built precisely around your workflows to eliminate operational inefficiencies.",
    items: [
      "Business Management Systems & Admin Dashboards",
      "Customer Portals & CRM-style Systems",
      "Employee Management Systems",
      "Mobile Applications",
      "Custom APIs & Database-Driven Apps",
    ],
  },
  {
    num: "03 // AI & AUTOMATION",
    title: "AI Solutions & Workflow Automation",
    text: "Save time by automating repetitive tasks and deliver faster, smarter experiences to your customers using AI.",
    items: [
      "AI Chatbots & Virtual Assistants",
      "Workflow & Business Automation",
      "Document & Data Processing",
      "AI Features inside Web & Mobile Apps",
    ],
  },
  {
    num: "04 // PRODUCT DEVELOPMENT",
    title: "Product Planning, MVP & Management",
    text: "The complete journey from an idea to a production-ready product, spanning research, planning, launch, and continuous improvement.",
    items: [
      "Requirement Analysis & Product Research",
      "MVP Development & Feature Planning",
      "Product Roadmap & User Experience",
      "Development Coordination & Ongoing Management",
    ],
  },
  {
    num: "05 // ACADEMIC PROJECTS",
    title: "College & Final-Year Projects",
    text: "Advanced, high-impact technical projects for students, backed by proper documentation and comprehensive guidance.",
    items: [
      "Full-Stack Project Engineering",
      "Web, App & AI-based Project Ideas",
      "Documentation & Architecture Diagrams",
      "Setup, Demo & Explanation Support",
    ],
  },
  {
    num: "06 // BRANDING & DESIGN",
    title: "Brand Identity & Unique UI/UX",
    text: "Creative branding and unique design systems to help you stand out in the market and build strong brand positioning.",
    items: [
      "Brand Strategy, Logo & Tagline Design",
      "Unique Custom UI/UX Interface Design",
      "Visual Identity & Digital Assets",
      "Brand Positioning & Guidelines",
    ],
  },
  {
    num: "07 // SEO & VISIBILITY",
    title: "SEO & Digital Presence",
    text: "Comprehensive SEO strategies to reach your target audience and maximize visibility across search engines.",
    items: [
      "Technical & On-Page SEO",
      "Local SEO & Google Business Profile",
      "Keyword Research & Blog / Content Strategy",
      "Schema Implementation & Analytics",
      "SEO-friendly Website Structure",
    ],
  },
  {
    num: "08 // GROWTH & MARKETING",
    title: "Digital Marketing & Strategy",
    text: "Technology provides the foundation, while marketing drives attention. Scale your business with targeted campaigns.",
    items: [
      "Digital Marketing Strategy & Campaign Planning",
      "Social Media Presence & Content Strategy",
      "Lead Generation & Conversion Funnels",
      "Brand Positioning & Online Customer Acquisition",
    ],
  },
];

const aiUseCases = [
  {
    title: "AI Chatbots & Assistants",
    text: "Instant responses to customer queries on websites or messaging channels based on your own business data.",
  },
  {
    title: "Workflow Automation",
    text: "Automate repetitive tasks like lead follow-ups, status notifications, reports, and invoices effortlessly.",
  },
  {
    title: "Document & Data Processing",
    text: "Extract, sort, and populate information directly into your systems from PDFs, forms, and emails.",
  },
  {
    title: "Insights & Dashboards",
    text: "Transform complex business data into simple dashboards and summaries for fast, clear decision-making.",
  },
  {
    title: "AI Inside Your Product",
    text: "Integrate intelligent features like smart search, recommendations, and auto-summaries into your apps.",
  },
  {
    title: "AI-assisted SEO & Content",
    text: "Accelerate keyword research and content drafting, fine-tuned with expert human editing for final quality.",
  },
];

const auditQuestions = [
  { title: "Where are the inefficiencies?", text: "Identifying areas consuming excessive time, money, and manual effort." },
  { title: "What can be automated?", text: "Pinpointing manual tasks that software or AI can handle automatically." },
  { title: "Which technology is missing?", text: "Determining the essential tools and systems needed to reach the next level." },
  { title: "Where are customers dropping off?", text: "Finding bottlenecks across your website, enquiries, or follow-up funnels." },
  { title: "Where is digital presence weak?", text: "Highlighting visibility gaps across search, social, Google profiles, and websites." },
  { title: "What is needed for future growth?", text: "Deploying technologies and processes designed to scale alongside your business." },
];

const audience = [
  {
    title: "Startups & Founders",
    text: "Transforming ideas into robust MVPs and products without unnecessary expenses.",
  },
  {
    title: "Growing Businesses",
    text: "Aligning websites, internal systems, and marketing campaigns to scale to the next level.",
  },
  {
    title: "Corporate Teams",
    text: "Developing internal tools, dashboards, portals, and automation to streamline operations.",
  },
  {
    title: "Students",
    text: "Engineering properly structured, fully documented technical projects for college and final years.",
  },
];

const flow = [
  { title: "Idea", text: "Clarifying core concepts and project goals." },
  { title: "Research", text: "Understanding the market, users, and competition." },
  { title: "Planning", text: "Finalizing project scope, features, and roadmaps." },
  { title: "Design", text: "Crafting intuitive UX flows and stunning UI designs." },
  { title: "Development", text: "Building robust products with clean, scalable code." },
  { title: "Launch", text: "Deploying live after thorough testing and quality checks." },
  { title: "Improvement", text: "Continuously optimizing based on real-world data." },
];

const whyPoints = [
  "Business-first mindset: solving problems before choosing tech",
  "Web, software, AI, SEO, and marketing all under one roof",
  "100% custom solutions with zero cookie-cutter templates",
  "Crystal-clear communication and practical, scalable execution",
];

const faqs = [
  {
    q: "Does Crespon only build websites?",
    a: "No. Websites are just one piece of the puzzle. We also build custom software, AI and automation systems, handle product development, branding, SEO, and digital marketing, treating your business as a complete ecosystem.",
  },
  {
    q: "How can AI benefit my business?",
    a: "Common use cases include customer support chatbots, workflow automation, document data extraction, and business insights. We first evaluate if AI adds genuine value to your specific case before recommending implementation.",
  },
  {
    q: "What is included in college or final-year projects?",
    a: "You get a custom full-stack project tailored to your requirements, complete with documentation, architecture diagrams, and setup or demo guidance so you can easily understand and present your work.",
  },
  {
    q: "How does a project begin?",
    a: "It starts with a contact form or message. We understand your requirements, share a detailed scope and plan, and once approved, proceed directly into design and development.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes. We offer continuous website management, maintenance, updates, performance optimization, and ongoing product management services.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
  return (
    <div className="services-wrapper">
      {/* Custom Interactive Cursor */}
      <CustomCursor />

      {/* Navbar */}
      <Navbar />

      <main className="services-page">
        {/* ============ HERO ============ */}
        <section className="srv-hero">
          <div className="srv-container srv-hero-grid">
            <div className="srv-hero-text">
              <span className="srv-tag">// CRESPON CAPABILITIES & SOLUTIONS</span>
              <RevealText text="Problem Solvers First. Tech Architects Second." className="srv-title" />
              <FadeIn delay={0.3}>
                <p className="srv-lead">
                  Crespon = Cresco (grow) + Pons (bridge), serving as your bridge to growth. Our mission goes
                  beyond writing code. We first understand your business or academic challenges, then deliver 100%
                  custom, scalable digital solutions aligned with your unique needs.
                </p>
                <div className="srv-hero-actions">
                  <Magnetic>
                    <a href="/#contact" className="btn btn--gold">
                      Start a Project
                    </a>
                  </Magnetic>
                  <a href="#services" className="srv-btn-ghost">
                    Explore Services
                  </a>
                </div>
                <ul className="srv-chips" aria-label="Crespon service areas">
                  {heroChips.map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            <FadeIn delay={0.2}>
              <figure className="srv-media">
                <Image
                  src="/services-hero.svg"
                  alt="Crespon at the center connected to six services"
                  width={440}
                  height={330}
                  priority
                  unoptimized
                  className="srv-img"
                />
              </figure>
            </FadeIn>
          </div>
        </section>

        {/* ============ APPROACH ============ */}
        <section className="srv-section">
          <div className="srv-container">
            <FadeIn>
              <div className="srv-section-header">
                <span className="srv-tag">// THE CRESPON APPROACH</span>
                <h2>Understand → Build → Connect → Grow</h2>
                <p>
                  Every business and project is unique. That is why we never use generic templates or cookie-cutter
                  code. We analyze your goals, pain points, and constraints to build custom strategies that drive real
                  growth.
                </p>
              </div>
            </FadeIn>

            <div className="srv-steps">
              {approach.map((item, i) => (
                <FadeIn key={item.step} delay={0.1 * (i + 1)}>
                  <div className="srv-step">
                    <span className="srv-step-num">{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ============ BRIDGE ============ */}
        <section className="srv-section">
          <div className="srv-container">
            <div className="srv-split">
              <FadeIn>
                <div className="srv-split-text">
                  <span className="srv-tag">// THE BRIDGE TO GROWTH</span>
                  <h2 className="srv-h2">
                    Bridging Problems to Solutions.
                    <span className="srv-h2-accent">Bridging Business to Growth.</span>
                  </h2>
                  <p className="srv-body">
                    Every business holds immense potential, but many lack the right technology, digital presence,
                    product strategy, or systems. Crespon bridges that exact gap.
                  </p>
                  <ul className="srv-pairs">
                    {bridgePairs.map((p) => (
                      <li key={p.from} className="srv-pair">
                        <span>{p.from}</span>
                        <i aria-hidden="true">→</i>
                        <b>{p.to}</b>
                      </li>
                    ))}
                  </ul>
                  <blockquote className="srv-promise">
                    We bridge the gap between business potential and business growth through technology, digital
                    solutions, and strategic execution.
                  </blockquote>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <figure className="srv-media">
                  <Image
                    src="/bridge.svg"
                    alt="A bridge connecting where you are today with where you want to grow"
                    width={440}
                    height={330}
                    unoptimized
                    className="srv-img"
                  />
                </figure>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ============ SERVICES GRID ============ */}
        <section className="srv-section" id="services">
          <div className="srv-container">
            <FadeIn>
              <div className="srv-section-header">
                <h2>
                  Our Complete <span>Service Ecosystem</span>
                </h2>
                <p>
                  From strategic branding and AI automation to college-level engineering and robust enterprise
                  software, everything under one roof.
                </p>
              </div>
            </FadeIn>

            <div className="srv-grid">
              {services.map((s, i) => (
                <FadeIn key={s.num} delay={0.05 * ((i % 2) + 1)}>
                  <article className="srv-card">
                    <span className="srv-card-num">{s.num}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <ul className="srv-features-list">
                      {s.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ============ AI SECTION ============ */}
        <section className="srv-section" id="ai">
          <div className="srv-container">
            <div className="srv-split srv-split--reverse">
              <FadeIn>
                <div className="srv-split-text">
                  <span className="srv-tag">// AI & AUTOMATION</span>
                  <h2 className="srv-h2">
                    AI that drives real business value.
                    <span className="srv-h2-accent">Not just a buzzword.</span>
                  </h2>
                  <p className="srv-body">
                    We integrate AI seamlessly into your existing workflows to extract actionable insights from
                    enquiries, documents, and data, saving time and costs through smart automation and chatbots.
                  </p>

                  <div className="srv-ai-grid">
                    {aiUseCases.map((u) => (
                      <div key={u.title} className="srv-ai-item">
                        <h4>{u.title}</h4>
                        <p>{u.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="srv-callout">
                    <strong>Human in the loop</strong>
                    <p>
                      Every AI workflow includes a human review step. You retain full control over critical
                      decisions, customer-facing replies, and data privacy.
                    </p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <figure className="srv-media srv-media--sky">
                  <Image
                    src="/ai-workflow.svg"
                    alt="Business inputs flow through an AI layer"
                    width={440}
                    height={330}
                    unoptimized
                    className="srv-img"
                  />
                </figure>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ============ BUSINESS TECHNOLOGY AUDIT ============ */}
        <section className="srv-section">
          <div className="srv-container">
            <FadeIn>
              <div className="srv-section-header">
                <span className="srv-tag">// BUSINESS TECHNOLOGY & MANAGEMENT</span>
                <h2>
                  Viewing your entire business as a <span>complete system</span>
                </h2>
                <p>
                  Instead of treating requirements as isolated services, we analyze your complete business operations
                  first and develop targeted solutions accordingly.
                </p>
              </div>
            </FadeIn>

            <div className="srv-audit">
              {auditQuestions.map((q, i) => (
                <FadeIn key={q.title} delay={0.05 * ((i % 3) + 1)}>
                  <div className="srv-audit-item">
                    <h4>{q.title}</h4>
                    <p>{q.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ============ WHO WE WORK WITH ============ */}
        <section className="srv-section">
          <div className="srv-container">
            <FadeIn>
              <div className="srv-section-header">
                <h2>
                  Who We <span>Work With</span>
                </h2>
                <p>From early-stage ideas to established enterprises, we support you at every stage.</p>
              </div>
            </FadeIn>

            <div className="srv-audience">
              {audience.map((a, i) => (
                <FadeIn key={a.title} delay={0.05 * (i + 1)}>
                  <div className="srv-audience-item">
                    <h3>{a.title}</h3>
                    <p>{a.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PROCESS ============ */}
        <section className="srv-section">
          <div className="srv-container">
            <FadeIn>
              <div className="srv-section-header">
                <span className="srv-tag">// FROM IDEA TO IMPACT</span>
                <h2>
                  Our <span>Product Journey</span>
                </h2>
                <p>A clear, transparent, and step-by-step process from concept to working product.</p>
              </div>
            </FadeIn>

            <ol className="srv-flow">
              {flow.map((f, i) => (
                <li key={f.title} className="srv-flow-step">
                  <FadeIn delay={0.05 * (i + 1)}>
                    <div className="srv-flow-card">
                      <span className="srv-flow-num">{String(i + 1).padStart(2, "0")}</span>
                      <h3>{f.title}</h3>
                      <p>{f.text}</p>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ WHY CRESPON ============ */}
        <section className="srv-section">
          <div className="srv-container">
            <FadeIn>
              <div className="srv-why-box">
                <div className="srv-why-content">
                  <span className="srv-tag">// WHY CRESPON</span>
                  <h2>
                    More than a service provider, <span>your growth partner.</span>
                  </h2>
                  <p>
                    We identify operational inefficiencies, build missing technologies, and connect offline processes
                    online to turn your potential into real growth.
                  </p>
                  <ul className="srv-why-points">
                    {whyPoints.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="srv-why-stats">
                  <div className="srv-stat-item">
                    <b>100%</b>
                    <span>Custom Tailored</span>
                  </div>
                  <div className="srv-stat-item">
                    <b>360°</b>
                    <span>Problem Solving</span>
                  </div>
                  <div className="srv-stat-item">
                    <b>1 Team</b>
                    <span>Idea to Growth</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="srv-section">
          <div className="srv-container">
            <FadeIn>
              <div className="srv-section-header">
                <h2>
                  Frequently Asked <span>Questions</span>
                </h2>
              </div>
            </FadeIn>

            <div className="srv-faq">
              {faqs.map((f) => (
                <details key={f.q} className="srv-faq-item">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="srv-cta-section">
          <div className="srv-container">
            <FadeIn>
              <div className="srv-cta-box">
                <h2>Have a Unique Problem or Project?</h2>
                <p>Let’s discuss your exact requirements and craft an exceptional solution together.</p>
                <div className="srv-cta-btn">
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

      {/* Footer wrapper fixed for proper positioning */}
      <footer className="srv-footer-slot">
        <Footer />
      </footer>
    </div>
  );
}