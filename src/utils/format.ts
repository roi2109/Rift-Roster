/**
 * Turns Data Dragon's HTML descriptions into plain text.
 * `<br>` becomes a line break and every other tag is dropped, so no HTML is ever injected into the page.
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Shows per-rank values like a tooltip: `[7, 7, 7]` → "7", `[10, 9, 8]` → "10 / 9 / 8". */
export function formatRanks(values: number[]): string {
  if (values.length === 0) {
    return "";
  }
  const allSame = values.every((value) => value === values[0]);
  return allSame ? String(values[0]) : values.join(" / ");
}

/** Moves through a list in a loop: stepping past the last index goes back to 0, and before 0 goes to the end. */
export function wrapIndex(index: number, length: number): number {
  if (length === 0) {
    return 0;
  }
  return ((index % length) + length) % length;
}
