import { beforeEach, describe, expect, it, vi } from 'vitest';
import api from '..';
import { buildAxiosError } from '../test-utils';
import {
  createAppointment,
  deleteAppointment,
  getAppointment,
  getAppointments,
  updateAppointmentStatus,
  updateAppointmentTime,
} from '.';

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

describe('createAppointment', () => {
  it('posts the body and returns the created id', async () => {
    mockedApi.post.mockResolvedValue({ data: { id: 12 } });
    const body = {
      client_id: 1,
      employee_id: 2,
      service_id: 3,
      starts_at: '2026-10-08T10:00:00+05:00',
      comment: '',
      status: 'pending' as const,
    };

    await expect(createAppointment(body)).resolves.toEqual({ id: 12 });
    expect(mockedApi.post).toHaveBeenCalledWith('/appointments', body);
  });

  it('throws an ApiError when the slot is taken', async () => {
    mockedApi.post.mockRejectedValue(buildAxiosError(409, 'slot is taken'));

    await expect(
      createAppointment({
        client_id: 1,
        employee_id: 2,
        service_id: 3,
        starts_at: '2026-10-08T10:00:00+05:00',
        comment: '',
        status: 'pending',
      }),
    ).rejects.toMatchObject({
      message: 'Не удалось создать запись: slot is taken',
      status: 409,
    });
  });
});

describe('deleteAppointment', () => {
  it('deletes by id', async () => {
    mockedApi.delete.mockResolvedValue({});

    await deleteAppointment(4);

    expect(mockedApi.delete).toHaveBeenCalledWith('/appointments/4');
  });
});

describe('updateAppointmentStatus', () => {
  it('puts only the status to the status endpoint', async () => {
    mockedApi.put.mockResolvedValue({});

    await updateAppointmentStatus({ id: 7, status: 'confirmed' });

    expect(mockedApi.put).toHaveBeenCalledWith('/appointments/7/status', {
      status: 'confirmed',
    });
  });

  it('surfaces the backend rejection', async () => {
    mockedApi.put.mockRejectedValue(
      buildAxiosError(400, 'cannot complete before start'),
    );

    await expect(
      updateAppointmentStatus({ id: 7, status: 'completed' }),
    ).rejects.toMatchObject({
      message: 'Не удалось изменить статус: cannot complete before start',
    });
  });
});

describe('updateAppointmentTime', () => {
  it('puts the body without the id and returns the updated appointment', async () => {
    mockedApi.put.mockResolvedValue({ data: { id: 7 } });

    const result = await updateAppointmentTime({
      id: 7,
      employee_id: 2,
      starts_at: '2026-10-08T11:00:00+05:00',
    });

    expect(mockedApi.put).toHaveBeenCalledWith('/appointments/7/time', {
      employee_id: 2,
      starts_at: '2026-10-08T11:00:00+05:00',
    });
    expect(result).toEqual({ id: 7 });
  });
});
