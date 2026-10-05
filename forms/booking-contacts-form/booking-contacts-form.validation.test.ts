import { describe, expect, it } from "vitest";
import { bookingContactsFormSchema } from "./booking-contacts-form.validation";

const valid = { name: "Анна", phone: "+7 900 123-45-67", comment: "" };

describe("bookingContactsFormSchema", () => {
  it("accepts valid contacts", () => {
    expect(bookingContactsFormSchema.safeParse(valid).success).toBe(true);
  });

  it("trims the name and comment", () => {
    const result = bookingContactsFormSchema.parse({
      ...valid,
      name: "  Анна ",
      comment: " ждём ",
    });
    expect(result.name).toBe("Анна");
    expect(result.comment).toBe("ждём");
  });

  it("requires a name", () => {
    const result = bookingContactsFormSchema.safeParse({
      ...valid,
      name: "   ",
    });
    expect(result.error?.issues[0].message).toBe("Как к вам обращаться?");
  });
});
