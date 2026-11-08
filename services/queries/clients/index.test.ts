import { beforeEach, expect, it, vi } from 'vitest';
import { useSearchClients } from '.';
import { searchClients } from '@/services/api/clients';
const captured = vi.hoisted(() => ({ options: undefined as unknown }));
vi.mock('@tanstack/react-query', () => ({
  useQuery: (options: unknown) => { captured.options = options; return {}; },
}));
vi.mock('@/services/api/clients', () => ({ searchClients: vi.fn() }));
beforeEach(() => vi.resetAllMocks());
it('isolates pages, searches and companies in the query key', async () => {
  const signal = new AbortController().signal;
  for (const [company, query, offset] of [[1, 'Анна', 0], [1, 'Анна', 50], [2, 'Анна', 0], [1, 'Иван', 0]] as const) {
    useSearchClients(company, query, offset);
    const options = captured.options as { queryKey: unknown[]; queryFn: (arg: { signal: AbortSignal }) => unknown };
    expect(options.queryKey).toEqual(['get-clients', company, 'search', query, offset]);
    await options.queryFn({ signal });
    expect(searchClients).toHaveBeenLastCalledWith(company, { q: query, limit: 50, offset }, signal);
  }
});
