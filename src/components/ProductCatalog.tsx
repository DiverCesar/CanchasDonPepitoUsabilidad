'use client';
import { useState } from 'react';
import Link from 'next/link';

type Product = { id: string; name: string; category: string; price: number; stock: number; image: string };

const mockProducts: Product[] = [
  { id: '1', name: 'Gatorade Azul 500ml', category: 'Bebidas', price: 1.50, stock: 24, image: '🥤' },
  { id: '2', name: 'Agua Dasani 600ml', category: 'Bebidas', price: 1.00, stock: 50, image: '💧' },
  { id: '3', name: 'Doritos Nacho 40g', category: 'Snacks', price: 0.80, stock: 15, image: '🌮' },
  { id: '4', name: 'Pilsener Light 330ml', category: 'Bebidas', price: 2.00, stock: 5, image: '🍺' },
];

export default function ProductCatalog() {
  const [cart, setCart] = useState<Record<string, number>>({});

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id]--;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2>Catálogo de Productos</h2>
        {totalItems > 0 && (
          <Link href="/checkout" className="btn btn-primary">
            Pagar Pedido ({totalItems})
          </Link>
        )}
      </div>

      <div className="grid grid-cols-4">
        {mockProducts.map((p) => {
          const inCart = cart[p.id] || 0;
          return (
            <div key={p.id} className="glass-card text-center" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '3rem', margin: '1rem 0' }}>{p.image}</div>
              <h3 style={{ fontSize: '1.1rem' }}>{p.name}</h3>
              <p style={{ color: 'var(--accent-success)', fontWeight: 700, fontSize: '1.25rem' }}>${p.price.toFixed(2)}</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
                {inCart > 0 ? (
                  <div className="flex items-center gap-2" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.2rem' }}>
                    <button onClick={() => removeFromCart(p.id)} className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem' }}>-</button>
                    <span style={{ fontWeight: 700, minWidth: '1.5rem' }}>{inCart}</span>
                    <button onClick={() => addToCart(p.id)} className="btn btn-primary" style={{ padding: '0.25rem 0.75rem' }} disabled={inCart >= p.stock}>+</button>
                  </div>
                ) : (
                  <button 
                    onClick={() => addToCart(p.id)} 
                    className="btn btn-secondary" 
                    style={{ width: '100%', padding: '0.5rem' }}
                    disabled={p.stock === 0}
                  >
                    {p.stock > 0 ? 'Agregar al pedido' : 'Agotado'}
                  </button>
                )}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {p.stock > 5 ? `${p.stock} disponibles` : p.stock > 0 ? <span style={{ color: 'var(--accent-warning)' }}>¡Solo ${p.stock} disponibles!</span> : 'Sin stock'}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  );
}
