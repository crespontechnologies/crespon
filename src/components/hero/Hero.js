'use client';

import { useState, useCallback } from 'react';
import HeroHeader from './HeroHeader';
import HeroSlider from './HeroSlider';
import HeroShowcase from './HeroShowcase';
import HeroModal from './HeroModal';
import Footer from '../footer/Footer';
import BrandStory from './BrandStory';
import HeroMarketingSpotlight from './HeroMarketingSpotlight';
import ContactSection from '../contact/ContactSection';
import TechMarquee from './TechMarquee';
import TrustBadges from './TrustBadges';
import HeroCyberCommand from './HeroCyberCommand';
import SEOWorkCase from '../work/SEOWorkCase';
import './Hero.css';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <section className="hero-wrapper">
      {/* Decorative background layers */}
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-orb hero-orb--blue" />
        <span className="hero-orb hero-orb--indigo" />
        <span className="hero-orb hero-orb--gold" />
        <span className="hero-grid" />
      </div>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-container">
        <HeroHeader onOpenModal={openModal} />
        <BrandStory onOpenModal={openModal}/>
             <TechMarquee />
        <HeroSlider onOpenModal={openModal} />
        <HeroShowcase onOpenModal={openModal}/>
        <SEOWorkCase onOpenModal={openModal}/>
         <TrustBadges onOpenModal={openModal}/>

        <HeroMarketingSpotlight onOpenModal={openModal}/>
        <HeroCyberCommand onOpenModal={openModal}/>
        <ContactSection onOpenModal={openModal}/>
        <Footer onOpenModal={openModal}/>
      </div>

      <HeroModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}