import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CalendarHeart } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';
import { HeartDivider } from './Ornaments';
import { MusicPlayer } from './MusicPlayer';

interface InvitationProps {
  onViewDetails: () => void;
}

export const Invitation: React.FC<InvitationProps> = ({ onViewDetails }) => {
  const [bgFailed, setBgFailed] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const contentGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!containerRef.current || !contentGroupRef.current) return;

    if (prefersReducedMotion) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power1.out' }
      );
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.985 },
        { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.inv-reveal',
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.11,
          delay: 0.12,
          ease: 'power2.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="متن دعوتنامه عقدکنان علی و زینب"
      className="relative flex flex-col w-full h-full flex-1 overflow-hidden bg-[#F8F3EB]"
    >
      {/* Luxury Cotton Paper Canvas with White Blossoms, Embroidered Lace & Wedding Rings */}
      {!bgFailed && (
        <img
          src={EVENT_CONFIG.assets.invitationCanvas}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          onError={() => setBgFailed(true)}
          className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

      {/* Subtle warm radial contrast scrim behind center calligraphy for guaranteed legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_78%_54%_at_50%_38%,rgba(248,243,235,0.68)_0%,rgba(248,243,235,0.28)_62%,transparent_100%)]"
      />

      {/* Delicate Champagne-Gold Stationery Arch Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 sm:inset-5 rounded-t-[160px] rounded-b-[20px] border border-[#C6A46A]/45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[21px] sm:inset-[25px] rounded-t-[155px] rounded-b-[15px] border border-[#C6A46A]/20"
      />

      {/* Scrollable Inner Layer (gracefully handles short screens without cutting off controls) */}
      <div className="relative z-10 flex-1 w-full invitation-scroll">
        <div className="min-h-full w-full flex flex-col justify-between pt-safe pb-safe">
          {/* Upper & Center Calligraphy Composition */}
          <div
            ref={contentGroupRef}
            className="flex-1 flex flex-col items-center justify-center px-8 pt-10 pb-4 text-center"
          >
            <p className="inv-reveal font-calligraphy text-[22px] sm:text-[24px] leading-[2.0] text-[#40362D]">
              {EVENT_CONFIG.copy.openingLine}
            </p>

            <p className="inv-reveal font-calligraphy text-[20px] sm:text-[22px] leading-[1.95] text-[#40362D]/90 mt-0.5">
              {EVENT_CONFIG.copy.occasionLine}
            </p>

            {/* Visual Centerpiece — Couple's Names in Muted Olive-Green Calligraphy */}
            <h1 className="inv-reveal font-calligraphy text-[52px] sm:text-[60px] leading-[1.7] text-[#757D1E] my-1.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.75)]">
              {EVENT_CONFIG.copy.coupleNames}
            </h1>

            <p className="inv-reveal font-calligraphy text-[19px] sm:text-[21px] leading-[2.05] text-[#40362D] max-w-[300px] mt-1">
              {EVENT_CONFIG.copy.closingLine}
            </p>
            <p className="inv-reveal font-calligraphy text-[20px] sm:text-[22px] leading-[1.95] text-[#40362D]/90 mt-1">
              {EVENT_CONFIG.copy.familyNames}
            </p>

            <div className="inv-reveal w-full mt-3.5">
              <HeartDivider />
            </div>
          </div>

          {/* Bottom Ergonomic Thumb Zone — Separate Details CTA & Music Player */}
          <div className="w-full px-7 pt-2 pb-4 flex flex-col items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onViewDetails}
              className="inv-reveal group w-full max-w-[270px] min-h-[48px] px-6 py-3 rounded-full bg-[#FAF5EC]/92 hover:bg-[#FFFFFF] active:scale-[0.98] border border-[#C6A46A]/70 hover:border-[#B38E52] shadow-[0_10px_26px_-10px_rgba(64,54,45,0.2)] flex items-center justify-center gap-2.5 text-[15px] font-medium text-[#40362D] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A46A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F3EB] cursor-pointer"
            >
              <CalendarHeart
                className="w-[18px] h-[18px] text-[#858D24] transition-transform duration-200 group-hover:scale-110 shrink-0"
                strokeWidth={1.75}
              />
              <span className="whitespace-nowrap">{EVENT_CONFIG.copy.viewDetailsCta}</span>
            </button>

            <div className="inv-reveal w-full">
              <MusicPlayer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
