import { beforeEach, afterEach, expect, it, vi } from 'vitest';
import { QueryClient, QueryObserver } from '@tanstack/react-query';
import { useDeleteEmployee } from './employees';

type SuccessCallback = (data: unknown, variables: unknown) => unknown;
const captured = vi.hoisted(() => ({
  onSuccess: undefined as SuccessCallback | undefined,
}));
let client: QueryClient;

vi.mock('@tanstack/react-query', async (original) => ({
  ...(await original<typeof import('@tanstack/react-query')>()),
  useQueryClient: () => client,
  useMutation: (options: { onSuccess?: SuccessCallback }) => {
    captured.onSuccess = options.onSuccess;
    return {};
  },
}));

beforeEach(() => {
  client = new QueryClient();
  client.setQueryData(['preferences'], 'unchanged');
});
afterEach(() => client.clear());

const expectRefresh = async (
  hook: () => unknown,
  keys: string[],
  variables: unknown = {},
) => {
  for (const key of keys) client.setQueryData([key, 7], []);
  hook();
  await captured.onSuccess?.(undefined, variables);
  for (const key of keys)
    expect(client.getQueryState([key, 7])?.isInvalidated).toBe(true);
  expect(client.getQueryState(['preferences'])?.isInvalidated).toBe(false);
};

it('refresh bookings and slots after employee deletion', async () => {
  await expectRefresh(useDeleteEmployee, [
    'get-appointments',
    'get-slots',
    'get-client-stats',
  ]);
});

import { useDeleteService } from './services';

it('refresh booking caches after service deletion', async () => {
  await expectRefresh(useDeleteService, [
    'get-appointments',
    'get-slots',
    'get-client-stats',
  ]);
});

import { useDeleteClient } from './clients';

it('refresh availability and stats after client deletion', async () => {
  await expectRefresh(useDeleteClient, [
    'get-appointments',
    'get-slots',
    'get-client-stats',
  ]);
});

import { useDeleteCompany } from './companies';

it('invalidate dependent data after company deletion', async () => {
  await expectRefresh(useDeleteCompany, [
    'get-appointments',
    'get-slots',
    'get-client-stats',
  ]);
});

import { useUpdateCompany } from './companies';

it('refresh slot availability after timezone changes', async () => {
  await expectRefresh(useUpdateCompany, ['get-slots']);
});

import { useUpdateEmployeeServices } from './employees';
it('refreshes slots when employee service assignments change', async () => {
  await expectRefresh(useUpdateEmployeeServices, ['get-slots'], {
    employeeId: 7,
  });
});

const expectPendingRefetch = async (
  hook: () => unknown,
  variables: unknown = {},
) => {
  let release!: (value: string[]) => void;
  const response = new Promise<string[]>((resolve) => {
    release = resolve;
  });
  const observer = new QueryObserver(client, {
    queryKey: ['get-slots'],
    queryFn: () => response,
    initialData: [] as string[],
    staleTime: Infinity,
  });
  const unsubscribe = observer.subscribe(() => {});
  hook();
  let settled = false;
  const completion = Promise.resolve(
    captured.onSuccess?.(undefined, variables),
  ).then(() => {
    settled = true;
  });
  await Promise.resolve();
  await Promise.resolve();
  expect(settled).toBe(false);
  release([]);
  await completion;
  expect(client.getQueryState(['get-slots'])?.fetchStatus).toBe('idle');
  unsubscribe();
};

import {
  useCreateAppointment,
  useDeleteAppointment,
  useUpdateAppointmentStatus,
  useUpdateAppointmentTime,
} from './appointments';
it.each([
  useCreateAppointment,
  useDeleteAppointment,
  useUpdateAppointmentStatus,
  useUpdateAppointmentTime,
])('waits for appointment cache refresh %s', async (hook) => {
  await expectPendingRefetch(hook);
});
