'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: 'fixed',
      top: 0, width: '100%', zIndex: 50,
      background: 'var(--glass-bg)',
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      borderBottom: '1px solid var(--glass-border)',
      padding: '1rem 0'
    }}>
      <div className="container flex justify-between items-center">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
          </div>
          Don Pepito
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/canchas" style={{ fontWeight: pathname === '/canchas' ? 700 : 500, color: pathname === '/canchas' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Reservas</Link>
          <Link href="/pedidos" style={{ fontWeight: pathname === '/pedidos' ? 700 : 500, color: pathname === '/pedidos' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Pedidos</Link>
          <Link href="/checkout" style={{ fontWeight: pathname === '/checkout' ? 700 : 500, color: pathname === '/checkout' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>Caja (GI)</Link>
          <Link href="/admin/dashboard" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Vendedor</Link>
        </div>
      </div>
    </nav>
  );
}
