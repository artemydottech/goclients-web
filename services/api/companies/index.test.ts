import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '..';
import { buildAxiosError } from '../test-utils';
import { createCompany, deleteCompany, getCompanies, getCompany } from '.';

vi.mock('..', async (importOriginal) => ({
  ...(await importOriginal<typeof import('..')>()),
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const mockedApi = vi.mocked(api);

beforeEach(() => {
  vi.resetAllMocks();
});

describe('getCompanies', () => {
  it('returns all companies', async () => {
    mockedApi.get.mockResolvedValue({ data: [{ id: 1 }, { id: 2 }] });

    await expect(getCompanies()).resolves.toEqual([{ id: 1 }, { id: 2 }]);
    expect(mockedApi.get).toHaveBeenCalledWith('/companies');
  });

  it('throws an ApiError on failure', async () => {
    mockedApi.get.mockRejectedValue(buildAxiosError(502, 'bad gateway'));

    await expect(getCompanies()).rejects.toMatchObject({
      message: 'Не удалось загрузить компании: bad gateway',
      status: 502,
    });
  });
});

describe('getCompany', () => {
  it('requests a company by id', async () => {
    mockedApi.get.mockResolvedValue({ data: { id: 4 } });

    await expect(getCompany(4)).resolves.toEqual({ id: 4 });
    expect(mockedApi.get).toHaveBeenCalledWith('/companies/4');
  });

  it('reports a missing company', async () => {
    mockedApi.get.mockRejectedValue(buildAxiosError(404, 'not found'));

    await expect(getCompany(4)).rejects.toMatchObject({
      message: 'Не удалось загрузить компанию: not found',
      status: 404,
    });
  });
});

describe('createCompany', () => {
  it('posts the company and returns the created id', async () => {
    mockedApi.post.mockResolvedValue({ data: { id: 6 } });
    const body = {
      name: 'Салон',
      address: '',
      geolocation: '',
      schedule: '',
      logo: '',
      site: '',
      timezone: 'Asia/Yekaterinburg',
    };

    await expect(createCompany(body)).resolves.toEqual({ id: 6 });
    expect(mockedApi.post).toHaveBeenCalledWith('/companies', body);
  });
});

describe('deleteCompany', () => {
  it('deletes by id', async () => {
    mockedApi.delete.mockResolvedValue({});

    await deleteCompany(6);

    expect(mockedApi.delete).toHaveBeenCalledWith('/companies/6');
  });

  it('throws an ApiError on failure', async () => {
    mockedApi.delete.mockRejectedValue(buildAxiosError(409, 'has clients'));

    await expect(deleteCompany(6)).rejects.toMatchObject({
      message: 'Не удалось удалить компанию: has clients',
      status: 409,
    });
  });
});
