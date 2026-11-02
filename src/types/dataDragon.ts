// Shared shapes used by every Data Dragon endpoint.

/** Image reference; the file name in `full` is joined with a CDN base URL. */
export interface DataDragonImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Envelope around every Data Dragon list: items are keyed by id, not stored in an array. */
export interface DataDragonResponse<T> {
  type: string;
  version: string;
  data: Record<string, T>;
}
