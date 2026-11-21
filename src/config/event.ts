/**
 * Centralized Configuration — Ali & Zeynab Wedding Invitation
 *
 * Update any of the values below to customize the event date/year,
 * background music track, or Neshan navigation destination.
 */

import envelopeBackdropImg from '../assets/images/envelope_scene_backdrop_1795272431733.jpg';
import invitationCanvasImg from '../assets/images/invitation_paper_canvas_1795272431780.jpg';
import detailsCanvasImg from '../assets/images/details_paper_canvas_1795272431550.jpg';
import cardFloralCornerImg from '../assets/images/card_floral_corner_1795272431543.jpg';

/**
 * Resolves static files in /public relative to Vite's base URL so audio and
 * static assets work seamlessly on GitHub Pages subpaths and root domains.
 */
function resolvePublicAsset(pathFromPublic: string): string {
  const clean = pathFromPublic.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${clean}`;
}

export const EVENT_CONFIG = {
  /**
   * Exact ceremony copy (rendered as real HTML Persian text).
   */
  copy: {
    openingLine: 'در سایه‌سار عشق و مهر',
    occasionLine: 'در شب عقدکنان',
    coupleNames: 'علی و زینب',
        closingLine: 'چشم‌انتظار حضور گرم و صمیمانه شما هستیم.',
        familyNames: 'شفیعی - تیموری',
    openEnvelopeCta: 'برای دیدن دعوتنامه کلیک کنید',
    viewDetailsCta: 'مشاهده جزئیات مراسم',
    backToInvitationCta: 'بازگشت به دعوتنامه',
    neshanCta: 'مسیریابی در نشان',
    eventCompletedTitle: 'مراسم عقدکنان برگزار شد',
    eventCompletedSubtitle: 'با سپاس از حضور گرم، دعای خیر و همراهی صمیمانه شما',
  },

  /**
   * Display labels for the Event Details screen.
   */
  event: {
    dateLabel: 'پنجشنبه ۵ آذرماه',
    timeLabel: 'ساعت ۱۸',
    venueName: 'تالار پذیرایی معلم کبودراهنگ',
  },

  /**
   * Event date & time in ISO 8601 format with Iran Standard Time (Asia/Tehran, +03:30).
   *
   * IMPORTANT FOR OWNER:
   * The exact ceremony year was not explicitly specified in the brief.
   * This defaults to the upcoming Thursday, 5 Azar 1405 (2026-11-26 at 18:00 Asia/Tehran).
   * Please verify or update the Gregorian year/date below to match your exact ceremony year.
   * Set to null if you wish to temporarily hide the live countdown.
   */
  EVENT_DATE_ISO: '2026-11-26T18:00:00+03:30' as string | null,
  TIMEZONE: 'Asia/Tehran',

  /**
   * Neshan Maps destination URL supplied by the project owner.
   */
  NESHAN_DIRECTIONS_URL:
    'https://neshan.org/maps/places/3c22fe83fa3ed903fa97d1a7da43ff7a#c35.214-48.737-16z-0p',

  /**
   * Custom wedding background music file supplied by the project owner.
   * To replace the music later, place a new .mp3 file inside /public/assets/music/
   * and update the relative path below (e.g. resolvePublicAsset('assets/music/wedding-song.mp3')).
   */
  MUSIC_SRC: resolvePublicAsset('assets/aistudio/l7trd1xa9k_b9c6c283.mp3'),
  MUSIC_TITLE: 'نوای شب عقدکنان',

  /**
   * Statically bundled visual backdrop & botanical ornament assets
   * (automatically hashed and relative-linked by Vite for GitHub Pages).
   */
  assets: {
    envelopeBackdrop: envelopeBackdropImg,
    invitationCanvas: invitationCanvasImg,
    detailsCanvas: detailsCanvasImg,
    cardFloralCorner: cardFloralCornerImg,
  },
} as const;

/**
 * Converts Western ASCII digits (0-9) to Persian numerals (۰-۹).
 */
export function toPersianDigits(input: string | number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(input).replace(/\d/g, (digit) => persianDigits[Number(digit)]);
}
