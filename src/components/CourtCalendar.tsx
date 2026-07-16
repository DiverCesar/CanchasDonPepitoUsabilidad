'use client';
import { useState } from 'react';

type Court = { id: string; name: string; type: string; price: number };
type TimeSlot = { time: string; status: 'disponible' | 'reservado' | 'bloqueado' };

const courts: Court[] = [
  { id: '1', name: 'Cancha 1', type: 'Ecuavóley', price: 15.00 },
  { id: '2', name: 'Cancha 2', type: 'Ecuavóley', price: 15.00 },
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
    <div className="glass-panel animate-fade-in">
      <div className="flex justify-between items-center mb-4" style={{ flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Disponibilidad de Canchas</h2>
        <div className="flex gap-2">
          <input 
            type="date" 
            className="input-field" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
            style={{ width: 'auto', padding: '0.4rem 1rem' }}
          />
          <select 
            className="input-field" 
            value={selectedCourt} 
            onChange={(e) => setSelectedCourt(e.target.value)}
            style={{ width: 'auto', padding: '0.4rem 1rem' }}
          >
            {courts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.8rem' }}>
        <div className="flex items-center gap-2"><span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-success)' }}></span> Disponible</div>
        <div className="flex items-center gap-2"><span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-danger)' }}></span> Reservado</div>
        <div className="flex items-center gap-2"><span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--text-secondary)' }}></span> Bloqueado</div>
      </div>

      <div className="grid grid-cols-4">
        {schedule.map((slot, index) => (
          <div key={index} className="glass-card" style={{ 
            borderLeft: `4px solid ${slot.status === 'disponible' ? 'var(--accent-success)' : slot.status === 'reservado' ? 'var(--accent-danger)' : 'var(--text-secondary)'}`,
            display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center'
          }}>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{slot.time}</h3>
            
            {slot.status === 'disponible' ? (
              <span className="badge badge-success">Libre - $15.00</span>
            ) : slot.status === 'reservado' ? (
              <span className="badge badge-danger">Reservado</span>
            ) : (
              <span className="badge badge-neutral">Mantenimiento</span>
            )}
            
            {slot.status === 'disponible' && (
              <button className="btn btn-primary" style={{ width: '100%', padding: '0.4rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                Reservar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
