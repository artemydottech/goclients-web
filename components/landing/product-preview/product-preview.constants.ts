import type { AppointmentStatus } from '@/types';

interface PreviewAppointment {
  top: number;
  height: number;
  time: string;
  client: string;
  service: string;
  status: AppointmentStatus;
}

export const PREVIEW_COLUMNS: {
  master: string;
  items: PreviewAppointment[];
}[] = [
  {
    master: 'Анна',
    items: [
      {
        top: 8,
        height: 22,
        time: '10:00',
        client: 'Ольга М.',
        service: 'Стрижка',
        status: 'completed',
      },
      {
        top: 40,
        height: 44,
        time: '12:30',
        client: 'Алексей Р.',
        service: 'Окрашивание',
        status: 'confirmed',
      },
    ],
  },
  {
    master: 'Мария',
    items: [
      {
        top: 20,
        height: 30,
        time: '11:00',
        client: 'Светлана К.',
        service: 'Маникюр',
        status: 'confirmed',
      },
      {
        top: 62,
        height: 30,
        time: '15:00',
        client: 'Ирина Т.',
        service: 'Маникюр',
        status: 'pending',
      },
    ],
  },
  {
    master: 'Дарья',
    items: [
      {
        top: 4,
        height: 18,
        time: '09:30',
        client: 'Михаил П.',
        service: 'Стрижка',
        status: 'no_show',
      },
      {
        top: 30,
        height: 22,
        time: '11:30',
        client: 'Ольга М.',
        service: 'Укладка',
        status: 'cancelled',
      },
      {
        top: 58,
        height: 26,
        time: '14:30',
        client: 'Ирина Т.',
        service: 'Стрижка',
        status: 'confirmed',
      },
    ],
  },
];

export const PREVIEW_HOURS = ['09:00', '11:00', '13:00', '15:00', '17:00'];
