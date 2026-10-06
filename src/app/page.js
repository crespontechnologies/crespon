"use client";

import { useState } from "react";
import Navbar from '@/components/Navbar';
import Hero from '@/components/hero/Hero';
// import ScrollRevealSection from '@/components/common/ScrollRevealSection';
// import SEOWorkCase from '@/components/work/SEOWorkCase';
import Preloader from '@/components/common/Preloader';
import CustomCursor from '@/components/common/CustomCursor';
import Footer from '@/components/footer/Footer';
import HeroModal from '@/components/hero/HeroModal'; // Sahi path yahan update kar diya hai

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <main>
      <Navbar onOpenModal={handleOpenModal} />
      <Preloader />
      <Hero onOpenModal={handleOpenModal} />
      {/* <ScrollRevealSection /> */}
      {/* <SEOWorkCase /> */}
      <CustomCursor />
      {/* <Footer onOpenModal={handleOpenModal} /> */}

      {/* Hero Modal Component */}
      <HeroModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}