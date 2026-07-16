'use client';
import { useState } from 'react';

type Court = { id: string; name: string; type: string; price: number };
type TimeSlot = { time: string; status: 'disponible' | 'reservado' | 'bloqueado' };

const courts: Court[] = [
  { id: '1', name: 'CANCHA 1', type: 'Ecuavóley', price: 15.00 },
  { id: '2', name: 'CANCHA 2', type: 'Ecuavóley', price: 15.00 },
];

const mockSchedule: Record<string, TimeSlot[]> = {
  '1': [
    { time: '18:00', status: 'reservado' },
    { time: '19:00', status: 'disponible' },
    { time: '20:00', status: 'disponible' },
    { time: '21:00', status: 'bloqueado' }
  ],
  '2': [
    { time: '18:00', status: 'disponible' },
    { time: '19:00', status: 'reservado' },
    { time: '20:00', status: 'disponible' },
    { time: '21:00', status: 'disponible' }
  ]
};

export default function CourtCalendar() {
  const [selectedCourt, setSelectedCourt] = useState<string>('1');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const schedule = mockSchedule[selectedCourt] || [];

  return (
    <div className="panel animate-slide">
      <div className="flex justify-between items-center mb-4" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: '1.4rem' }}>Disponibilidad / Horarios</h2>
        <div className="flex gap-2">
          <input 
            type="date" 
            className="input-field" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
            style={{ width: '150px' }}
          />
          <select 
            className="input-field" 
            value={selectedCourt} 
            onChange={(e) => setSelectedCourt(e.target.value)}
            style={{ width: '150px' }}
          >
            {courts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
        <div className="flex items-center gap-2"><span style={{ width: '10px', height: '10px', background: 'var(--accent-success)' }}></span> Disponible</div>
        <div className="flex items-center gap-2"><span style={{ width: '10px', height: '10px', background: 'var(--accent-danger)' }}></span> Reservado</div>
        <div className="flex items-center gap-2"><span style={{ width: '10px', height: '10px', background: 'var(--text-secondary)' }}></span> Bloqueado</div>
      </div>

      <div className="grid grid-cols-4">
        {schedule.map((slot, index) => (
          <div key={index} className="card text-center flex-col justify-between" style={{ 
            borderTop: `4px solid ${slot.status === 'disponible' ? 'var(--accent-success)' : slot.status === 'reservado' ? 'var(--accent-danger)' : 'var(--text-secondary)'}`,
            padding: '1rem 0.5rem',
            minHeight: '120px'
          }}>
            <h3 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>{slot.time}</h3>
            
            <div className="mt-1 mb-2">
              {slot.status === 'disponible' ? (
                <span className="badge badge-success">Libre - $15</span>
              ) : slot.status === 'reservado' ? (
                <span className="badge badge-danger">Ocupado</span>
              ) : (
                <span className="badge badge-neutral">Mantenimiento</span>
              )}
            </div>
            
            {slot.status === 'disponible' && (
              <button className="btn btn-primary" style={{ width: '90%', fontSize: '0.8rem', padding: '0.4rem' }}>
                RESERVAR
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
