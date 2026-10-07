import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '..';
import { buildAxiosError } from '../test-utils';
import { getClient, getClientStats, getClients } from '.';

vi.mock('..', async (importOriginal) => ({
  ...(await importOriginal<typeof import('..')>()),
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const mockedApi = vi.mocked(api);

beforeEach(() => {
  vi.resetAllMocks();
});

describe('getClients', () => {
  it('filters clients by company', async () => {
    mockedApi.get.mockResolvedValue({ data: [{ id: 1 }] });

    await expect(getClients(2)).resolves.toEqual([{ id: 1 }]);
    expect(mockedApi.get).toHaveBeenCalledWith('/clients', {
      params: { company_id: 2 },
    });
  });

  it('throws an ApiError on failure', async () => {
    mockedApi.get.mockRejectedValue(buildAxiosError(500, ''));

    await expect(getClients(2)).rejects.toMatchObject({
      message: 'Не удалось загрузить клиентов',
      status: 500,
    });
  });
});

describe('getClient', () => {
  it('requests a client by id', async () => {
    mockedApi.get.mockResolvedValue({ data: { id: 3 } });

    await expect(getClient(3)).resolves.toEqual({ id: 3 });
    expect(mockedApi.get).toHaveBeenCalledWith('/clients/3');
  });
});

describe('getClientStats', () => {
  it('requests stats of a client', async () => {
    mockedApi.get.mockResolvedValue({ data: { client_id: 3 } });

    await expect(getClientStats(3)).resolves.toEqual({ client_id: 3 });
    expect(mockedApi.get).toHaveBeenCalledWith('/clients/3/stats');
  });
});
