export const DAY_START_HOUR = 8;
export const DAY_END_HOUR = 22;
export const HOUR_HEIGHT_PX = 64;
export const MINUTES_IN_HOUR = 60;
export const DATE_PARAM_FORMAT = 'YYYY-MM-DD';

export const CALENDAR_HOURS = Array.from(
  { length: DAY_END_HOUR - DAY_START_HOUR },
  (_, index) => DAY_START_HOUR + index,
);
