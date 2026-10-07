import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '..';
import { buildAxiosError } from '../test-utils';
import { getAppointment, getAppointments } from '.';

vi.mock('..', async (importOriginal) => ({
  ...(await importOriginal<typeof import('..')>()),
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const mockedApi = vi.mocked(api);

beforeEach(() => {
  vi.resetAllMocks();
});

describe('getAppointments', () => {
  it('passes filters as query params and returns the list', async () => {
    mockedApi.get.mockResolvedValue({ data: [{ id: 1 }] });

    const result = await getAppointments({ employee_id: 3 });

    expect(mockedApi.get).toHaveBeenCalledWith('/appointments', {
      params: { employee_id: 3 },
    });
    expect(result).toEqual([{ id: 1 }]);
  });

  it('throws an ApiError with the server message', async () => {
    mockedApi.get.mockRejectedValue(buildAxiosError(500, 'db is down'));

    await expect(getAppointments()).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Не удалось загрузить записи: db is down',
      status: 500,
    });
  });
});

describe('getAppointment', () => {
  it('requests a single appointment by id', async () => {
    mockedApi.get.mockResolvedValue({ data: { id: 5 } });

    await expect(getAppointment(5)).resolves.toEqual({ id: 5 });
    expect(mockedApi.get).toHaveBeenCalledWith('/appointments/5');
  });
});
