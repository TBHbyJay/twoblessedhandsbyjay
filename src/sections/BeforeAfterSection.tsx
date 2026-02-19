import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { salonConfig } from '../config/salonConfig';

gsap.registerPlugin(ScrollTrigger);

const transformations = [
  {
    id: 1,
    title: 'Color Refresh',
    subtitle: 'Balayage Transformation',
    image: '/beforeafter/color_refresh.png',
    description: 'From dull to dimensional with custom balayage highlights',
  },
  {
    id: 2,
    title: 'Silk Press Finish',
    subtitle: 'Smooth & Protected',
    image: '/beforeafter/silk_press.png',
    description: 'Frizz-free, shiny, and heat-protected finish',
  },
  {
    id: 3,
    title: 'Hair System Blend',
    subtitle: 'Natural Confidence',
    image: '/beforeafter/hair_system.png',
    description: 'Seamless non-surgical hair replacement',
  },
];

const BeforeAfterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );

      // Cards stagger
      const cards = cardsRef.current?.querySelectorAll('.transform-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 28, opacity: 0, scale: 0.985 },
          {
            y: 0, opacity: 1, scale: 1, stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 35%',
              scrub: true,
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative bg-black py-24 lg:py-32 z-50"
    >
      {/* Logo Watermark */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-5">
        <img
          src={salonConfig.logo.main}
          alt=""
          className="w-[35vw] max-w-[450px] h-auto"
        />
      </div>

      <div className="w-full px-6 lg:px-[6vw] relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <h2
            className="font-heading font-bold text-cream leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(32px, 3.2vw, 52px)' }}
          >
            Before <span className="text-gold">&</span> After
          </h2>
          <p className="text-cream/70 text-lg max-w-xl mx-auto">
            Real results. Healthy hair. Personalized plans.
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-4" />
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {transformations.map((item) => (
            <div
              key={item.id}
              className="transform-card group relative rounded-2xl overflow-hidden shadow-card cursor-pointer bg-black/40"
            >
              {/* Image - Full view without cropping */}
              <div className="w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Content Overlay */}
              <div className="bg-gradient-to-t from-black via-black/90 to-black/60 pt-6 pb-6 px-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs tracking-[0.12em] text-gold uppercase">
                    {item.subtitle}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-cream text-xl mb-1">
                  {item.title}
                </h3>
                <p className="text-cream/60 text-sm">
                  {item.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/50 rounded-2xl transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 lg:mt-16 text-center">
          <a
            href={salonConfig.booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary"
          >
            Start your transformation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
