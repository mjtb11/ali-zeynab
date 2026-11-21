import React, { useEffect, useRef, useState } from 'react';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  driftX: number;
  floatY: number;
  rotate: number;
  duration: number;
  delay: number;
}

const CUTE_HEARTS = ['🩷', '🤍', '💛', '💕', '💗'];

/**
 * Spawns cute floating heart emojis wherever the visitor taps or clicks,
 * drifting gently upward and fading softly without blocking interaction or scroll.
 */
export const ClickHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const nextIdRef = useRef(1);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handlePointerDown = (e: PointerEvent) => {
      // Ignore right-click / non-primary mouse buttons
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      const count = prefersReducedMotion ? 1 : 3;
      const created: FloatingHeart[] = [];

      for (let i = 0; i < count; i++) {
        const id = nextIdRef.current++;
        const isPrimary = i === 0;
        const emoji = CUTE_HEARTS[Math.floor(Math.random() * CUTE_HEARTS.length)];
        const offsetX = isPrimary ? 0 : (Math.random() - 0.5) * 34;
        const offsetY = isPrimary ? 0 : (Math.random() - 0.5) * 16;
        const driftX = (Math.random() - 0.5) * 56;
        const floatY = prefersReducedMotion
          ? -(22 + Math.random() * 14)
          : -(72 + Math.random() * 58);
        const size = isPrimary ? 21 + Math.random() * 5 : 13 + Math.random() * 6;
        const rotate = (Math.random() - 0.5) * 34;
        const duration = prefersReducedMotion ? 650 : 1150 + Math.random() * 450;
        const delay = isPrimary ? 0 : 60 + i * 70;

        created.push({
          id,
          x: e.clientX + offsetX,
          y: e.clientY + offsetY,
          emoji,
          size,
          driftX,
          floatY,
          rotate,
          duration,
          delay,
        });
      }

      setHearts((prev) => [...prev.slice(-30), ...created]);

      const maxLifetime = Math.max(...created.map((h) => h.duration + h.delay)) + 80;
      const createdIds = new Set(created.map((h) => h.id));
      const timerId = window.setTimeout(() => {
        setHearts((prev) => prev.filter((h) => !createdIds.has(h.id)));
      }, maxLifetime);

      timersRef.current.push(timerId);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden select-none"
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="click-heart-particle fixed leading-none"
          style={
            {
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              fontSize: `${heart.size}px`,
              '--heart-dx': `${heart.driftX}px`,
              '--heart-dy': `${heart.floatY}px`,
              '--heart-rot': `${heart.rotate}deg`,
              '--heart-dur': `${heart.duration}ms`,
              '--heart-delay': `${heart.delay}ms`,
            } as React.CSSProperties
          }
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
};
