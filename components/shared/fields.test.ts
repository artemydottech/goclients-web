import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useForm } from 'react-hook-form';
import { it, expect } from 'vitest';
import { TextField } from './text-field';
import { TextareaField } from './textarea-field';

type Values = { name: string };
const Form = ({ multiline }: { multiline: boolean }) => {
  const { control } = useForm<Values>({ defaultValues: { name: '' } });
  return multiline
    ? createElement(TextareaField<Values>, {
        control,
        name: 'name',
        label: 'Имя',
      })
    : createElement(TextField<Values>, { control, name: 'name', label: 'Имя' });
};
it.each([false, true])(
  'links labels to unique field IDs across forms %s',
  (multiline) => {
    const markup = renderToStaticMarkup(
      createElement(
        'div',
        null,
        createElement(Form, { multiline }),
        createElement(Form, { multiline }),
      ),
    );
    const ids = [
      ...markup.matchAll(/<(?:input|textarea)\b[^>]*\bid="([^"]+)"/g),
    ].map((match) => match[1]);
    const labels = [...markup.matchAll(/<label\b[^>]*\bfor="([^"]+)"/g)].map(
      (match) => match[1],
    );
    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(2);
    expect(labels).toEqual(ids);
  },
);
