import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';
import { HeartDivider, NeshanPinIcon } from './Ornaments';
import { Countdown } from './Countdown';
import { MusicPlayer } from './MusicPlayer';

interface EventDetailsProps {
  onBack: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ onBack }) => {
  const [bgFailed, setBgFailed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!sectionRef.current) return;

    if (prefersReducedMotion) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.28, ease: 'power1.out' }
      );
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.details-stagger',
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          delay: 0.08,
          ease: 'power2.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const hasValidNeshanUrl =
    Boolean(EVENT_CONFIG.NESHAN_DIRECTIONS_URL) &&
    /^https?:\/\//i.test(EVENT_CONFIG.NESHAN_DIRECTIONS_URL);

  return (
    <section
      ref={sectionRef}
      aria-label="جزئیات مراسم عقدکنان علی و زینب"
      className="relative flex flex-col w-full h-full flex-1 overflow-hidden bg-[#F8F3EB]"
    >
      {/* Matching Floral & Lace Cotton Paper Background */}
      {!bgFailed && (
        <img
          src={EVENT_CONFIG.assets.detailsCanvas}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          onError={() => setBgFailed(true)}
          className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

      {/* Subtle warm radial veil to ensure crisp legibility across all event info */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_72%_at_50%_48%,rgba(248,243,235,0.72)_0%,rgba(248,243,235,0.34)_72%,transparent_100%)]"
      />

      {/* Delicate Champagne-Gold Stationery Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 sm:inset-5 rounded-t-[140px] rounded-b-[20px] border border-[#C6A46A]/42"
      />

      {/* Smooth Scrollable Content Container */}
      <div className="relative z-10 flex-1 w-full invitation-scroll">
        <div className="min-h-full w-full flex flex-col justify-between pt-safe pb-safe">
          {/* Top Navigation — Return to Invitation */}
          <header className="w-full px-6 pt-2 flex items-center justify-start shrink-0">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3 -mr-2 rounded-full text-[13.5px] font-medium text-[#5C4E41] hover:text-[#40362D] hover:bg-[#FAF5ED]/75 active:scale-95 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A46A] cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={1.8} />
              <span className="whitespace-nowrap">{EVENT_CONFIG.copy.backToInvitationCta}</span>
            </button>
          </header>

          {/* Main Details Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-2 text-center">
            {/* Couple Title Header */}
            <div className="details-stagger flex flex-col items-center">
              <p className="text-[13px] font-medium text-[#6C5E52] tracking-wide">
                جزئیات مراسم عقدکنان
              </p>
              <h1 className="font-calligraphy text-[40px] sm:text-[46px] leading-[1.65] text-[#757D1E] -mt-1">
                {EVENT_CONFIG.copy.coupleNames}
              </h1>
            </div>

            <div className="details-stagger w-full mt-0.5 mb-4">
              <HeartDivider />
            </div>

            {/* Event Information Rows (Clean unboxed stationery typography with subtle hairline dividers) */}
            <div className="details-stagger w-full max-w-[300px] divide-y divide-[#C6A46A]/28">
              <div className="flex items-center justify-between gap-4 py-3 text-right">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#FAF5ED]/90 border border-[#C6A46A]/40 flex items-center justify-center text-[#9F7D43] shrink-0">
                    <Calendar className="w-[18px] h-[18px]" strokeWidth={1.7} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11.5px] text-[#7A6B5C]">تاریخ مراسم</span>
                    <span className="text-[15.5px] font-semibold text-[#40362D] mt-0.5">
                      {EVENT_CONFIG.event.dateLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 py-3 text-right">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#FAF5ED]/90 border border-[#C6A46A]/40 flex items-center justify-center text-[#9F7D43] shrink-0">
                    <Clock className="w-[18px] h-[18px]" strokeWidth={1.7} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11.5px] text-[#7A6B5C]">زمان شروع</span>
                    <span className="text-[15.5px] font-semibold text-[#40362D] mt-0.5">
                      {EVENT_CONFIG.event.timeLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 py-3 text-right">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-[#FAF5ED]/90 border border-[#C6A46A]/40 flex items-center justify-center text-[#9F7D43] shrink-0">
                    <MapPin className="w-[18px] h-[18px]" strokeWidth={1.7} />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[11.5px] text-[#7A6B5C]">نشانی تالار</span>
                    <span className="text-[15px] font-semibold text-[#40362D] mt-0.5 leading-snug">
                      {EVENT_CONFIG.event.venueName}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="details-stagger w-full my-4">
              <HeartDivider />
            </div>

            {/* Live Countdown */}
            <div className="details-stagger w-full max-w-[310px]">
              <Countdown />
            </div>

            {/* Neshan Navigation Button */}
            <div className="details-stagger w-full max-w-[310px] mt-4">
              {hasValidNeshanUrl ? (
                <a
                  href={EVENT_CONFIG.NESHAN_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full min-h-[48px] px-6 py-3 rounded-full bg-[#FAF6EE]/95 hover:bg-[#FFFFFF] active:scale-[0.98] border border-[#C6A46A]/75 hover:border-[#B38E52] shadow-[0_10px_26px_-10px_rgba(64,54,45,0.2)] flex items-center justify-center gap-3 text-[15px] font-semibold text-[#40362D] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A46A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F3EB]"
                >
                  <NeshanPinIcon className="w-6 h-6 transition-transform duration-200 group-hover:scale-110 shrink-0" />
                  <span className="whitespace-nowrap">{EVENT_CONFIG.copy.neshanCta}</span>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full min-h-[48px] px-6 py-3 rounded-full bg-[#F2E9DC]/70 border border-[#C6A46A]/35 text-[14px] text-[#7A6B5C] cursor-not-allowed"
                >
                  لینک مسیریابی نشان به‌زودی قرار می‌گیرد
                </button>
              )}
            </div>
          </div>

          {/* Persistent Compact Music Player */}
          <footer className="w-full px-7 pt-3 pb-4 shrink-0">
            <MusicPlayer compact />
          </footer>
        </div>
      </div>
    </section>
  );
};
