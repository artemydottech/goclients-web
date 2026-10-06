import { describe, expect, it } from "vitest";
import {
  formatPrice,
  truncate,
  formatDuration,
  getInitials,
  formatPhone,
  onlyDigits,
  doesPathMatch,
} from ".";

describe("formatPrice", () => {
  it("formats rubles without fraction digits", () => {
    expect(formatPrice(1500).replace(/\s/g, " ")).toBe("1 500 ₽");
  });

  it("formats zero", () => {
    expect(formatPrice(0).replace(/\s/g, " ")).toBe("0 ₽");
  });
});

describe("truncate", () => {
  it("returns empty string for empty input", () => {
    expect(truncate("", 5)).toBe("");
  });

  it("keeps strings within the limit", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });

  it("cuts long strings and appends ellipsis within the limit", () => {
    expect(truncate("hello world", 6)).toBe("hello…");
  });

  it("supports custom ellipsis", () => {
    expect(truncate("hello world", 8, "...")).toBe("hello...");
  });
});

describe("formatDuration", () => {
  it("formats minutes only", () => {
    expect(formatDuration(45)).toBe("45 мин");
  });

  it("formats whole hours", () => {
    expect(formatDuration(120)).toBe("2 ч");
  });

  it("formats hours with minutes", () => {
    expect(formatDuration(95)).toBe("1 ч 35 мин");
  });
});

describe("getInitials", () => {
  it("takes first letters of the first two words", () => {
    expect(getInitials("иван петров")).toBe("ИП");
  });

  it("ignores extra spaces and words", () => {
    expect(getInitials("  Анна  Мария  Ли ")).toBe("АМ");
  });

  it("handles a single word", () => {
    expect(getInitials("Анна")).toBe("А");
  });

  it("returns empty string for blank input", () => {
    expect(getInitials("   ")).toBe("");
  });
});

describe("onlyDigits", () => {
  it("strips non-digit characters", () => {
    expect(onlyDigits("+7 (900) 123-45-67")).toBe("79001234567");
  });

  it("returns empty string when there are no digits", () => {
    expect(onlyDigits("abc")).toBe("");
  });
});

describe("formatPhone", () => {
  it("formats an eleven digit russian number", () => {
    expect(formatPhone("79001234567")).toBe("+7 900 123-45-67");
  });

  it("returns other lengths unchanged", () => {
    expect(formatPhone("9001234567")).toBe("9001234567");
    expect(formatPhone("")).toBe("");
  });
});

describe("doesPathMatch", () => {
  it("matches the exact path", () => {
    expect(doesPathMatch("/dashboard", "/dashboard")).toBe(true);
  });

  it("matches nested paths", () => {
    expect(doesPathMatch("/dashboard/1/clients", "/dashboard")).toBe(true);
  });

  it("does not match a path that only shares a prefix", () => {
    expect(doesPathMatch("/dashboard-old", "/dashboard")).toBe(false);
  });

  it("does not match unrelated paths", () => {
    expect(doesPathMatch("/book", "/dashboard")).toBe(false);
  });
});
