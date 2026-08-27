import { Photo, PhotoCredit } from '../core/models/photo';

/**
 * The hero collage: three overlapping frames at slight angles, the middle one
 * lifted off the page. Order matters — the template positions them by index.
 */
export const HERO_PHOTOS: readonly Photo[] = [
  {
    src: '/dance/dance-01.jpg',
    alt: 'Ben dancing with a partner in a blue floral skirt',
    focus: '52% 30%',
  },
  { src: '/dance/dance-02.jpg', alt: 'Ben mid-dance, both partners laughing', focus: '40% 40%' },
  {
    src: '/dance/dance-03.jpg',
    alt: 'A close connection under purple stage light',
    focus: 'center',
  },
];

/** The single large photo beside the dance copy. */
export const DANCE_FEATURE: Photo = {
  src: '/dance/dance-04.jpg',
  alt: 'Ben reaching for his partner’s hand on the slot',
  focus: '50% 35%',
};

/** The stepped strip below the dance copy. */
export const DANCE_STRIP: readonly Photo[] = [
  { src: '/dance/dance-05.jpg', alt: 'Dancing in front of a red curtain', focus: '40% 45%' },
  { src: '/dance/dance-06.jpg', alt: 'Competing in a numbered heat', focus: '45% 50%' },
  {
    src: '/dance/dance-07.jpg',
    alt: 'Ben and his partner mid-routine, arms extended, in front of a blue curtain',
    focus: 'center',
  },
];

/**
 * Photographer credit for the hero. Two of these photos carry event
 * watermarks, so the shooters should be named — left empty until Ben supplies
 * them, and the credit block is skipped entirely while it is.
 */
export const HERO_CREDIT: PhotoCredit | null = null;
