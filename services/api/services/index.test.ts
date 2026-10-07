import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '..';
import { buildAxiosError } from '../test-utils';
import {
  createService,
  deleteService,
  getService,
  getServiceEmployees,
  getServices,
} from '.';

vi.mock('..', async (importOriginal) => ({
  ...(await importOriginal<typeof import('..')>()),
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const mockedApi = vi.mocked(api);

beforeEach(() => {
  vi.resetAllMocks();
});

describe('getServices', () => {
  it('filters services by company', async () => {
    mockedApi.get.mockResolvedValue({ data: [{ id: 1 }] });

    await expect(getServices(2)).resolves.toEqual([{ id: 1 }]);
    expect(mockedApi.get).toHaveBeenCalledWith('/services', {
      params: { company_id: 2 },
    });
  });
});

describe('getService', () => {
  it('requests a service by id', async () => {
    mockedApi.get.mockResolvedValue({ data: { id: 3 } });

    await expect(getService(3)).resolves.toEqual({ id: 3 });
    expect(mockedApi.get).toHaveBeenCalledWith('/services/3');
  });
});

describe('getServiceEmployees', () => {
  it('requests employees of a service', async () => {
    mockedApi.get.mockResolvedValue({ data: [{ id: 9 }] });

    await expect(getServiceEmployees(3)).resolves.toEqual([{ id: 9 }]);
    expect(mockedApi.get).toHaveBeenCalledWith('/services/3/employees');
  });

  it('throws an ApiError on failure', async () => {
    mockedApi.get.mockRejectedValue(buildAxiosError(500, ''));

    await expect(getServiceEmployees(3)).rejects.toMatchObject({
      message: 'Не удалось загрузить мастеров услуги',
    });
  });
});

describe('createService', () => {
  it('posts the service and returns the created id', async () => {
    mockedApi.post.mockResolvedValue({ data: { id: 11 } });
    const body = {
      company_id: 1,
      name: 'Стрижка',
      description: '',
      duration: 60,
      price: 1500,
    };

    await expect(createService(body)).resolves.toEqual({ id: 11 });
    expect(mockedApi.post).toHaveBeenCalledWith('/services', body);
  });
});

describe('deleteService', () => {
  it('deletes by id', async () => {
    mockedApi.delete.mockResolvedValue({});

    await deleteService(11);

    expect(mockedApi.delete).toHaveBeenCalledWith('/services/11');
  });

  it('throws an ApiError on failure', async () => {
    mockedApi.delete.mockRejectedValue(buildAxiosError(409, 'in use'));

    await expect(deleteService(11)).rejects.toMatchObject({
      message: 'Не удалось удалить услугу: in use',
      status: 409,
    });
  });
});
