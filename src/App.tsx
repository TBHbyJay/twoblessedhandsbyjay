import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import ColorSection from './sections/ColorSection';
import StylingSection from './sections/StylingSection';
import HairSystemsSection from './sections/HairSystemsSection';
import ExperienceSection from './sections/ExperienceSection';
import ServicesSection from './sections/ServicesSection';
import BeforeAfterSection from './sections/BeforeAfterSection';
import BookingSection from './sections/BookingSection';
import Footer from './sections/Footer';
import SpecialsBanner from './sections/SpecialsBanner';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-black min-h-screen">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Specials Banner - Rotating offers */}
      <SpecialsBanner />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        {/* Section 1: Hero - Signature Cuts */}
        <HeroSection />
        
        {/* Section 2: Color Craft */}
        <ColorSection />
        
        {/* Section 3: Styling & Finish */}
        <StylingSection />
        
        {/* Section 4: Hair Systems */}
        <HairSystemsSection />
        
        {/* Section 5: The Experience */}
        <ExperienceSection />
        
        {/* Section 6: Services Menu */}
        <ServicesSection />
        
        {/* Section 7: Before & After */}
        <BeforeAfterSection />
        
        {/* Section 8: Book Your Visit */}
        <BookingSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
