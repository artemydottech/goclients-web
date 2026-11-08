import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '..';
import { buildAxiosError } from '../test-utils';
import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  getCompanyEmployees,
  getEmployeeServices,
  updateEmployeeServices,
} from '.';

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
    expect(mockedApi.get).toHaveBeenCalledWith('/employees', {
      signal: undefined,
    });
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
    expect(mockedApi.get).toHaveBeenCalledWith('/employees/2', {
      signal: undefined,
    });
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

describe('getEmployeeServices', () => {
  it('requests services of an employee', async () => {
    mockedApi.get.mockResolvedValue({ data: [{ id: 4 }] });

    await expect(getEmployeeServices(2)).resolves.toEqual([{ id: 4 }]);
    expect(mockedApi.get).toHaveBeenCalledWith('/employees/2/services', {
      signal: undefined,
    });
  });
});

describe('updateEmployeeServices', () => {
  it('puts service ids in snake case', async () => {
    mockedApi.put.mockResolvedValue({});

    await updateEmployeeServices({ employeeId: 2, serviceIds: [4, 5] });

    expect(mockedApi.put).toHaveBeenCalledWith('/employees/2/services', {
      service_ids: [4, 5],
    });
  });

  it('allows clearing all services', async () => {
    mockedApi.put.mockResolvedValue({});

    await updateEmployeeServices({ employeeId: 2, serviceIds: [] });

    expect(mockedApi.put).toHaveBeenCalledWith('/employees/2/services', {
      service_ids: [],
    });
  });

  it('throws an ApiError on failure', async () => {
    mockedApi.put.mockRejectedValue(buildAxiosError(400, 'unknown service'));

    await expect(
      updateEmployeeServices({ employeeId: 2, serviceIds: [99] }),
    ).rejects.toMatchObject({
      message: 'Не удалось сохранить услуги сотрудника: unknown service',
    });
  });
});

describe('updateEmployee', () => {
  const body = {
    name: 'Анна',
    surname: 'Иванова',
    position: 'Мастер',
    avatar: '',
  };

  it('sends editable fields with PUT and handles a 204 response', async () => {
    mockedApi.put.mockResolvedValue({ status: 204 });

    await expect(updateEmployee({ id: 7, body })).resolves.toBeUndefined();
    expect(mockedApi.put).toHaveBeenCalledWith('/employees/7', body);
  });

  it('keeps backend validation details', async () => {
    mockedApi.put.mockRejectedValue(
      buildAxiosError(400, { error: 'invalid data' }),
    );

    await expect(updateEmployee({ id: 7, body })).rejects.toMatchObject({
      message: 'Не удалось сохранить сотрудника: invalid data',
      status: 400,
    });
  });

  it('reports deleted entities without returning a successful save', async () => {
    mockedApi.put.mockRejectedValue(
      buildAxiosError(404, { error: 'not found' }),
    );

    await expect(updateEmployee({ id: 7, body })).rejects.toMatchObject({
      status: 404,
    });
  });
});

it('passes an AbortSignal to getEmployees', async () => {
  const signal = new AbortController().signal;
  mockedApi.get.mockResolvedValue({ data: [] });
  await getEmployees(signal);
  expect(mockedApi.get).toHaveBeenCalledWith(
    '/employees',
    expect.objectContaining({ signal }),
  );
});

it('passes an AbortSignal to getEmployee', async () => {
  const signal = new AbortController().signal;
  mockedApi.get.mockResolvedValue({ data: [] });
  await getEmployee(7, signal);
  expect(mockedApi.get).toHaveBeenCalledWith(
    '/employees/7',
    expect.objectContaining({ signal }),
  );
});

it('passes an AbortSignal to getEmployeeServices', async () => {
  const signal = new AbortController().signal;
  mockedApi.get.mockResolvedValue({ data: [] });
  await getEmployeeServices(7, signal);
  expect(mockedApi.get).toHaveBeenCalledWith(
    '/employees/7/services',
    expect.objectContaining({ signal }),
  );
});

it('scopes employee requests and preserves cancellation', async () => {
  const signal = new AbortController().signal;
  mockedApi.get.mockResolvedValue({ data: [{ id: 2, company_id: 7 }] });
  await expect(getCompanyEmployees(7, signal)).resolves.toEqual([
    { id: 2, company_id: 7 },
  ]);
  expect(mockedApi.get).toHaveBeenCalledWith('/employees', {
    params: { company_id: 7 },
    signal,
  });
});
it('reports company employee request failures', async () => {
  mockedApi.get.mockRejectedValue(buildAxiosError(500, { error: 'storage' }));
  await expect(getCompanyEmployees(7)).rejects.toMatchObject({ status: 500 });
});
