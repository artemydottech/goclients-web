import { ImageResponse } from 'next/og';

export const alt = 'goclients — онлайн-запись для салона';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SLOT_TIMES = ['10:00', '11:30', '13:00', '14:30', '16:00'];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: '#09090b',
        color: '#fafafa',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            background: '#fafafa',
            display: 'flex',
          }}
        />
        <div style={{ fontSize: 72, fontWeight: 700 }}>goclients</div>
      </div>
      <div style={{ fontSize: 44, color: '#a1a1aa', display: 'flex' }}>
        Selfhosted booking for salons · Go + SQLite
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        {SLOT_TIMES.map((time, index) => (
          <div
            key={time}
            style={{
              display: 'flex',
              padding: '16px 28px',
              borderRadius: 16,
              fontSize: 32,
              border: '2px solid #3f3f46',
              background: index === 2 ? '#fafafa' : 'transparent',
              color: index === 2 ? '#09090b' : '#fafafa',
            }}
          >
            {time}
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
