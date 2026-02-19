import { MapPin, Phone, Clock, Instagram, Mail } from 'lucide-react';
import { salonConfig } from '../config/salonConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Format hours for display
  const hoursList = [
    { day: 'Sun', hours: salonConfig.hours.sunday },
    { day: 'Mon', hours: salonConfig.hours.monday },
    { day: 'Tue', hours: salonConfig.hours.tuesday },
    { day: 'Wed', hours: salonConfig.hours.wednesday },
    { day: 'Thu', hours: salonConfig.hours.thursday },
    { day: 'Fri', hours: salonConfig.hours.friday },
    { day: 'Sat', hours: salonConfig.hours.saturday },
  ];

  return (
    <footer className="relative bg-black border-t border-cream/10 z-50">
      <div className="w-full px-6 lg:px-[6vw] py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={salonConfig.logo.main}
                alt="Two Blessed Hands"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-cream/60 text-sm leading-relaxed mb-6">
              {salonConfig.tagline} Your trusted salon for personalized hair services and non-surgical hair replacement.
            </p>
            <div className="flex gap-3">
              <a
                href={salonConfig.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-cream/20 rounded-full text-cream hover:text-gold hover:border-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-cream mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Services', id: 'services' },
                { label: 'Gallery', id: 'gallery' },
                { label: 'About Us', id: 'experience' },
                { label: 'Book Now', id: 'booking' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-cream/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-cream mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                'Haircuts & Styling',
                'Color Services',
                'Hair Treatments',
                'Hair Systems',
                'Event Styling',
              ].map((service) => (
                <li key={service}>
                  <a
                    href={salonConfig.booking.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/60 hover:text-gold transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-cream mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <span className="text-cream/60 text-sm">
                  {salonConfig.address.street}, {salonConfig.address.suite}
                  <br />
                  {salonConfig.address.city}, {salonConfig.address.state} {salonConfig.address.zip}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href={salonConfig.phone.href}
                  className="text-cream/60 hover:text-gold transition-colors text-sm"
                >
                  {salonConfig.phone.display}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                <div className="text-cream/60 text-xs space-y-0.5">
                  {hoursList.map((item) => (
                    <div key={item.day} className="flex justify-between gap-4 min-w-[140px]">
                      <span className={item.hours === 'CLOSED' ? 'text-cream/40' : ''}>{item.day}</span>
                      <span className={item.hours === 'CLOSED' ? 'text-cream/40' : ''}>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href={`mailto:${salonConfig.email}`}
                  className="text-cream/60 hover:text-gold transition-colors text-sm"
                >
                  {salonConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-sm">
            {currentYear} {salonConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-cream/40 hover:text-gold transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-cream/40 hover:text-gold transition-colors text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
