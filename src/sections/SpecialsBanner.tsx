import { useState, useEffect } from 'react';
import { Sparkles, X, Tag } from 'lucide-react';
import { salonConfig } from '../config/salonConfig';

interface Special {
  id: number;
  title: string;
  description: string;
  discount: string;
  code: string;
  month: number;
}

const specials: Special[] = [
  {
    id: 1,
    title: "New Year, New You",
    description: "Start the year fresh with any color service",
    discount: "20% OFF",
    code: "NEWYEAR20",
    month: 0,
  },
  {
    id: 2,
    title: "Valentine's Glow",
    description: "Blowout & style package for your special day",
    discount: "15% OFF",
    code: "LOVE15",
    month: 1,
  },
  {
    id: 3,
    title: "Spring Refresh",
    description: "Haircut + Deep conditioning treatment",
    discount: "$25 OFF",
    code: "SPRING25",
    month: 2,
  },
  {
    id: 4,
    title: "April Shine",
    description: "Silk press finish with any service",
    discount: "FREE",
    code: "SHINEAPR",
    month: 3,
  },
  {
    id: 5,
    title: "Mother's Day Special",
    description: "Bring mom for a duo styling session",
    discount: "30% OFF",
    code: "MOM30",
    month: 4,
  },
  {
    id: 6,
    title: "Summer Ready",
    description: "Full highlights + trim package",
    discount: "$40 OFF",
    code: "SUMMER40",
    month: 5,
  },
  {
    id: 7,
    title: "July Glam",
    description: "Event styling for your summer parties",
    discount: "20% OFF",
    code: "GLAM20",
    month: 6,
  },
  {
    id: 8,
    title: "Back to School",
    description: "Student haircut special with valid ID",
    discount: "25% OFF",
    code: "STUDENT25",
    month: 7,
  },
  {
    id: 9,
    title: "Fall Transformation",
    description: "Color correction + Olaplex treatment",
    discount: "$50 OFF",
    code: "FALL50",
    month: 8,
  },
  {
    id: 10,
    title: "October Glow",
    description: "Balayage + gloss treatment combo",
    discount: "20% OFF",
    code: "GLOW20",
    month: 9,
  },
  {
    id: 11,
    title: "Holiday Prep",
    description: "Full makeover package for the season",
    discount: "35% OFF",
    code: "HOLIDAY35",
    month: 10,
  },
  {
    id: 12,
    title: "December Magic",
    description: "Gift cards with bonus value",
    discount: "$20 BONUS",
    code: "GIFT20",
    month: 11,
  },
];

const SpecialsBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSpecial, setCurrentSpecial] = useState<Special>(specials[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Get current month's special
    const currentMonth = new Date().getMonth();
    const monthSpecial = specials.find(s => s.month === currentMonth) || specials[0];
    setCurrentSpecial(monthSpecial);
  }, []);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      // Store in session so it doesn't show again during this session
      sessionStorage.setItem('specialsBannerClosed', 'true');
    }, 300);
  };

  // Check if banner was previously closed
  useEffect(() => {
    const wasClosed = sessionStorage.getItem('specialsBannerClosed');
    if (wasClosed) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-gold/90 to-gold-dark/90 backdrop-blur-sm transition-all duration-300 ${
        isAnimating ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="w-full px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left: Icon + Content */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap min-w-0">
              <span className="font-heading font-bold text-black text-xs sm:text-sm truncate">
                {currentSpecial.title}
              </span>
              <span className="hidden sm:inline text-black/70">|</span>
              <span className="text-black/80 text-xs hidden sm:inline">
                {currentSpecial.description}
              </span>
              <span className="font-bold text-black text-xs sm:text-sm bg-black/10 px-2 py-0.5 rounded">
                {currentSpecial.discount}
              </span>
            </div>
          </div>

          {/* Right: Code + Close */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-2">
            <div className="hidden sm:flex items-center gap-2 bg-black/10 px-3 py-1 rounded-full">
              <Tag className="w-3 h-3 text-black" />
              <span className="font-mono text-xs text-black font-medium">
                Code: {currentSpecial.code}
              </span>
            </div>
            <a
              href={salonConfig.booking.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-semibold text-black underline hover:no-underline whitespace-nowrap"
            >
              Book Now
            </a>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-black/10 rounded transition-colors"
              aria-label="Close banner"
            >
              <X className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialsBanner;
