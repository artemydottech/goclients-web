import { AxiosError } from 'axios';
import { describe, expect, it } from 'vitest';
import { ApiError, handleApiError, isApiError } from '.';
import { buildAxiosError } from './test-utils';

describe('handleApiError', () => {
  it('appends a plain text server message', () => {
    const error = handleApiError(
      buildAxiosError(409, 'slot is taken\n'),
      'Не удалось создать запись',
    );
    expect(error.message).toBe('Не удалось создать запись: slot is taken');
    expect(error.status).toBe(409);
  });

  it('reads the message field of a json response', () => {
    const error = handleApiError(
      buildAxiosError(400, { message: 'bad time' }),
      'Не удалось перенести',
    );
    expect(error.message).toBe('Не удалось перенести: bad time');
  });

  it('uses the default message when the response body is empty', () => {
    const error = handleApiError(buildAxiosError(500, '  '), 'Ошибка');
    expect(error.message).toBe('Ошибка');
    expect(error.status).toBe(500);
  });

  it('has no status when the request got no response', () => {
    const error = handleApiError(new AxiosError('Network Error'), 'Ошибка');
    expect(error.message).toBe('Ошибка');
    expect(error.status).toBeNull();
  });

  it('wraps non axios errors with the default message', () => {
    const error = handleApiError(new TypeError('boom'), 'Ошибка');
    expect(error.message).toBe('Ошибка');
    expect(error.status).toBeNull();
  });
});

describe('isApiError', () => {
  it('recognizes ApiError instances only', () => {
    expect(isApiError(new ApiError('x', 404))).toBe(true);
    expect(isApiError(new Error('x'))).toBe(false);
    expect(isApiError('x')).toBe(false);
  });
});
