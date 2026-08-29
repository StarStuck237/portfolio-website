/**
 * One competition video on YouTube. Titles on the channel read
 * `<round> - <event> <year>`, sometimes with a partner in front; that gets
 * split apart here so the card can lead with the round and keep the rest as
 * meta.
 */
export interface Video {
  /** The YouTube watch id — the links and thumbnails are derived from it. */
  readonly id: string;
  /** The round or division, as it reads on the card. */
  readonly title: string;
  readonly event: string;
  readonly year: number;
  /** Runtime as YouTube shows it. */
  readonly duration: string;
  /**
   * Upload date, `YYYY-MM-DD`. The band sorts on this so the newest video is
   * always the featured one; videos sharing a date keep the order they are
   * written in below.
   */
  readonly published: string;
  /** Set on strictlies and routines; omitted for jack and jills. */
  readonly partner?: string;
}
