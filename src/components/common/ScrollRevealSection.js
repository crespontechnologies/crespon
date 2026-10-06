'use client';

import { useEffect, useRef, useState } from 'react';
import './ScrollReveal.css';

export default function ScrollRevealSection() {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger when the component enters viewport
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      { threshold: 0.15 } // Triggers when 15% of the component is visible
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="scroll-reveal-wrap">
      <div 
        ref={domRef} 
        className={`scroll-reveal-container ${isVisible ? 'is-visible' : ''}`}
      >
        
        <div className="scroll-reveal-header">
          <span className="scroll-reveal-tag">// SCROLL ACTIVATED MODULE</span>
          <h2>Engineered for <span>High Performance</span></h2>
        </div>

        <div className="scroll-features-grid">
          
          <div className="scroll-feature-card">
            <span className="feature-num">01 // SPEED</span>
            <h3>Lightning Fast Core</h3>
            <p>Optimized Next.js architecture ensuring sub-second page loads and seamless routing.</p>
          </div>

          <div className="scroll-feature-card">
            <span className="feature-num">02 // DESIGN</span>
            <h3>Immersive UI/UX</h3>
            <p>Dark-themed futuristic glassmorphism built with precise CSS animations and custom micro-interactions.</p>
          </div>

          <div className="scroll-feature-card">
            <span className="feature-num">03 // CONVERSION</span>
            <h3>WhatsApp & Leads</h3>
            <p>Direct integration with instant messaging funnels to turn casual visitors into active clients.</p>
          </div>

        </div>

      </div>
    </section>
  );
}