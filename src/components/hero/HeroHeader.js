'use client';

import Link from 'next/link';
import Image from 'next/image';
import './HeroHeader.css';

export default function HeroHeader({ onOpenModal }) {
  return (
    <div className="hero-header-wrap">
      <div className="hero-header-grid">
        
    <div className="hero-header-content">
      <div className="hero-tagline-badge">
        <span>Crespon Technologies</span> &bull; <strong>Bridging Businesses to Growth</strong>
      </div>
      <h1>
        Engineering Digital Platforms & <span className="text-grad-pro">Scaling Businesses</span>
      </h1>
      <p>
        We build high-performance web applications, robust custom software, and data-driven e-commerce portals designed to scale your enterprise and maximize market reach.
      </p>
      <div className="hero-btn-group">
        <button onClick={onOpenModal} className="btn-pro-pri">
          Get Consultation
        </button>
        <Link href="/services" className="btn-pro-sec">
          Explore Services
        </Link>
      </div>
    </div>

        {/* Right Animated Media Card */}
        <div className="hero-header-media">
          <Image 
            src="/heroimg.png" 
            alt="Crespon Enterprise Architecture" 
            fill 
            priority 
          />
          {/* <div className="hero-media-caption">
            <span>// system_active: secure_node</span>
            <div className="status-dot"></div>
          </div> */}
        </div>

      </div>
    </div>
  );
}