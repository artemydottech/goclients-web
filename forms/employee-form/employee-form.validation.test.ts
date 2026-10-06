import { describe, expect, it } from "vitest";
import { employeeFormSchema } from "./employee-form.validation";

const valid = { name: "Анна", surname: "", position: "", avatar: "" };

describe("employeeFormSchema", () => {
  it("accepts a name only", () => {
    expect(employeeFormSchema.safeParse(valid).success).toBe(true);
  });

  it("requires a name", () => {
    const result = employeeFormSchema.safeParse({ ...valid, name: "  " });
    expect(result.error?.issues[0].message).toBe("Обязательное поле");
  });

  it("validates the avatar link", () => {
    expect(
      employeeFormSchema.safeParse({
        ...valid,
        avatar: "https://example.com/a.png",
      }).success,
    ).toBe(true);
    const result = employeeFormSchema.safeParse({ ...valid, avatar: "a.png" });
    expect(result.error?.issues[0].message).toBe("Некорректная ссылка");
  });
});
