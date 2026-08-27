export interface Photo {
  readonly src: string;
  readonly alt: string;
  /** CSS object-position, chosen per photo so the crop keeps the dancers. */
  readonly focus: string;
}

export interface PhotoCredit {
  readonly photographer: string;
  readonly event: string;
}
