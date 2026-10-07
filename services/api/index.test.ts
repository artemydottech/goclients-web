import { AxiosError, type AxiosResponse } from "axios";
import { describe, expect, it } from "vitest";
import { ApiError, handleApiError, isApiError } from ".";

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

  it("reads the message field of a json response", () => {
    const error = handleApiError(
      buildAxiosError(400, { message: "bad time" }),
      "Не удалось перенести",
    );
    expect(error.message).toBe("Не удалось перенести: bad time");
  });

  it("uses the default message when the response body is empty", () => {
    const error = handleApiError(buildAxiosError(500, "  "), "Ошибка");
    expect(error.message).toBe("Ошибка");
    expect(error.status).toBe(500);
  });
});
