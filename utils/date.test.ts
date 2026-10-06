import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getCompanyToday,
  inCompanyTimezone,
  parseDateParam,
  toCompanyDateTime,
  toDateKey,
} from "./date";

describe("parseDateParam", () => {
  it("accepts a date key", () => {
    expect(parseDateParam("2026-10-05")).toBe("2026-10-05");
  });

  it("returns null for missing value", () => {
    expect(parseDateParam()).toBeNull();
    expect(parseDateParam("")).toBeNull();
  });

  it("returns null for malformed values", () => {
    expect(parseDateParam("05.10.2026")).toBeNull();
    expect(parseDateParam("2026-10-5")).toBeNull();
    expect(parseDateParam("2026-10-05T10:00")).toBeNull();
  });
});

describe("toCompanyDateTime", () => {
  it("applies the company timezone offset", () => {
    expect(toCompanyDateTime("2026-10-05", "10:00", "Europe/Moscow")).toBe(
      "2026-10-05T10:00:00+03:00",
    );
    expect(toCompanyDateTime("2026-10-05", "10:00", "Asia/Yekaterinburg")).toBe(
      "2026-10-05T10:00:00+05:00",
    );
  });

  it("falls back to UTC for an empty timezone", () => {
    expect(toCompanyDateTime("2026-10-05", "10:00", "")).toBe(
      "2026-10-05T10:00:00Z",
    );
  });
});

describe("inCompanyTimezone", () => {
  it("shifts a utc instant into the company timezone", () => {
    expect(
      inCompanyTimezone("2026-10-05T22:30:00Z", "Asia/Yekaterinburg").format(
        "HH:mm",
      ),
    ).toBe("03:30");
  });

  it("uses UTC for an empty timezone", () => {
    expect(inCompanyTimezone("2026-10-05T22:30:00Z", "").format("HH:mm")).toBe(
      "22:30",
    );
  });
});

describe("toDateKey", () => {
  it("returns the local date of the company", () => {
    expect(toDateKey("2026-10-05T22:30:00Z", "Asia/Yekaterinburg")).toBe(
      "2026-10-06",
    );
    expect(toDateKey("2026-10-05T22:30:00Z", "Europe/Moscow")).toBe(
      "2026-10-06",
    );
    expect(toDateKey("2026-10-05T22:30:00Z", "Europe/London")).toBe(
      "2026-10-05",
    );
  });
});

describe("getCompanyToday", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-05T22:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the date in the company timezone", () => {
    expect(getCompanyToday("Asia/Yekaterinburg")).toBe("2026-10-06");
    expect(getCompanyToday("Europe/London")).toBe("2026-10-05");
  });

  it("falls back to UTC for an empty timezone", () => {
    expect(getCompanyToday("")).toBe("2026-10-05");
  });
});
