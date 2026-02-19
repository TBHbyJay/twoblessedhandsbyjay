import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { salonConfig } from '../config/salonConfig';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const logoWatermarkRef = useRef<HTMLDivElement>(null);

  // Load animation (on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background image
      tl.fromTo(imageRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.1 }
      );

      // Logo watermark
      tl.fromTo(logoWatermarkRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2 },
        0.2
      );

      // Overlay
      tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        0.2
      );

      // Headline words
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.06 },
          0.4
        );
      }

      // Body + CTAs
      tl.fromTo(bodyRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.7
      );

      tl.fromTo(ctaRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.8
      );

      // Scroll cue line
      const scrollLine = scrollCueRef.current?.querySelector('.line');
      if (scrollLine) {
        tl.fromTo(scrollLine,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, transformOrigin: 'left' },
          1
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, bodyRef.current, ctaRef.current], {
              opacity: 1, x: 0, y: 0
            });
            gsap.set(imageRef.current, { scale: 1, x: 0 });
            gsap.set(logoWatermarkRef.current, { opacity: 1, scale: 1 });
          }
        }
      });

      // Phase 1 (0-30%): Scroll cue animation only
      const scrollLineEl = scrollCueRef.current?.querySelector('.line');
      if (scrollLineEl) {
        scrollTl.fromTo(scrollLineEl,
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: 'left', ease: 'none' },
          0
        );
      }

      // Phase 3 (70-100%): Exit animations
      // Headline exits left
      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Body + CTAs exit up
      scrollTl.fromTo([bodyRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Background scales and moves
      scrollTl.fromTo(imageRef.current,
        { scale: 1, x: 0 },
        { scale: 1.08, x: '6vw', ease: 'none' },
        0.70
      );

      // Logo watermark fades and scales
      scrollTl.fromTo(logoWatermarkRef.current,
        { opacity: 0.15, scale: 1 },
        { opacity: 0, scale: 1.1, ease: 'power2.in' },
        0.70
      );

      // Scroll cue fades
      scrollTl.fromTo(scrollCueRef.current,
        { opacity: 1 },
        { opacity: 0 },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_salon_portrait.jpg"
          alt="Two Blessed Hands Salon"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo Watermark */}
      <div
        ref={logoWatermarkRef}
        className="absolute right-[5vw] top-1/2 -translate-y-1/2 pointer-events-none z-[5]"
        style={{ opacity: 0 }}
      >
        <img
          src={salonConfig.logo.main}
          alt=""
          className="w-[35vw] max-w-[500px] h-auto opacity-15"
        />
      </div>

      {/* Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 gradient-left"
        style={{ opacity: 0 }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-[6vw]"
      >
        <div className="max-w-[42vw] lg:max-w-xl">
          {/* Logo */}
          <div className="mb-6">
            <img
              src={salonConfig.logo.main}
              alt="Two Blessed Hands"
              className="h-20 w-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Micro Label */}
          <span className="micro-label mb-4 block">
            TWO BLESSED HANDS
          </span>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-heading font-bold text-cream leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 76px)' }}
          >
            <span className="word inline-block">Signature</span>{' '}
            <span className="word inline-block">cuts</span>
            <br />
            <span className="word inline-block">that</span>{' '}
            <span className="word inline-block">fit</span>{' '}
            <span className="word inline-block text-gold">you.</span>
          </h1>

          {/* Body */}
          <div ref={bodyRef} style={{ opacity: 0 }}>
            <p className="text-cream/70 text-base lg:text-lg leading-relaxed max-w-md mb-8">
              Personalized cuts, crisp lines, and easy maintenance—designed for your everyday life.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <a
              href={salonConfig.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              Book appointment
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToServices}
              className="btn-secondary"
            >
              View services
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Cue */}
      <div
        ref={scrollCueRef}
        className="absolute right-[4vw] bottom-[4vh] flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs tracking-[0.12em] text-cream/50">SCROLL</span>
        <div className="line w-12 h-px bg-cream/30" style={{ transform: 'scaleX(0)' }} />
        <ChevronDown className="w-4 h-4 text-cream/50 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
