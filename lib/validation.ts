import { z } from 'zod';

export const boundedText = (maximum: number) =>
  z
    .string()
    .trim()
    .refine((value) => [...value].length <= maximum, {
      message: `Не больше ${maximum} символов`,
    });

export const optionalWebUrl = boundedText(500).pipe(
  z.union([
    z.literal(''),
    z
      .url('Некорректная ссылка')
      .refine(
        (value) => /^https?:\/\//i.test(value),
        'Используйте ссылку HTTP или HTTPS',
      ),
  ]),
);
