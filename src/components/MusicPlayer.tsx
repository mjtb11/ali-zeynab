import React, { useEffect, useState } from 'react';
import { Music, Pause, Play } from 'lucide-react';
import { AudioSnapshot, weddingAudio } from '../utils/audioController';
import { EVENT_CONFIG } from '../config/event';

interface MusicPlayerProps {
  compact?: boolean;
  className?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  compact = false,
  className = '',
}) => {
  const [audioState, setAudioState] = useState<AudioSnapshot>(() =>
    weddingAudio.getSnapshot()
  );

  useEffect(() => {
    return weddingAudio.subscribe(setAudioState);
  }, []);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Account for RTL visual direction (right-to-left progress fill)
    const ratioFromRight = (rect.right - e.clientX) / rect.width;
    weddingAudio.seekToRatio(ratioFromRight);
  };

  if (audioState.hasError) {
    return null;
  }

  return (
    <div
      dir="rtl"
      aria-label={`پخش‌کننده موسیقی — ${EVENT_CONFIG.MUSIC_TITLE}`}
      className={`w-full max-w-[270px] mx-auto flex items-center gap-3 rounded-full bg-[#FAF5ED]/88 backdrop-blur-sm border border-[#C6A46A]/45 shadow-[0_8px_22px_-10px_rgba(64,54,45,0.16)] ${
        compact ? 'px-2.5 py-1.5' : 'px-3 py-2'
      } ${className}`}
    >
      {/* Play / Pause Button (44px accessible touch hitbox) */}
      <button
        type="button"
        onClick={() => void weddingAudio.toggle()}
        aria-label={audioState.isPlaying ? 'توقف موسیقی' : 'پخش موسیقی'}
        aria-pressed={audioState.isPlaying}
        className="w-10 h-10 -my-1 -mr-1 rounded-full flex items-center justify-center text-[#FAF5ED] bg-[#786552] hover:bg-[#5D4D3E] active:scale-95 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A46A] shrink-0 cursor-pointer"
      >
        {audioState.isPlaying ? (
          <Pause className="w-4 h-4 fill-current" />
        ) : (
          <Play className="w-4 h-4 fill-current translate-x-[0.5px]" />
        )}
      </button>

      {/* Progress Track */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="موقعیت پخش موسیقی"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(audioState.progress * 100)}
        onClick={handleProgressClick}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') weddingAudio.seekToRatio(audioState.progress + 0.05);
          if (e.key === 'ArrowRight') weddingAudio.seekToRatio(audioState.progress - 0.05);
        }}
        className="relative flex-1 h-7 flex items-center cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A46A] rounded"
      >
        <div className="w-full h-[3px] rounded-full bg-[#D8C5A8]/80 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#8B7150] transition-[width] duration-150"
            style={{ width: `${Math.max(4, audioState.progress * 100)}%` }}
          />
        </div>
      </div>

      {/* Playing Indicator & Musical Note */}
      <div className="flex items-center gap-1.5 pl-1 shrink-0 text-[#7A6347]" aria-hidden="true">
        {audioState.isPlaying ? (
          <span className="flex items-end gap-[2px] h-3.5 w-3.5 justify-center">
            <span
              className="w-[2px] h-full rounded-full bg-[#9F7D43] animate-eq-bar"
              style={{ '--eq-speed': '0.85s', '--eq-delay': '0s' } as React.CSSProperties}
            />
            <span
              className="w-[2px] h-full rounded-full bg-[#9F7D43] animate-eq-bar"
              style={{ '--eq-speed': '0.7s', '--eq-delay': '0.2s' } as React.CSSProperties}
            />
            <span
              className="w-[2px] h-full rounded-full bg-[#9F7D43] animate-eq-bar"
              style={{ '--eq-speed': '0.95s', '--eq-delay': '0.1s' } as React.CSSProperties}
            />
          </span>
        ) : (
          <Music className="w-4 h-4 text-[#9F7D43]/85" strokeWidth={1.8} />
        )}
      </div>
    </div>
  );
};
