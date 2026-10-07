import { AxiosError, type AxiosResponse } from "axios";
import { describe, expect, it } from "vitest";
import { handleApiError } from ".";

const buildAxiosError = (status: number, data: unknown): AxiosError =>
  new AxiosError("failed", undefined, undefined, undefined, {
    status,
    data,
  } as AxiosResponse);

describe("handleApiError", () => {
  it("appends a plain text server message", () => {
    const error = handleApiError(
      buildAxiosError(409, "slot is taken\n"),
      "Не удалось создать запись",
    );
    expect(error.message).toBe("Не удалось создать запись: slot is taken");
    expect(error.status).toBe(409);
  });
});
