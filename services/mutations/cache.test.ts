import { beforeEach, afterEach, expect, it, vi } from 'vitest';
import { QueryClient } from '@tanstack/react-query';
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
