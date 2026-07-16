'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: 'fixed',
      top: 0, width: '100%', zIndex: 50,
      background: 'var(--bg-primary)',
      borderBottom: '2px solid var(--accent-primary)',
      padding: '0.75rem 0'
    }}>
      <div className="container flex justify-between items-center">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.2rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
          <div style={{ width: '28px', height: '28px', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-primary)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
          </div>
          DON PEPITO
        </Link>
        <div className="flex gap-4 items-center" style={{ fontSize: '0.9rem', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', fontWeight: 700 }}>
          <Link href="/canchas" style={{ color: pathname === '/canchas' ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>Reservas</Link>
          <Link href="/pedidos" style={{ color: pathname === '/pedidos' ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>Pedidos</Link>
          <Link href="/checkout" style={{ color: pathname === '/checkout' ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>Caja</Link>
          <Link href="/admin/dashboard" className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Admin / Vendedor</Link>
        </div>
      </div>
    </nav>
  );
}
