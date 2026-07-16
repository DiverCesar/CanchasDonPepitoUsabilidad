import Link from 'next/link';

export default function Home() {
  return (
    <div className="container animate-fade-in">
      <div className="glass-panel text-center mt-4" style={{ padding: '4rem 2rem' }}>
        <h1 className="mb-2" style={{ fontSize: '3rem', background: 'linear-gradient(to right, #f0f4ff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Canchas Don Pepito
        </h1>
        <p className="mb-4" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Bienvenido al nuevo portal digital para reservas y pedidos.
        </p>
        
        <div className="flex justify-center gap-4 mt-4" style={{ flexWrap: 'wrap' }}>
          <Link href="/canchas" className="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Reservar Cancha
          </Link>
          <Link href="/pedidos" className="btn btn-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            Pedir Comida
          </Link>
          <Link href="/admin/dashboard" className="btn btn-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
            Panel de Vendedor
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-3 mt-4 gap-4">
        <div className="glass-card">
          <h3 className="mb-2">Reserva Rápida</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Encuentra disponibilidad en tiempo real y reserva tu cancha en menos de 3 pasos.</p>
        </div>
        <div className="glass-card">
          <h3 className="mb-2">Pedidos a la Cancha</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pide bebidas y snacks sin salir de la cancha con nuestro catálogo digital.</p>
        </div>
        <div className="glass-card">
          <h3 className="mb-2">Pago Seguro</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Paga en efectivo o mediante transferencia bancaria validada al instante.</p>
        </div>
      </div>
    </div>
  );
}
