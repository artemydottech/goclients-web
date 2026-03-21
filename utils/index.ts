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
