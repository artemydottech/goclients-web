import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '..';
import { buildAxiosError } from '../test-utils';
import { createEmployee, deleteEmployee, getEmployee, getEmployees } from '.';

vi.mock('..', async (importOriginal) => ({
  ...(await importOriginal<typeof import('..')>()),
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));

const mockedApi = vi.mocked(api);

beforeEach(() => {
  vi.resetAllMocks();
});

describe('getEmployees', () => {
  it('returns all employees', async () => {
    mockedApi.get.mockResolvedValue({ data: [{ id: 1 }] });

    await expect(getEmployees()).resolves.toEqual([{ id: 1 }]);
    expect(mockedApi.get).toHaveBeenCalledWith('/employees');
  });

  it('throws an ApiError on failure', async () => {
    mockedApi.get.mockRejectedValue(buildAxiosError(500, 'oops'));

    await expect(getEmployees()).rejects.toMatchObject({
      message: 'Не удалось загрузить сотрудников: oops',
    });
  });
});

describe('getEmployee', () => {
  it('requests an employee by id', async () => {
    mockedApi.get.mockResolvedValue({ data: { id: 2 } });

    await expect(getEmployee(2)).resolves.toEqual({ id: 2 });
    expect(mockedApi.get).toHaveBeenCalledWith('/employees/2');
  });
});

describe('createEmployee', () => {
  it('posts the employee and returns the created id', async () => {
    mockedApi.post.mockResolvedValue({ data: { id: 13 } });
    const body = {
      company_id: 1,
      name: 'Анна',
      surname: '',
      position: 'Мастер',
      avatar: '',
    };

    await expect(createEmployee(body)).resolves.toEqual({ id: 13 });
    expect(mockedApi.post).toHaveBeenCalledWith('/employees', body);
  });
});

describe('deleteEmployee', () => {
  it('deletes by id', async () => {
    mockedApi.delete.mockResolvedValue({});

    await deleteEmployee(13);

    expect(mockedApi.delete).toHaveBeenCalledWith('/employees/13');
  });

  it('throws an ApiError on failure', async () => {
    mockedApi.delete.mockRejectedValue(buildAxiosError(409, 'has bookings'));

    await expect(deleteEmployee(13)).rejects.toMatchObject({
      message: 'Не удалось удалить сотрудника: has bookings',
    });
  });
});
