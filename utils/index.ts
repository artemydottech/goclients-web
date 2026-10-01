export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  }).format(price);

export const truncate = (
  str: string,
  maxLength: number,
  ellipsis = '…',
): string => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
};

export const doestPathMatch = (pathname: string, path: string): boolean =>
  pathname === path || pathname.startsWith(`${path}/`);

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} мин`;
  if (!rest) return `${hours} ч`;
  return `${hours} ч ${rest} мин`;
};

export const getInitials = (fullName: string): string =>
  fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

const RU_PHONE_LENGTH = 11;

export const formatPhone = (phone: string): string => {
  if (phone.length !== RU_PHONE_LENGTH) return phone;
  const [, code, first, second, third] =
    phone.match(/^\d(\d{3})(\d{3})(\d{2})(\d{2})$/) ?? [];
  return `+7 ${code} ${first}-${second}-${third}`;
};

export const onlyDigits = (value: string): string => value.replace(/\D/g, '');
