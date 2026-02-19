import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, Sparkles, Scissors } from 'lucide-react';
import { salonConfig } from '../config/salonConfig';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Heart,
    text: 'Consultation-first approach',
  },
  {
    icon: Sparkles,
    text: 'Healthy-hair practices',
  },
  {
    icon: Scissors,
    text: 'Finish + styling lesson',
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image card animation
      gsap.fromTo(imageRef.current,
        { x: '-8vw', opacity: 0, scale: 0.98 },
        {
          x: 0, opacity: 1, scale: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 35%',
            scrub: true,
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0, opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 40%',
            scrub: true,
          }
        }
      );

      // Divider line
      gsap.fromTo(dividerRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 45%',
            scrub: true,
          }
        }
      );

      // Highlights stagger
      const highlightItems = highlightsRef.current?.querySelectorAll('.highlight-item');
      if (highlightItems) {
        gsap.fromTo(highlightItems,
          { y: 12, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
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
      id="experience"
      className="relative bg-black py-24 lg:py-32 z-50"
    >
      {/* Logo Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-5">
        <img
          src={salonConfig.logo.main}
          alt=""
          className="w-[35vw] max-w-[450px] h-auto"
        />
      </div>

      <div className="w-full px-6 lg:px-[6vw] relative z-10">
        <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          {/* Image Card */}
          <div
            ref={imageRef}
            className="relative w-full lg:w-[46vw] aspect-[4/3] rounded-2xl overflow-hidden shadow-card animate-float"
          >
            <img
              src="/experience_interior.jpg"
              alt="Salon Experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border border-gold/20 rounded-2xl pointer-events-none" />
            
            {/* Caption */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-mono text-xs tracking-[0.12em] text-gold">
                THE TWO BLESSED HANDS EXPERIENCE
              </span>
            </div>
          </div>

          {/* Vertical Divider */}
          <div
            ref={dividerRef}
            className="hidden lg:block absolute left-[52%] top-[10%] w-px h-[80%] bg-cream/10"
            style={{ transform: 'scaleY(0)' }}
          />

          {/* Content */}
          <div
            ref={contentRef}
            className="w-full lg:w-[38vw] lg:ml-auto lg:pl-8"
          >
            <h2
              className="font-heading font-bold text-cream leading-tight tracking-tight mb-6"
              style={{ fontSize: 'clamp(32px, 3.2vw, 52px)' }}
            >
              The <span className="text-gold">experience</span>
            </h2>

            <p className="text-cream/70 text-base lg:text-lg leading-relaxed mb-8">
              We start with a consultation, build a plan around your goals, and finish with styling you can recreate at home. No rush—just honest advice and clean execution.
            </p>

            {/* Highlights */}
            <div ref={highlightsRef} className="space-y-4 mb-8">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="highlight-item flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-cream/80">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={salonConfig.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2 inline-flex"
            >
              Book your visit
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
