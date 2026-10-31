import { it, expect } from 'vitest';
import { parseDragPayload } from './appointments-calendar.utils';

it('accepts valid appointment drags with fractional pixel offsets', () => {
  expect(parseDragPayload('{"appointmentId":7,"grabOffset":12.5}')).toEqual({
    appointmentId: 7,
    grabOffset: 12.5,
  });
});
it.each([
  '{"appointmentId":0,"grabOffset":0}',
  '{"appointmentId":-1,"grabOffset":0}',
  '{"appointmentId":1.5,"grabOffset":0}',
  '{"appointmentId":9007199254740992,"grabOffset":0}',
  '{"appointmentId":7,"grabOffset":-1}',
  '{"appointmentId":7,"grabOffset":1e999}',
  'null',
  '{}',
  'bad',
])('rejects malformed appointment drags %s', (raw) => {
  expect(parseDragPayload(raw)).toBeNull();
});
