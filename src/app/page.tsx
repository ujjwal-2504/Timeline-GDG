"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Timeline from "@/components/Timeline";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import gsap from "gsap";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Wait for all components to mount and render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen font-ProductSans">
      <Navbar />
      <div id="hero-wrapper">
        <HeroSection />
      </div>
      <div id="timeline-wrapper">
        <Timeline />
      </div>
      <Footer />
    </main>
  );
}
