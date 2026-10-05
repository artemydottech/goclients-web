import { describe, expect, it } from "vitest";
import {
  scheduleFormSchema,
  type ScheduleDayValues,
} from "./schedule-form.validation";

const buildDay = (
  overrides: Partial<ScheduleDayValues> = {},
): ScheduleDayValues => ({
  weekday: 1,
  isWorking: true,
  starts_at: "09:00",
  ends_at: "18:00",
  hasBreak: false,
  break_starts_at: "13:00",
  break_ends_at: "14:00",
  ...overrides,
});

const validate = (day: ScheduleDayValues) =>
  scheduleFormSchema.safeParse({ days: [day] });

describe("scheduleFormSchema", () => {
  it("accepts a regular working day", () => {
    expect(validate(buildDay()).success).toBe(true);
  });

  it("accepts a working day with a break inside it", () => {
    expect(validate(buildDay({ hasBreak: true })).success).toBe(true);
  });

  it("rejects malformed time", () => {
    const result = validate(buildDay({ starts_at: "9:00" }));
    expect(result.error?.issues[0].message).toBe("Формат ЧЧ:ММ");
  });

  it("rejects out of range hours and minutes", () => {
    expect(validate(buildDay({ ends_at: "24:00" })).success).toBe(false);
    expect(validate(buildDay({ ends_at: "18:60" })).success).toBe(false);
  });
});
