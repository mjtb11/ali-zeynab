import gsap from 'gsap';

export interface EnvelopeAnimationElements {
  envelopeWrapper: HTMLElement;
  topFlap: HTMLElement;
  waxSeal: HTMLElement;
  waxLeavesLeft: HTMLElement | null;
  waxLeavesRight: HTMLElement | null;
  embossedHeart: HTMLElement | null;
  cardPaper: HTMLElement;
  cardClipMask: HTMLElement;
  ctaPrompt: HTMLElement;
  envelopeShell: HTMLElement;
}

/**
 * Restrained idle breathing motion for the closed envelope.
 */
export function createIdleEnvelopeAnimation(
  envelopeWrapper: HTMLElement,
  prefersReducedMotion: boolean
): gsap.core.Tween | null {
  if (prefersReducedMotion) return null;

  return gsap.to(envelopeWrapper, {
    y: -6,
    duration: 2.8,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
}

/**
 * Coordinates the multi-layer physical envelope opening timeline:
 * 1. Click prompt fades out softly.
 * 2. Wax seal lifts, glints, and releases while olive sprigs part.
 * 3. Top triangular flap rotates open in 3D (0deg -> 174deg), stepping z-index behind paper mid-turn.
 * 4. Inner invitation card emerges smoothly upward out of the envelope pocket.
 * 5. Envelope gracefully recedes downward while the card rises to presentation scale.
 * 6. Calls onComplete strictly after the invitation paper has completely emerged.
 */
export function playEnvelopeOpeningTimeline(
  els: EnvelopeAnimationElements,
  prefersReducedMotion: boolean,
  onComplete: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({
    onComplete,
  });

  if (prefersReducedMotion) {
    tl.to(els.ctaPrompt, { opacity: 0, duration: 0.2, ease: 'power1.out' })
      .to(els.envelopeWrapper, { opacity: 0, duration: 0.35, ease: 'power2.out' }, 0.08);
    return tl;
  }

  // Stop any idle offset smoothly
  gsap.killTweensOf(els.envelopeWrapper);

  // Step 1: Softly dismiss prompt & settle envelope
  tl.to(
    els.ctaPrompt,
    {
      opacity: 0,
      y: 10,
      duration: 0.32,
      ease: 'power2.out',
    },
    0
  )
    .to(
      els.envelopeWrapper,
      {
        y: 8,
        duration: 0.38,
        ease: 'power2.out',
      },
      0
    )

    // Step 2: Wax seal gently lifts, rotates slightly, and breaks/dissolves away
    .to(
      els.waxSeal,
      {
        scale: 1.1,
        y: -3,
        duration: 0.22,
        ease: 'power2.out',
      },
      0.12
    )
    .to(
      els.waxSeal,
      {
        scale: 1.24,
        opacity: 0,
        rotate: -8,
        y: -12,
        filter: 'blur(2px)',
        duration: 0.38,
        ease: 'power2.in',
      },
      0.32
    );

  if (els.waxLeavesLeft) {
    tl.to(
      els.waxLeavesLeft,
      {
        x: -14,
        y: 6,
        rotate: -18,
        opacity: 0,
        duration: 0.42,
        ease: 'power2.in',
      },
      0.28
    );
  }
  if (els.waxLeavesRight) {
    tl.to(
      els.waxLeavesRight,
      {
        x: 14,
        y: 6,
        rotate: 18,
        opacity: 0,
        duration: 0.42,
        ease: 'power2.in',
      },
      0.28
    );
  }

  // Reveal delicate embossed heart at the envelope seam
  if (els.embossedHeart) {
    tl.to(
      els.embossedHeart,
      {
        opacity: 0.85,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      },
      0.45
    );
  }

  // Step 3: Top opening flap swings upward in true 3D perspective
  tl.to(
    els.topFlap,
    {
      rotateX: 176,
      duration: 0.88,
      ease: 'power2.inOut',
    },
    0.48
  )
    // Midway through the 3D fold (~90deg), drop flap behind the paper layer so the card physically emerges in front of the open flap
    .set(
      els.topFlap,
      {
        zIndex: 10,
      },
      0.92
    )

    // Step 4: Invitation paper emerges upward from inside the pocket
    .to(
      els.cardPaper,
      {
        y: '-58%',
        scale: 1.03,
        duration: 1.15,
        ease: 'power2.out',
      },
      1.08
    )
    // Slight envelope counter-drop for physical weight & momentum
    .to(
      els.envelopeWrapper,
      {
        y: 44,
        duration: 1.15,
        ease: 'power2.out',
      },
      1.08
    )

    // Step 5: Release bottom pocket clip as paper clears the lip, then glide card into full presentation
    .set(
      els.cardClipMask,
      {
        overflow: 'visible',
        zIndex: 45,
      },
      2.12
    )
    .to(
      els.envelopeShell,
      {
        y: 120,
        opacity: 0,
        scale: 0.94,
        duration: 0.72,
        ease: 'power2.inOut',
      },
      2.16
    )
    .to(
      els.cardPaper,
      {
        y: '-24%',
        scale: 1.16,
        opacity: 0,
        duration: 0.72,
        ease: 'power2.inOut',
      },
      2.22
    );

  return tl;
}
