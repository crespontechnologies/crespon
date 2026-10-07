import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://crespon.com"),
  title: {
    default: "Crespon Technologies | Bridging Businesses to Growth",
    template: "%s | Crespon Technologies",
  },
  description:
    "Crespon Technologies is a premier business technology and growth partner specializing in custom web engineering, full-stack software development, MVPs, e-commerce platforms, and aggressive SEO solutions.",
  keywords: [
    // 1 - 10: Brand & Core Identity
    "Crespon Technologies", "Crespon Tech", "Crespon Agency", "Crespon Software", "Crespon Web Development",
    "Bridging Businesses to Growth", "Crespon Digital", "Crespon Pune", "Crespon India", "Crespon Enterprise Solutions",
    // 11 - 25: Web & Frontend Engineering
    "Custom Web Development", "Full-Stack Web Development", "Next.js Development Agency", "React.js Experts", "Node.js Backend Development",
    "Enterprise Web Architecture", "Responsive Web Design", "UI/UX Design Agency", "Tailwind CSS Web Development", "JavaScript Development Services",
    "TypeScript Web Applications", "Single Page Applications", "Progressive Web Apps PWA", "Web Performance Optimization", "Headless CMS Development",
    // 26 - 40: Custom Software & Apps
    "Custom Software Development", "SaaS Product Development", "MVP Development Agency", "Startup MVP Builder", "Cloud Application Development",
    "API Development and Integration", "RESTful API Services", "GraphQL Development", "Database Management Systems", "PostgreSQL Development",
    "MongoDB Solutions", "MySQL Database Design", "Java Spring Boot Development", "Express.js Backend Services", "Cloud Native Applications",
    // 41 - 55: E-commerce & Digital Solutions
    "E-commerce Website Development", "Custom E-commerce Platforms", "Shopify Development Agency", "WooCommerce Customization", "Secure Payment Gateway Integration",
    "Razorpay Integration Services", "B2B E-commerce Portals", "B2C E-commerce Development", "Shopping Cart & Checkout Systems", "Product Catalog Management",
    "Online Store Development", "Digital Marketplace Solutions", "Conversion Rate Optimization CRO", "Web Application Security", "Scalable E-commerce Architecture",
    // 56 - 70: SEO & Visibility Services
    "SEO Services Pune", "Enterprise SEO Agency", "Technical SEO Optimization", "On-Page SEO Services", "Off-Page SEO Strategies",
    "Local SEO Optimization", "Google Business Profile Setup", "Keyword Research and Strategy", "Content Marketing Services", "Search Engine Visibility",
    "Organic Traffic Growth", "Website Speed Optimization for SEO", "Core Web Vitals Optimization", "Schema Markup Implementation", "SEO Audit Services",
    // 71 - 85: Digital Marketing & Growth
    "Digital Marketing Agency", "Growth Partner for Businesses", "Social Media Marketing", "Performance Marketing", "Lead Generation Strategies",
    "Brand Identity Design", "Logo Design and Branding", "Corporate Website Redesign", "Strategic Digital Solutions", "Business Automation Tools",
    "CRM Integration Services", "Zoho CRM Integration", "Cloud Deployment Services", "Vercel Hosting Optimization", "Hostinger Domain and DNS Setup",
    // 86 - 100: Location & Industry Specific
    "Web Development Company in Pune", "Software Agency in Maharashtra", "Best Tech Startup Partner India", "IT Solutions Company Pune", "Full-Stack Agency Pune",
    "Custom Software Company India", "Web Development Services near me", "Top IT Services Pune", "Affordable Web Agency India", "Enterprise Tech Partner",
    "Crespon Technologies Official", "Crespon Web Solutions", "Crespon Enterprise Architecture", "Crespon Digital Growth", "Crespon Software House"
  ],
  authors: [{ name: "Crespon Technologies", url: "https://crespon.com" }],
  creator: "Crespon Technologies",
  publisher: "Crespon Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crespon.com",
    title: "Crespon Technologies | Bridging Businesses to Growth",
    description:
      "Precision web engineering, advanced software, and strategic digital growth solutions for scaling enterprises.",
    siteName: "Crespon Technologies",
    images: [
      {
        url: "/cresponBG.png",
        width: 1200,
        height: 630,
        alt: "Crespon Technologies - Bridging Businesses to Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crespon Technologies | Bridging Businesses to Growth",
    description:
      "Precision web engineering, advanced software, and strategic digital growth solutions for scaling enterprises.",
    images: ["/cresponBG.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}