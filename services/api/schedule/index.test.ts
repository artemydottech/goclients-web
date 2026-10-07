import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '..';
import { buildAxiosError } from '../test-utils';
import { getEmployeeSchedule, updateEmployeeSchedule } from '.';

vi.mock('..', async (importOriginal) => ({
  ...(await importOriginal<typeof import('..')>()),
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const mockedApi = vi.mocked(api);

beforeEach(() => {
  vi.resetAllMocks();
});

describe('getEmployeeSchedule', () => {
  it('requests the weekly schedule of an employee', async () => {
    mockedApi.get.mockResolvedValue({ data: [{ weekday: 1 }] });

    await expect(getEmployeeSchedule(2)).resolves.toEqual([{ weekday: 1 }]);
    expect(mockedApi.get).toHaveBeenCalledWith('/employees/2/schedule');
  });

  it('throws an ApiError on failure', async () => {
    mockedApi.get.mockRejectedValue(buildAxiosError(500, ''));

    await expect(getEmployeeSchedule(2)).rejects.toMatchObject({
      message: 'Не удалось загрузить график',
    });
  });
});

describe('updateEmployeeSchedule', () => {
  it('puts the days under the days key', async () => {
    mockedApi.put.mockResolvedValue({});
    const days = [{ weekday: 1, starts_at: '09:00', ends_at: '18:00' }];

    await updateEmployeeSchedule({ employeeId: 2, days });

    expect(mockedApi.put).toHaveBeenCalledWith('/employees/2/schedule', {
      days,
    });
  });
});
