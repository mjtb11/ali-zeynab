import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Music } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';
import {
  createIdleEnvelopeAnimation,
  playEnvelopeOpeningTimeline,
} from '../animations/envelopeTimeline';
import { weddingAudio } from '../utils/audioController';
import { HeartDivider, OliveLeafSprig, WaxSealSvg } from './Ornaments';

interface EnvelopeProps {
  onOpened: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpened }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [bgFailed, setBgFailed] = useState(false);

  const envelopeWrapperRef = useRef<HTMLDivElement>(null);
  const envelopeShellRef = useRef<HTMLDivElement>(null);
  const topFlapRef = useRef<HTMLDivElement>(null);
  const waxSealRef = useRef<HTMLDivElement>(null);
  const waxLeavesLeftRef = useRef<HTMLDivElement>(null);
  const waxLeavesRightRef = useRef<HTMLDivElement>(null);
  const embossedHeartRef = useRef<HTMLDivElement>(null);
  const cardPaperRef = useRef<HTMLDivElement>(null);
  const cardClipMaskRef = useRef<HTMLDivElement>(null);
  const ctaPromptRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const wrapper = envelopeWrapperRef.current;
    if (!wrapper) return;

    const idleTween = createIdleEnvelopeAnimation(wrapper, prefersReducedMotion);
    return () => {
      idleTween?.kill();
    };
  }, [prefersReducedMotion]);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Unlock audio strictly inside the user's direct tap/click gesture
    weddingAudio.authorizeOnGesture();

    if (
      !envelopeWrapperRef.current ||
      !envelopeShellRef.current ||
      !topFlapRef.current ||
      !waxSealRef.current ||
      !cardPaperRef.current ||
      !cardClipMaskRef.current ||
      !ctaPromptRef.current
    ) {
      onOpened();
      return;
    }

    playEnvelopeOpeningTimeline(
      {
        envelopeWrapper: envelopeWrapperRef.current,
        envelopeShell: envelopeShellRef.current,
        topFlap: topFlapRef.current,
        waxSeal: waxSealRef.current,
        waxLeavesLeft: waxLeavesLeftRef.current,
        waxLeavesRight: waxLeavesRightRef.current,
        embossedHeart: embossedHeartRef.current,
        cardPaper: cardPaperRef.current,
        cardClipMask: cardClipMaskRef.current,
        ctaPrompt: ctaPromptRef.current,
      },
      prefersReducedMotion,
      () => {
        onOpened();
      }
    );
  };

  return (
    <section
      aria-label="پاکت دعوتنامه عقدکنان علی و زینب"
      className="relative flex flex-col w-full h-full flex-1 overflow-hidden bg-[#F8F3EB] select-none"
    >
      {/* Photorealistic floral, lace, and wedding rings backdrop */}
      {!bgFailed && (
        <img
          src={EVENT_CONFIG.assets.envelopeBackdrop}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          onError={() => setBgFailed(true)}
          className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

      {/* Subtle ambient sunlit warmth radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,252,247,0.52)_0%,rgba(248,243,235,0.14)_56%,rgba(232,218,197,0.22)_100%)]"
      />

      {/* Scrollable Inner Layer (zero scrollbar when viewport fits, smooth scroll on compact viewports) */}
      <div className="relative z-30 flex-1 w-full invitation-scroll flex flex-col items-center">
        <div className="w-full max-w-[356px] sm:max-w-[376px] min-h-full px-5 pt-safe pb-safe py-6 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={handleOpen}
            disabled={isOpening}
            aria-label="باز کردن پاکت دعوتنامه علی و زینب"
            className="group relative w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A46A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F8F3EB] rounded-2xl cursor-pointer disabled:cursor-default text-right"
          >
          {/* Envelope 3D Perspective Stage */}
          <div ref={envelopeWrapperRef} className="envelope-stage relative w-full pt-10 pb-2">
            {/* Soft natural contact shadow beneath the paper envelope */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-3 inset-x-6 h-10 rounded-full bg-[#40362D]/18 blur-xl transition-transform duration-300 group-hover:scale-[1.03]"
            />

            {/* Envelope Aspect Container (physical cream stationery proportions) */}
            <div className="relative w-full aspect-[1.22/1]">
              {/* LAYER 1: Back Panel & Interior Paper Lining */}
              <div
                ref={envelopeShellRef}
                className="absolute inset-0 rounded-[14px]"
              >
                <div
                  className="absolute inset-0 rounded-[14px] paper-grain border border-[#DFCEB5]/90 shadow-[0_18px_42px_-12px_rgba(64,54,45,0.22),0_4px_12px_rgba(198,164,106,0.14)]"
                  style={{
                    background:
                      'linear-gradient(165deg, #E7D8C3 0%, #DFCEB5 52%, #D7C3A6 100%)',
                  }}
                />

                {/* LAYER 2: Inner Invitation Paper (clipped by pocket below, emerges upward) */}
                <div
                  ref={cardClipMaskRef}
                  className="absolute inset-x-[6%] -top-[68%] bottom-[4%] z-20 overflow-hidden pointer-events-none flex items-end justify-center"
                >
                  <div
                    ref={cardPaperRef}
                    className="relative w-full h-[63%] rounded-t-[14px] rounded-b-[6px] bg-[#FAF6EE] paper-grain border border-[#E5D5BC] shadow-[0_-6px_24px_rgba(64,54,45,0.14)] px-5 pt-6 pb-4 flex flex-col items-center justify-start text-center overflow-hidden"
                  >
                    {/* Fine champagne-gold arched stationery frame */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[8px] rounded-t-[10px] rounded-b-[4px] border border-[#C6A46A]/65"
                    />

                    {/* Delicate white blossoms blended seamlessly on cotton paper */}
                    <img
                      src={EVENT_CONFIG.assets.cardFloralCorner}
                      alt=""
                      aria-hidden="true"
                      referrerPolicy="no-referrer"
                      className="pointer-events-none absolute -top-1 -left-1 w-24 h-24 object-contain mix-blend-multiply opacity-90"
                    />

                    {/* Real HTML Persian Calligraphy Preview emerging from inside the envelope */}
                    <p className="relative z-10 font-calligraphy text-[13px] leading-[1.85] text-[#40362D] mt-1">
                      {EVENT_CONFIG.copy.openingLine}
                    </p>
                    <p className="relative z-10 font-calligraphy text-[12px] leading-[1.8] text-[#40362D]/90">
                      {EVENT_CONFIG.copy.occasionLine}
                    </p>
                    <p className="relative z-10 font-calligraphy text-[30px] leading-[1.7] text-[#7A8220] mt-0.5">
                      {EVENT_CONFIG.copy.coupleNames}
                    </p>
                    <HeartDivider className="relative z-10 my-1 max-w-[130px]" />
                    <p className="relative z-10 text-[10px] leading-relaxed text-[#40362D]/80 font-medium">
                      {EVENT_CONFIG.copy.closingLine}
                    </p>
                  </div>
                </div>

                {/* LAYER 3: Envelope Front Body & Left / Right / Bottom Triangular Flaps */}
                <div className="absolute inset-0 z-30 rounded-[14px] overflow-hidden pointer-events-none">
                  <svg
                    viewBox="0 0 400 328"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="envLeftGrad" x1="0%" y1="0%" x2="100%" y2="55%">
                        <stop offset="0%" stopColor="#F5ECE0" />
                        <stop offset="100%" stopColor="#ECE0CE" />
                      </linearGradient>
                      <linearGradient id="envRightGrad" x1="100%" y1="0%" x2="0%" y2="55%">
                        <stop offset="0%" stopColor="#F6EDE2" />
                        <stop offset="100%" stopColor="#EADCCB" />
                      </linearGradient>
                      <linearGradient id="envBottomGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stopColor="#F9F2E8" />
                        <stop offset="55%" stopColor="#F2E7D8" />
                        <stop offset="100%" stopColor="#EADBC8" />
                      </linearGradient>
                      <filter id="foldShadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="-2" stdDeviation="4" floodColor="#40362D" floodOpacity="0.12" />
                      </filter>
                    </defs>

                    {/* Left triangular side flap */}
                    <polygon points="0,0 202,166 0,328" fill="url(#envLeftGrad)" />
                    {/* Right triangular side flap */}
                    <polygon points="400,0 198,166 400,328" fill="url(#envRightGrad)" />
                    {/* Subtle diagonal fold creases */}
                    <line x1="0" y1="0" x2="200" y2="165" stroke="#DFCEB5" strokeWidth="1" />
                    <line x1="400" y1="0" x2="200" y2="165" stroke="#DFCEB5" strokeWidth="1" />

                    {/* Bottom front pocket flap with organic soft apex */}
                    <path
                      d="M0,328 L0,318 L182,162 Q200,148 218,162 L400,318 L400,328 Z"
                      fill="url(#envBottomGrad)"
                      filter="url(#foldShadow)"
                    />

                    {/* Champagne-gold hairline trim along front V-edges (matching original invitation) */}
                    <path
                      d="M0,14 L186,162 Q200,173 214,162 L400,14"
                      fill="none"
                      stroke="#C6A46A"
                      strokeOpacity="0.7"
                      strokeWidth="1.35"
                    />
                    {/* Fine inner lace border flourish along bottom corners */}
                    <path
                      d="M16,312 L182,174 Q200,160 218,174 L384,312"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeOpacity="0.58"
                      strokeWidth="1.2"
                      strokeDasharray="3 4"
                    />
                  </svg>

                  {/* Embossed delicate heart relief revealed after the wax seal breaks */}
                  <div
                    ref={embossedHeartRef}
                    className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-90"
                    aria-hidden="true"
                  >
                    <svg width="34" height="32" viewBox="0 0 34 32" fill="none">
                      <path
                        d="M17 28.5C17 28.5 4.5 20 4.5 11.4C4.5 7.2 7.8 4 11.7 4C14.2 4 16.2 5.4 17 7.4C17.8 5.4 19.8 4 22.3 4C26.2 4 29.5 7.2 29.5 11.4C29.5 20 17 28.5 17 28.5Z"
                        stroke="#D2BA95"
                        strokeWidth="1.8"
                        fill="#F6EFE5"
                        fillOpacity="0.45"
                      />
                    </svg>
                  </div>
                </div>

                {/* LAYER 4: Top Triangular Opening Flap (True 3D transform-style: preserve-3d) */}
                <div
                  ref={topFlapRef}
                  className="envelope-flap-3d absolute top-0 inset-x-0 h-[59%] z-40 pointer-events-none"
                >
                  {/* Outer face of top flap */}
                  <div className="envelope-flap-face absolute inset-0">
                    <svg
                      viewBox="0 0 400 194"
                      preserveAspectRatio="none"
                      className="w-full h-full drop-shadow-[0_8px_14px_rgba(64,54,45,0.14)]"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="topFlapOuter" x1="50%" y1="0%" x2="50%" y2="100%">
                          <stop offset="0%" stopColor="#FAF4EB" />
                          <stop offset="65%" stopColor="#F3E9DB" />
                          <stop offset="100%" stopColor="#EADBC6" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,12 Q0,0 14,0 L386,0 Q400,0 400,12 L218,176 Q200,192 182,176 Z"
                        fill="url(#topFlapOuter)"
                      />
                      {/* Delicate lace stitch inset */}
                      <path
                        d="M22,12 L188,162 Q200,172 212,162 L378,12"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeOpacity="0.65"
                        strokeWidth="1.4"
                        strokeDasharray="3 4"
                      />
                      {/* Fine champagne gold edge trim */}
                      <path
                        d="M4,12 L184,174 Q200,188 216,174 L396,12"
                        fill="none"
                        stroke="#C6A46A"
                        strokeOpacity="0.72"
                        strokeWidth="1.35"
                      />
                    </svg>
                  </div>

                  {/* Inner face of top flap (revealed as flap rotates past 90deg) */}
                  <div className="envelope-flap-inner absolute inset-0">
                    <svg
                      viewBox="0 0 400 194"
                      preserveAspectRatio="none"
                      className="w-full h-full"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="topFlapInner" x1="50%" y1="0%" x2="50%" y2="100%">
                          <stop offset="0%" stopColor="#E3D2B9" />
                          <stop offset="100%" stopColor="#EFE3D2" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,12 Q0,0 14,0 L386,0 Q400,0 400,12 L218,176 Q200,192 182,176 Z"
                        fill="url(#topFlapInner)"
                      />
                    </svg>
                  </div>
                </div>

                {/* LAYER 5: Metallic Gold Wax Seal & Olive Leaf Sprigs */}
                <div className="pointer-events-none absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center">
                  {/* Soft ambient warm glow behind seal */}
                  <span
                    aria-hidden="true"
                    className="animate-soft-glow absolute w-24 h-24 rounded-full bg-[#C6A46A]/22 blur-xl"
                  />

                  {/* Left olive leaf sprig */}
                  <div
                    ref={waxLeavesLeftRef}
                    className="absolute -left-[44px] top-1/2 -translate-y-1/2 w-[50px]"
                  >
                    <OliveLeafSprig side="left" />
                  </div>

                  {/* Right olive leaf sprig */}
                  <div
                    ref={waxLeavesRightRef}
                    className="absolute -right-[44px] top-1/2 -translate-y-1/2 w-[50px]"
                  >
                    <OliveLeafSprig side="right" />
                  </div>

                  {/* Gold heart wax seal */}
                  <div
                    ref={waxSealRef}
                    className="relative w-[78px] h-[78px] transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
                  >
                    <WaxSealSvg className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Stationery Opening Prompt (part of the visual design, not an ordinary browser button) */}
          <div
            ref={ctaPromptRef}
            className="mt-8 flex flex-col items-center justify-center text-center gap-3"
          >
            <HeartDivider className="max-w-[170px]" />

            <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#FAF5EC]/82 backdrop-blur-[3px] border border-[#C6A46A]/55 shadow-[0_6px_20px_-6px_rgba(64,54,45,0.14)] transition-all duration-200 group-hover:bg-[#FFFFFF]/92 group-hover:border-[#C6A46A] group-active:scale-[0.98]">
              <Music className="w-4 h-4 text-[#9F7D43] shrink-0" strokeWidth={1.8} />
              <span className="text-[14px] sm:text-[15px] font-medium text-[#40362D] tracking-tight whitespace-nowrap">
                {EVENT_CONFIG.copy.openEnvelopeCta}
              </span>
            </div>

            <ChevronDown
              className="w-5 h-5 text-[#9F7D43] animate-gentle-chevron"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </div>
        </button>
        </div>
      </div>
    </section>
  );
};
