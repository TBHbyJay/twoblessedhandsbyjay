import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { salonConfig } from '../config/salonConfig';

gsap.registerPlugin(ScrollTrigger);

const ColorSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const logoWatermarkRef = useRef<HTMLDivElement>(null);

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
        }
      });

      // Phase 1 (0-30%): ENTRANCE
      // Background enters
      scrollTl.fromTo(imageRef.current,
        { scale: 1.10, x: '-8vw', opacity: 0.6 },
        { scale: 1, x: 0, opacity: 1, ease: 'none' },
        0
      );

      // Logo watermark
      scrollTl.fromTo(logoWatermarkRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, ease: 'none' },
        0.05
      );

      // Overlay fades in
      scrollTl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0
      );

      // Headline enters from right
      scrollTl.fromTo(headlineRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Body + CTAs enter from bottom
      scrollTl.fromTo(bodyRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(ctaRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // Scroll cue
      const scrollLineEl = scrollCueRef.current?.querySelector('.line');
      if (scrollLineEl) {
        scrollTl.fromTo(scrollLineEl,
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: 'left', ease: 'none' },
          0.1
        );
      }

      // Phase 3 (70-100%): EXIT
      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo([bodyRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(imageRef.current,
        { scale: 1, x: 0 },
        { scale: 1.08, x: '-6vw', ease: 'none' },
        0.70
      );

      scrollTl.fromTo(logoWatermarkRef.current,
        { opacity: 0.12, scale: 1 },
        { opacity: 0, scale: 1.1, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(scrollCueRef.current,
        { opacity: 1 },
        { opacity: 0 },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="color"
      className="section-pinned z-20"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={`${import.meta.env.BASE_URL}color_process_closeup.jpg`}
          alt="Hair Color Services"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo Watermark - Left side */}
      <div
        ref={logoWatermarkRef}
        className="absolute left-[3vw] top-1/2 -translate-y-1/2 pointer-events-none z-[5]"
      >
        <img
          src={salonConfig.logo.main}
          alt=""
          className="w-[30vw] max-w-[400px] h-auto opacity-12"
        />
      </div>

      {/* Gradient Overlay - Right side */}
      <div
        ref={overlayRef}
        className="absolute inset-0 gradient-right"
      />

      {/* Content - Right aligned */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-center items-end px-6 lg:px-[6vw]"
      >
        <div className="max-w-[42vw] lg:max-w-xl text-right">
          {/* Micro Label */}
          <span className="micro-label mb-4 block">
            COLOR CRAFT
          </span>

          {/* Headline */}
          <h2
            ref={headlineRef}
            className="font-heading font-bold text-cream leading-[1.0] tracking-tight mb-6"
            style={{ fontSize: 'clamp(34px, 3.6vw, 56px)' }}
          >
            Rich color,
            <br />
            <span className="text-gold">healthy hair.</span>
          </h2>

          {/* Body */}
          <div ref={bodyRef}>
            <p className="text-cream/70 text-base lg:text-lg leading-relaxed max-w-md ml-auto mb-8">
              From root touch-ups to balayage and gloss—formulated for shine, softness, and longevity.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap justify-end gap-4">
            <a
              href={salonConfig.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              Book color service
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              See the menu
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Cue - Bottom left */}
      <div
        ref={scrollCueRef}
        className="absolute left-[4vw] bottom-[4vh] flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs tracking-[0.12em] text-cream/50">SCROLL</span>
        <div className="line w-12 h-px bg-cream/30" style={{ transform: 'scaleX(0)' }} />
        <ChevronDown className="w-4 h-4 text-cream/50 animate-bounce" />
      </div>
    </section>
  );
};

export default ColorSection;
