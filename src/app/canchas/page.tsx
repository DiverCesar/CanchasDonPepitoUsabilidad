import CourtCalendar from '@/components/CourtCalendar';

export default function CanchasPage() {
  return (
    <div className="container">
      <div className="mb-4">
        <h1>Reservas de Canchas</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Consulta disponibilidad en tiempo real y realiza tu reserva.</p>
      </div>
      <CourtCalendar />
    </div>
  );
}
