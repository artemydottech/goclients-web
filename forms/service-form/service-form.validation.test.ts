import { describe, expect, it } from "vitest";
import { serviceFormSchema } from "./service-form.validation";

const valid = { name: "Стрижка", description: "", duration: 60, price: 1500 };

const firstMessage = (values: Record<string, unknown>) =>
  serviceFormSchema.safeParse({ ...valid, ...values }).error?.issues[0].message;

describe("serviceFormSchema", () => {
  it("accepts a valid service", () => {
    expect(serviceFormSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts a free service", () => {
    expect(serviceFormSchema.safeParse({ ...valid, price: 0 }).success).toBe(
      true,
    );
  });

  it("requires a name", () => {
    expect(firstMessage({ name: "  " })).toBe("Обязательное поле");
  });

  it("rejects a negative price", () => {
    expect(firstMessage({ price: -1 })).toBe(
      "Цена не может быть отрицательной",
    );
  });

  it("rejects a missing price and duration", () => {
    expect(firstMessage({ price: undefined })).toBe("Укажите цену");
    expect(firstMessage({ duration: undefined })).toBe("Укажите длительность");
  });

  it("limits duration to whole minutes within a day", () => {
    expect(firstMessage({ duration: 0 })).toBe("Минимум 1 минута");
    expect(firstMessage({ duration: 30.5 })).toBe("Только целые минуты");
    expect(firstMessage({ duration: 1441 })).toBe("Не больше суток");
    expect(
      serviceFormSchema.safeParse({ ...valid, duration: 1440 }).success,
    ).toBe(true);
  });
});
