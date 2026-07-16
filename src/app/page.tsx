import Link from 'next/link';

export default function Home() {
  return (
    <div className="container animate-slide">
      <div className="panel text-center mt-4" style={{ padding: '3rem 2rem', borderTop: '4px solid var(--accent-primary)' }}>
        <h1 className="mb-1" style={{ fontSize: '3.5rem', color: 'var(--text-primary)' }}>
          CANCHAS <span style={{ color: 'var(--accent-primary)' }}>DON PEPITO</span>
        </h1>
        <p className="mb-4" style={{ fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '2px' }}>
          Plataforma de Reservas y Pedidos a la Cancha
        </p>
        
        <div className="flex justify-center gap-4 mt-2" style={{ flexWrap: 'wrap' }}>
          <Link href="/canchas" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Reservar Cancha
          </Link>
          <Link href="/pedidos" className="btn btn-secondary" style={{ padding: '0.75rem 2rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            Pedir Snacks
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-3 mt-4 gap-4">
        <div className="card text-center">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>⚡</div>
          <h3 className="mb-1" style={{ fontSize: '1.2rem' }}>Disponibilidad en Vivo</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Visualiza horarios libres y bloqueados al instante y reserva tu espacio.</p>
        </div>
        <div className="card text-center">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>🍔</div>
          <h3 className="mb-1" style={{ fontSize: '1.2rem' }}>Pedidos a la Cancha</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Solicita hidratación y snacks directo a tu ubicación mediante GPS.</p>
        </div>
        <div className="card text-center">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>📱</div>
          <h3 className="mb-1" style={{ fontSize: '1.2rem' }}>Pagos Express</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Validación automática de transferencias bancarias en menos de 5 segundos.</p>
        </div>
      </div>
    </div>
  );
}
