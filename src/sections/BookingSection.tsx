import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, MapPin, Clock, Instagram } from 'lucide-react';
import { salonConfig } from '../config/salonConfig';

gsap.registerPlugin(ScrollTrigger);

const BookingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Background parallax
      gsap.fromTo(imageRef.current,
        { y: 0 },
        {
          y: '-4vh',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0, opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: true,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Format hours for display
  const hoursList = [
    { day: 'Sunday', hours: salonConfig.hours.sunday },
    { day: 'Monday', hours: salonConfig.hours.monday },
    { day: 'Tuesday', hours: salonConfig.hours.tuesday },
    { day: 'Wednesday', hours: salonConfig.hours.wednesday },
    { day: 'Thursday', hours: salonConfig.hours.thursday },
    { day: 'Friday', hours: salonConfig.hours.friday },
    { day: 'Saturday', hours: salonConfig.hours.saturday },
  ];

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative min-h-[80vh] flex items-center z-50"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src={`${import.meta.env.BASE_URL}closing_interior.jpg`}
          alt="Book Your Visit"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo Watermark */}
      <div className="absolute right-[5vw] top-1/2 -translate-y-1/2 pointer-events-none z-[5] opacity-10">
        <img
          src={salonConfig.logo.main}
          alt=""
          className="w-[30vw] max-w-[400px] h-auto"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 gradient-dark" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-[6vw] py-24">
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img
              src={salonConfig.logo.main}
              alt="Two Blessed Hands"
              className="h-24 w-auto object-contain drop-shadow-lg"
            />
          </div>

          <h2
            className="font-heading font-bold text-cream leading-tight tracking-tight mb-6"
            style={{ fontSize: 'clamp(36px, 4vw, 64px)' }}
          >
            Book your <span className="text-gold">visit</span>
          </h2>

          <p className="text-cream/70 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            New guests welcome. Walk-ins based on availability. Prefer to plan ahead? Book online.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href={salonConfig.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-lg"
            >
              Book online
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={salonConfig.phone.href}
              className="btn-secondary flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call {salonConfig.phone.display}
            </a>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {/* Address */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-cream/5 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gold" />
              </div>
              <div className="text-center">
                <span className="font-mono text-xs tracking-[0.12em] text-gold block mb-1">
                  LOCATION
                </span>
                <span className="text-cream/80 text-sm">
                  {salonConfig.address.street}
                  <br />
                  {salonConfig.address.suite}
                  <br />
                  {salonConfig.address.city}, {salonConfig.address.state} {salonConfig.address.zip}
                </span>
              </div>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-cream/5 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-gold" />
              </div>
              <div className="text-center">
                <span className="font-mono text-xs tracking-[0.12em] text-gold block mb-1">
                  HOURS
                </span>
                <div className="text-cream/80 text-xs space-y-0.5">
                  {hoursList.map((item) => (
                    <div key={item.day} className="flex justify-between gap-4">
                      <span className={item.hours === 'CLOSED' ? 'text-cream/50' : ''}>{item.day}</span>
                      <span className={item.hours === 'CLOSED' ? 'text-cream/50' : ''}>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-cream/5 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <div className="text-center">
                <span className="font-mono text-xs tracking-[0.12em] text-gold block mb-1">
                  CONTACT
                </span>
                <a
                  href={salonConfig.phone.href}
                  className="text-cream/80 text-sm hover:text-gold transition-colors"
                >
                  {salonConfig.phone.display}
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href={salonConfig.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 border border-cream/20 rounded-full text-cream hover:text-gold hover:border-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
