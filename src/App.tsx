import { useEffect, useState } from 'react';
import { EVENT_CONFIG } from './config/event';
import { weddingAudio } from './utils/audioController';
import { Envelope } from './components/Envelope';
import { Invitation } from './components/Invitation';
import { EventDetails } from './components/EventDetails';
import { FloatingPetals } from './components/Ornaments';
import { ClickHearts } from './components/ClickHearts';

type ScreenState = 'envelope' | 'invitation' | 'details';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('envelope');

  useEffect(() => {
    weddingAudio.init(EVENT_CONFIG.MUSIC_SRC);
  }, []);

  const handleEnvelopeOpened = () => {
    setScreen('invitation');
    // Start music ONLY after the invitation paper has completely emerged from the envelope
    void weddingAudio.startAfterReveal();
  };

  return (
    <main
      dir="rtl"
      className="relative h-[100dvh] w-full flex items-center justify-center bg-[#EFE6D8] overflow-hidden sm:py-5 sm:px-4"
    >
      {/* Cute floating heart emojis wherever the user taps or clicks */}
      <ClickHearts />

      {/* Desktop Ambient Botanical Backdrop (visible on tablet & desktop around the centered portrait invitation) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 hidden sm:block overflow-hidden"
      >
        <img
          src={EVENT_CONFIG.assets.envelopeBackdrop}
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-110 blur-2xl opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F3EB]/70 via-[#EFE6D8]/60 to-[#E5D7C3]/70" />
      </div>

      {/* Portrait Digital Invitation Stage (edge-to-edge on mobile, centered luxury frame on desktop) */}
      <div className="relative z-10 w-full h-full sm:w-[436px] sm:h-[min(832px,92dvh)] sm:rounded-[30px] sm:shadow-[0_32px_90px_-22px_rgba(64,54,45,0.28),0_0_0_1px_rgba(198,164,106,0.38)] bg-[#F8F3EB] overflow-hidden flex flex-col">
        {/* Subtle drifting white petals across the invitation */}
        <FloatingPetals />

        {screen === 'envelope' && <Envelope onOpened={handleEnvelopeOpened} />}

        {screen === 'invitation' && (
          <Invitation onViewDetails={() => setScreen('details')} />
        )}

        {screen === 'details' && (
          <EventDetails onBack={() => setScreen('invitation')} />
        )}
      </div>
    </main>
  );
}
