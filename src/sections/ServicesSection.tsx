import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, ChevronUp, Scissors, Palette, Sparkles } from 'lucide-react';
import { salonConfig } from '../config/salonConfig';

gsap.registerPlugin(ScrollTrigger);

const serviceCategories = [
  {
    id: 'cuts',
    title: 'Cuts & Styling',
    icon: Scissors,
    services: [
      { name: 'Women\'s Custom Haircut', description: 'Personalized cut tailored to your face shape and lifestyle' },
      { name: 'Precision Trim', description: 'Maintenance trim to remove split ends while preserving length' },
      { name: 'Blowout & Style', description: 'Professional wash and blow-dry with polished finish' },
      { name: 'Flat Iron / Silk Press', description: 'Sleek straightening for shine and smoothness' },
      { name: 'Soft Waves / Curls', description: 'Defined or relaxed waves for modern finish' },
      { name: 'Updos & Event Styling', description: 'Elegant styles for weddings and special occasions' },
    ],
  },
  {
    id: 'color',
    title: 'Color Services',
    icon: Palette,
    services: [
      { name: 'Full Color', description: 'Complete color transformation from roots to ends' },
      { name: 'Root Touch-Up', description: 'Targeted color for seamless new growth coverage' },
      { name: 'Partial Highlights', description: 'Strategic highlights for dimension and brightness' },
      { name: 'Full Highlights', description: 'Full-head highlighting for luminous color' },
      { name: 'Balayage', description: 'Hand-painted technique for natural, blended results' },
      { name: 'Gloss / Toner', description: 'Color refining to neutralize tones and enhance shine' },
      { name: 'Color Correction', description: 'Advanced corrective service to restore balance' },
    ],
  },
  {
    id: 'treatments',
    title: 'Treatments & Systems',
    icon: Sparkles,
    services: [
      { name: 'Deep Conditioning', description: 'Intensive moisture treatment for hydration and shine' },
      { name: 'Hair Repair Treatment', description: 'Strengthening service for improved elasticity' },
      { name: 'Frizz Control Treatment', description: 'Smoothing service for enhanced manageability' },
      { name: 'Relaxer Service', description: 'Professional chemical straightening with scalp protection' },
      { name: 'Olaplex Hair Repair', description: 'Bond-building treatment to reduce breakage' },
      { name: 'Hair Systems Consultation', description: 'Non-surgical hair replacement evaluation' },
      { name: 'Hair System Maintenance', description: 'Removal, cleaning, re-bonding, and styling' },
    ],
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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

      // Columns stagger
      const columns = columnsRef.current?.querySelectorAll('.service-column');
      if (columns) {
        gsap.fromTo(columns,
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 40%',
              scrub: true,
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-ivory py-24 lg:py-32 z-50"
    >
      {/* Logo Watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-5">
        <img
          src={salonConfig.logo.main}
          alt=""
          className="w-[40vw] max-w-[500px] h-auto"
        />
      </div>

      <div className="w-full px-6 lg:px-[6vw] relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 lg:mb-16">
          <h2
            className="font-heading font-bold text-black leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(32px, 3.2vw, 52px)' }}
          >
            Services
          </h2>
          <div className="w-24 h-1 bg-gold" />
        </div>

        {/* Service Columns */}
        <div
          ref={columnsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {serviceCategories.map((category) => (
            <div
              key={category.id}
              className="service-column"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-4 bg-black/5 rounded-xl hover:bg-black/10 transition-colors mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-heading font-semibold text-black text-lg">
                    {category.title}
                  </h3>
                </div>
                {expandedCategory === category.id ? (
                  <ChevronUp className="w-5 h-5 text-black/50" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-black/50" />
                )}
              </button>

              {/* Services List */}
              <div
                className={`space-y-3 overflow-hidden transition-all duration-300 ${
                  expandedCategory === category.id || expandedCategory === null
                    ? 'max-h-[2000px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                {category.services.map((service, index) => (
                  <div
                    key={index}
                    className="group flex items-start justify-between p-3 rounded-lg hover:bg-black/5 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium text-black group-hover:text-gold-dark transition-colors">
                        {service.name}
                      </h4>
                      <p className="text-sm text-black/60 mt-1">
                        {service.description}
                      </p>
                    </div>
                    <a
                      href={salonConfig.booking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-4"
                    >
                      Book
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 lg:mt-16 text-center">
          <a
            href={salonConfig.booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-black font-semibold rounded-full hover:bg-gold-dark transition-colors"
          >
            Book appointment
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
