import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Phone, MapPin, Instagram } from 'lucide-react';
import { salonConfig } from '../config/salonConfig';

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.out' }
      );
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'About', id: 'experience' },
    { label: 'Book', id: 'booking' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <img
              src={salonConfig.logo.main}
              alt="Two Blessed Hands"
              className="h-14 w-auto object-contain drop-shadow-lg"
            />
            <span className="hidden sm:block font-heading font-bold text-cream text-sm tracking-wide group-hover:text-gold transition-colors">
              TWO BLESSED HANDS
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-mono text-xs tracking-[0.12em] uppercase text-cream/70 hover:text-gold transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Book Button & Menu */}
          <div className="flex items-center gap-4">
            <a
              href={salonConfig.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block btn-primary text-sm"
            >
              Book Now
            </a>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 text-cream hover:text-gold transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-black transition-transform duration-500 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-8">
          {/* Logo & Close button */}
          <div className="flex items-center justify-between">
            <img
              src={salonConfig.logo.main}
              alt="Two Blessed Hands"
              className="h-16 w-auto object-contain"
            />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-cream hover:text-gold transition-colors"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Menu Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="font-heading text-4xl font-bold text-cream hover:text-gold transition-colors text-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <a
              href={salonConfig.phone.href}
              className="flex items-center gap-3 text-cream/70 hover:text-gold transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-mono text-sm">{salonConfig.phone.display}</span>
            </a>
            <div className="flex items-start gap-3 text-cream/70">
              <MapPin className="w-5 h-5 mt-0.5" />
              <span className="font-mono text-sm">
                {salonConfig.address.street}, {salonConfig.address.suite}
              </span>
            </div>
            <div className="flex gap-4 pt-4">
              <a
                href={salonConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-cream/20 rounded-full text-cream hover:text-gold hover:border-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
