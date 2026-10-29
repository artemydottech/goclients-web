import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '..';
import { buildAxiosError } from '../test-utils';
import {
  createService,
  updateService,
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
      signal: undefined,
      params: { company_id: 2 },
    });
  });
});

describe('getService', () => {
  it('requests a service by id', async () => {
    mockedApi.get.mockResolvedValue({ data: { id: 3 } });

    await expect(getService(3)).resolves.toEqual({ id: 3 });
    expect(mockedApi.get).toHaveBeenCalledWith('/services/3', {
      signal: undefined,
    });
  });
});

describe('getServiceEmployees', () => {
  it('requests employees of a service', async () => {
    mockedApi.get.mockResolvedValue({ data: [{ id: 9 }] });

    await expect(getServiceEmployees(3)).resolves.toEqual([{ id: 9 }]);
    expect(mockedApi.get).toHaveBeenCalledWith('/services/3/employees', {
      signal: undefined,
    });
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

describe('updateService', () => {
  const body = { name: 'Стрижка', description: '', duration: 45, price: 1500 };

  it('sends editable fields with PUT and handles a 204 response', async () => {
    mockedApi.put.mockResolvedValue({ status: 204 });

    await expect(updateService({ id: 7, body })).resolves.toBeUndefined();
    expect(mockedApi.put).toHaveBeenCalledWith('/services/7', body);
  });

  it('keeps backend validation details', async () => {
    mockedApi.put.mockRejectedValue(
      buildAxiosError(400, { error: 'invalid data' }),
    );

    await expect(updateService({ id: 7, body })).rejects.toMatchObject({
      message: 'Не удалось сохранить услугу: invalid data',
      status: 400,
    });
  });

  it('reports deleted entities without returning a successful save', async () => {
    mockedApi.put.mockRejectedValue(
      buildAxiosError(404, { error: 'not found' }),
    );

    await expect(updateService({ id: 7, body })).rejects.toMatchObject({
      status: 404,
    });
  });
});

it('passes an AbortSignal to getServices', async () => {
  const signal = new AbortController().signal;
  mockedApi.get.mockResolvedValue({ data: [] });
  await getServices(7, signal);
  expect(mockedApi.get).toHaveBeenCalledWith(
    '/services',
    expect.objectContaining({ signal }),
  );
});

it('passes an AbortSignal to getService', async () => {
  const signal = new AbortController().signal;
  mockedApi.get.mockResolvedValue({ data: [] });
  await getService(7, signal);
  expect(mockedApi.get).toHaveBeenCalledWith(
    '/services/7',
    expect.objectContaining({ signal }),
  );
});

it('passes an AbortSignal to getServiceEmployees', async () => {
  const signal = new AbortController().signal;
  mockedApi.get.mockResolvedValue({ data: [] });
  await getServiceEmployees(7, signal);
  expect(mockedApi.get).toHaveBeenCalledWith(
    '/services/7/employees',
    expect.objectContaining({ signal }),
  );
});
