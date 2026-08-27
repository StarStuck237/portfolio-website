/**
 * A stretch of prose that carries a link partway through. Copy stays plain text
 * in the data files — the template decides what an anchor looks like — so no
 * section has to hand raw HTML to the renderer.
 */
export interface ProseRun {
  readonly text: string;
  readonly href?: string;
}

export type Paragraph = readonly ProseRun[];
