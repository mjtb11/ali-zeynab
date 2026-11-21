import React from 'react';

interface DividerProps {
  className?: string;
}

/**
 * Delicate golden hairline divider with a centered minimal heart ornament,
 * faithfully matching the original wedding invitation stationery.
 */
export const HeartDivider: React.FC<DividerProps> = ({ className = '' }) => (
  <div
    className={`flex items-center justify-center gap-3 w-full max-w-[230px] mx-auto ${className}`}
    aria-hidden="true"
  >
    <span className="h-[1px] flex-1 bg-gradient-to-l from-[#C6A46A]/85 via-[#C6A46A]/45 to-transparent" />
    <svg
      width="17"
      height="15"
      viewBox="0 0 24 22"
      fill="none"
      className="shrink-0 text-[#B38E52]"
    >
      <path
        d="M12 19.6C12 19.6 3.5 13.7 3.5 7.7C3.5 4.9 5.7 2.8 8.3 2.8C10 2.8 11.4 3.7 12 5.1C12.6 3.7 14 2.8 15.7 2.8C18.3 2.8 20.5 4.9 20.5 7.7C20.5 13.7 12 19.6 12 19.6Z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="h-[1px] flex-1 bg-gradient-to-r from-[#C6A46A]/85 via-[#C6A46A]/45 to-transparent" />
  </div>
);

/**
 * Tactile champagne-gold wax seal with organic melted rim and embossed heart symbol.
 */
export const WaxSealSvg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_6px_12px_rgba(64,54,45,0.28)] ${className}`}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="waxOuterGrad" cx="35%" cy="30%" r="72%">
        <stop offset="0%" stopColor="#E6CC97" />
        <stop offset="38%" stopColor="#CFA96C" />
        <stop offset="76%" stopColor="#B3894A" />
        <stop offset="100%" stopColor="#8E6831" />
      </radialGradient>
      <radialGradient id="waxInnerGrad" cx="32%" cy="28%" r="75%">
        <stop offset="0%" stopColor="#DFC186" />
        <stop offset="52%" stopColor="#C19A5C" />
        <stop offset="100%" stopColor="#9A743B" />
      </radialGradient>
      <linearGradient id="waxRimHighlight" x1="18%" y1="12%" x2="82%" y2="88%">
        <stop offset="0%" stopColor="#FFF6E0" stopOpacity="0.82" />
        <stop offset="45%" stopColor="#C6A46A" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#6D4E21" stopOpacity="0.65" />
      </linearGradient>
    </defs>

    {/* Organic poured wax silhouette */}
    <path
      d="M59 8C72 7 82 14 91 20C100 26 109 36 111 49C113 62 110 76 102 87C94 98 83 108 69 111C55 114 40 111 29 102C18 93 10 81 9 67C8 53 11 38 19 27C27 16 44 9 59 8Z"
      fill="url(#waxOuterGrad)"
    />

    {/* Raised poured edge bevel */}
    <path
      d="M59 11C71 10 81 16 89 22C98 28 106 37 108 49C110 61 107 74 100 84C92 94 82 104 69 107C56 110 42 107 31 99C21 91 13 80 12 67C11 54 14 40 22 29C29 19 45 12 59 11Z"
      stroke="url(#waxRimHighlight)"
      strokeWidth="2.5"
    />

    {/* Recessed central stamp well */}
    <circle
      cx="60"
      cy="60"
      r="36"
      fill="url(#waxInnerGrad)"
      stroke="#8C662F"
      strokeWidth="2"
      strokeOpacity="0.6"
    />
    <circle
      cx="60"
      cy="60"
      r="34"
      stroke="#F8E7C1"
      strokeWidth="1"
      strokeOpacity="0.5"
    />

    {/* Subtle embossed heart shadow */}
    <path
      d="M60.8 77.2C60.8 77.2 42.2 64.5 42.2 52.8C42.2 46.8 46.9 42.3 52.5 42.3C56.2 42.3 59.3 44.3 60.8 47.4C62.3 44.3 65.4 42.3 69.1 42.3C74.7 42.3 79.4 46.8 79.4 52.8C79.4 64.5 60.8 77.2 60.8 77.2Z"
      stroke="#785624"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity="0.65"
    />

    {/* Embossed heart metallic highlight */}
    <path
      d="M60 76C60 76 41.5 63.4 41.5 51.8C41.5 45.8 46.2 41.3 51.8 41.3C55.5 41.3 58.6 43.3 60 46.4C61.4 43.3 64.5 41.3 68.2 41.3C73.8 41.3 78.5 45.8 78.5 51.8C78.5 63.4 60 76 60 76Z"
      stroke="#F4DFB4"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Olive leaf sprig tucked symmetrically beside the wax seal.
 */
export const OliveLeafSprig: React.FC<{ side: 'left' | 'right'; className?: string }> = ({
  side,
  className = '',
}) => (
  <svg
    viewBox="0 0 64 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${side === 'right' ? '-scale-x-100' : ''} ${className}`}
    aria-hidden="true"
  >
    <path
      d="M58 28C44 27 29 22 14 14"
      stroke="#767E26"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M36 22C28 11 19 6 8 8C13 18 22 25 36 22Z"
      fill="#858D24"
      fillOpacity="0.72"
      stroke="#676F1C"
      strokeWidth="0.9"
    />
    <path
      d="M44 27C35 28 24 33 16 42C27 42 38 36 44 27Z"
      fill="#9AA043"
      fillOpacity="0.7"
      stroke="#6B731E"
      strokeWidth="0.9"
    />
    <path
      d="M27 18C22 14 17 12 11 12"
      stroke="#E8E4C8"
      strokeWidth="0.7"
      strokeOpacity="0.65"
    />
  </svg>
);

