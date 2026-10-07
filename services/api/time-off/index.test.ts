import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '..';
import { buildAxiosError } from '../test-utils';
import { createTimeOff, deleteTimeOff, getEmployeeTimeOff } from '.';

vi.mock('..', async (importOriginal) => ({
  ...(await importOriginal<typeof import('..')>()),
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const mockedApi = vi.mocked(api);

beforeEach(() => {
  vi.resetAllMocks();
});

describe('getEmployeeTimeOff', () => {
  it('requests time off of an employee', async () => {
    mockedApi.get.mockResolvedValue({ data: [{ id: 1 }] });

    await expect(getEmployeeTimeOff(2)).resolves.toEqual([{ id: 1 }]);
    expect(mockedApi.get).toHaveBeenCalledWith('/employees/2/time-off');
  });
});

describe('createTimeOff', () => {
  it('posts the period without the employee id in the body', async () => {
    mockedApi.post.mockResolvedValue({ data: { id: 3 } });

    const result = await createTimeOff({
      employeeId: 2,
      starts_at: '2026-10-10T00:00:00+05:00',
      ends_at: '2026-10-12T23:59:00+05:00',
      reason: 'Отпуск',
    });

    expect(mockedApi.post).toHaveBeenCalledWith('/employees/2/time-off', {
      starts_at: '2026-10-10T00:00:00+05:00',
      ends_at: '2026-10-12T23:59:00+05:00',
      reason: 'Отпуск',
    });
    expect(result).toEqual({ id: 3 });
  });

  it('throws an ApiError when the period overlaps', async () => {
    mockedApi.post.mockRejectedValue(buildAxiosError(409, 'overlaps'));

    await expect(
      createTimeOff({
        employeeId: 2,
        starts_at: '2026-10-10T00:00:00+05:00',
        ends_at: '2026-10-12T23:59:00+05:00',
        reason: 'Отпуск',
      }),
    ).rejects.toMatchObject({
      message: 'Не удалось добавить отпуск: overlaps',
      status: 409,
    });
  });
});

describe('deleteTimeOff', () => {
  it('deletes by time off id only', async () => {
    mockedApi.delete.mockResolvedValue({});

    await deleteTimeOff({ id: 3, employeeId: 2 });

    expect(mockedApi.delete).toHaveBeenCalledWith('/time-off/3');
  });
});
