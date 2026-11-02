import { describe, expect, it } from "vitest";
import { formatRanks, stripHtml, wrapIndex } from "./format";

describe("stripHtml", () => {
  it("turns <br> into line breaks and removes other tags", () => {
    const html = "After killing 9 minions, Ahri heals.<br>Deals <magicDamage>magic damage</magicDamage>.";
    expect(stripHtml(html)).toBe("After killing 9 minions, Ahri heals.\nDeals magic damage.");
  });

  it("collapses long runs of line breaks and trims the ends", () => {
    expect(stripHtml("<br>First<br><br><br><br>Second<br>")).toBe("First\n\nSecond");
  });
});

describe("formatRanks", () => {
  it("shows a single number when every rank has the same value", () => {
    expect(formatRanks([7, 7, 7, 7, 7])).toBe("7");
  });

  it("joins the values when they change per rank", () => {
    expect(formatRanks([55, 65, 75])).toBe("55 / 65 / 75");
  });

  it("returns an empty string for an empty list", () => {
    expect(formatRanks([])).toBe("");
  });
});

describe("wrapIndex", () => {
  it("keeps an index that is already in range", () => {
    expect(wrapIndex(2, 5)).toBe(2);
  });

  it("wraps past the end back to the start, and before the start to the end", () => {
    expect(wrapIndex(5, 5)).toBe(0);
    expect(wrapIndex(-1, 5)).toBe(4);
  });

  it("returns 0 for an empty list instead of NaN", () => {
    expect(wrapIndex(3, 0)).toBe(0);
  });
});
