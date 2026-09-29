export const COMPARISON = [
  {
    label: 'Стоимость',
    cloud: 'Подписка за каждого мастера',
    selfhosted: '0 ₽, платите только за сервер',
  },
  {
    label: 'База клиентов',
    cloud: 'На серверах сервиса',
    selfhosted: 'В файле SQLite на вашем сервере',
  },
  {
    label: 'Доработки',
    cloud: 'Ждать, пока добавят',
    selfhosted: 'Код открыт — правьте под себя',
  },
  {
    label: 'Уход с сервиса',
    cloud: 'Выгрузка, если разрешат',
    selfhosted: 'Данные и так у вас',
  },
];

export const REQUIREMENTS = [
  'Любой VPS или домашний сервер',
  'Go 1.24+ и GCC для сборки SQLite-драйвера',
  'Node.js для веб-панели',
];
