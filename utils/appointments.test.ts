import { describe, expect, it } from "vitest";
import type { Appointment, AppointmentStatus } from "@/types";
import { getNextStatuses, isActiveAppointment } from "./appointments";

const buildAppointment = (
  overrides: Partial<Appointment> = {},
): Appointment => ({
  id: 1,
  company_id: 1,
  client_id: 1,
  employee_id: 1,
  service_id: 1,
  starts_at: "2026-10-05T10:00:00Z",
  ends_at: "2026-10-05T11:00:00Z",
  status: "pending",
  comment: "",
  price: 1000,
  ...overrides,
});

describe("isActiveAppointment", () => {
  it.each<[AppointmentStatus, boolean]>([
    ["pending", true],
    ["confirmed", true],
    ["cancelled", false],
    ["completed", false],
    ["no_show", false],
  ])("%s -> %s", (status, expected) => {
    expect(isActiveAppointment(buildAppointment({ status }))).toBe(expected);
  });
});

describe("getNextStatuses", () => {
  const startsAt = Date.parse("2026-10-05T10:00:00Z");
  const beforeStart = startsAt - 60_000;
  const afterStart = startsAt + 60_000;

  it("offers only confirm and cancel for a pending appointment before start", () => {
    expect(
      getNextStatuses(buildAppointment({ status: "pending" }), beforeStart),
    ).toEqual(["confirmed", "cancelled"]);
  });

  it("offers every transition for a pending appointment after start", () => {
    expect(
      getNextStatuses(buildAppointment({ status: "pending" }), afterStart),
    ).toEqual(["confirmed", "cancelled", "completed", "no_show"]);
  });

  it("allows completed and no_show only after start for a confirmed one", () => {
    const confirmed = buildAppointment({ status: "confirmed" });
    expect(getNextStatuses(confirmed, beforeStart)).toEqual(["cancelled"]);
    expect(getNextStatuses(confirmed, afterStart)).toEqual([
      "cancelled",
      "completed",
      "no_show",
    ]);
  });

  it("treats the exact start moment as started", () => {
    expect(
      getNextStatuses(buildAppointment({ status: "confirmed" }), startsAt),
    ).toContain("completed");
  });

  it.each<AppointmentStatus>(["cancelled", "completed", "no_show"])(
    "has no transitions from %s",
    (status) => {
      expect(getNextStatuses(buildAppointment({ status }), afterStart)).toEqual(
        [],
      );
    },
  );
});
