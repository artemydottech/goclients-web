import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Client } from "@/types";
import { createAppointment } from "../appointments";
import { createClient, getClients } from "../clients";
import { createBooking } from ".";

vi.mock("../appointments");
vi.mock("../clients");

const request = {
  companyId: 1,
  serviceId: 2,
  employeeId: 3,
  startsAt: "2026-10-08T10:00:00+05:00",
  name: "Анна",
  phone: "+7 (900) 123-45-67",
  comment: "первый визит",
};

const buildClient = (overrides: Partial<Client>): Client => ({
  id: 10,
  company_id: 1,
  name: "Иван",
  phone: "79001234567",
  email: "",
  comment: "",
  ...overrides,
});

describe("createBooking", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(createAppointment).mockResolvedValue({ id: 99 } as never);
    vi.mocked(createClient).mockResolvedValue({ id: 50 } as never);
  });

  it("reuses a client whose phone matches by the last ten digits", async () => {
    vi.mocked(getClients).mockResolvedValue([
      buildClient({ id: 7, phone: "89001234567" }),
    ]);

    await createBooking(request);

    expect(createClient).not.toHaveBeenCalled();
    expect(vi.mocked(createAppointment).mock.calls[0][0].client_id).toBe(7);
  });

  it("creates a client when no phone matches", async () => {
    vi.mocked(getClients).mockResolvedValue([
      buildClient({ id: 7, phone: "79990000000" }),
    ]);

    await createBooking(request);

    expect(createClient).toHaveBeenCalledWith({
      company_id: 1,
      name: "Анна",
      phone: "+7 (900) 123-45-67",
      email: "",
      comment: "",
    });
    expect(vi.mocked(createAppointment).mock.calls[0][0].client_id).toBe(50);
  });
});
