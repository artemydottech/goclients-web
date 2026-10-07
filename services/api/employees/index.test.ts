import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '..';
import { buildAxiosError } from '../test-utils';
import { getEmployee, getEmployees } from '.';

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