/**
 * Neshan navigation map pin mark.
 */
export const NeshanPinIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
    <path
      d="M14 2.5C8.75 2.5 4.5 6.75 4.5 12C4.5 18.6 14 25.5 14 25.5C14 25.5 23.5 18.6 23.5 12C23.5 6.75 19.25 2.5 14 2.5Z"
      fill="#2563EB"
    />
    <path
      d="M14 2.5C8.75 2.5 4.5 6.75 4.5 12C4.5 15.2 6.8 18.7 9.4 21.4L14 12V2.5Z"
      fill="#10B981"
    />
    <path
      d="M14 2.5C19.25 2.5 23.5 6.75 23.5 12C23.5 14.3 22.3 16.8 20.6 19.1L14 12V2.5Z"
      fill="#F59E0B"
    />
    <path
      d="M14 12L9.4 21.4C11.5 23.6 14 25.5 14 25.5C14 25.5 17.8 22.7 20.6 19.1L14 12Z"
      fill="#EF4444"
    />
    <circle cx="14" cy="12" r="4.2" fill="#FFFFFF" />
  </svg>
);

const PETALS = [
  { id: 1, left: '12%', size: 15, duration: '16s', delay: '-2s', variant: 'a', opacity: 0.7 },
  { id: 2, left: '28%', size: 12, duration: '21s', delay: '-9s', variant: 'b', opacity: 0.55 },
  { id: 3, left: '54%', size: 14, duration: '18s', delay: '-5s', variant: 'a', opacity: 0.62 },
  { id: 4, left: '76%', size: 16, duration: '20s', delay: '-13s', variant: 'b', opacity: 0.68 },
  { id: 5, left: '89%', size: 11, duration: '15s', delay: '-7s', variant: 'a', opacity: 0.52 },
];

/**
 * Restrained ambient drifting white flower petals (compositor-only transforms).
 */
export const FloatingPetals: React.FC = () => (
  <div
    className="pointer-events-none absolute inset-0 overflow-hidden z-20"
    aria-hidden="true"
  >
    {PETALS.map((petal) => (
      <span
        key={petal.id}
        className={`absolute -top-6 ${
          petal.variant === 'a' ? 'animate-petal-a' : 'animate-petal-b'
        }`}
        style={
          {
            left: petal.left,
            '--petal-duration': petal.duration,
            '--petal-delay': petal.delay,
          } as React.CSSProperties
        }
      >
        <svg
          width={petal.size}
          height={Math.round(petal.size * 1.3)}
          viewBox="0 0 18 24"
          fill="none"
          style={{ opacity: petal.opacity }}
        >
          <path
            d="M9 1C13.8 4.4 17 10.6 15.2 17.2C13.9 21.6 10.6 23 8.8 23C6.8 23 3.4 20.6 2.4 15.8C1.2 10.2 4.4 4.2 9 1Z"
            fill="url(#petalFill)"
          />
          <defs>
            <linearGradient id="petalFill" x1="2" y1="2" x2="15" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F1E4D1" />
            </linearGradient>
          </defs>
        </svg>
      </span>
    ))}
  </div>
);
