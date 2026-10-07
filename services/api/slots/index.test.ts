import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '..';
import { buildAxiosError } from '../test-utils';
import { getSlots } from '.';

vi.mock('..', async (importOriginal) => ({
  ...(await importOriginal<typeof import('..')>()),
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const mockedApi = vi.mocked(api);

beforeEach(() => {
  vi.resetAllMocks();
});

describe('getSlots', () => {
  it('passes the params as a query and returns slots', async () => {
    mockedApi.get.mockResolvedValue({
      data: ['2026-10-08T10:00:00+05:00', '2026-10-08T10:30:00+05:00'],
    });
    const params = {
      employee_id: 2,
      service_id: 3,
      date: '2026-10-08',
      step: 30,
    };

    const slots = await getSlots(params);

    expect(mockedApi.get).toHaveBeenCalledWith('/slots', { params });
    expect(slots).toHaveLength(2);
  });

  it('throws an ApiError on failure', async () => {
    mockedApi.get.mockRejectedValue(buildAxiosError(400, 'bad date'));

    await expect(
      getSlots({ employee_id: 2, service_id: 3, date: 'x' }),
    ).rejects.toMatchObject({
      message: 'Не удалось загрузить свободное время: bad date',
      status: 400,
    });
  });
});
