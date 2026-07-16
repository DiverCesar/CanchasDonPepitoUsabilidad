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
    <div className="animate-slide">
      <div className="panel flex justify-between items-center mb-4" style={{ padding: '1rem', borderTop: '2px solid var(--accent-primary)' }}>
        <h2 style={{ fontSize: '1.25rem' }}>Catálogo de Snacks y Bebidas</h2>
        {totalItems > 0 && (
          <Link href="/checkout" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
            PAGAR PEDIDO ({totalItems})
          </Link>
        )}
      </div>

      <div className="grid grid-cols-4">
        {mockProducts.map((p) => {
          const inCart = cart[p.id] || 0;
          return (
            <div key={p.id} className="card text-center flex-col justify-between" style={{ padding: '1rem 0.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{p.image}</div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{p.name}</h3>
              <p style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.4rem', margin: '0.25rem 0' }}>${p.price.toFixed(2)}</p>
              
              <div className="flex justify-center items-center mt-2 mb-1">
                {inCart > 0 ? (
                  <div className="flex items-center gap-2" style={{ background: 'var(--bg-primary)', borderRadius: '2px', padding: '0.2rem' }}>
                    <button onClick={() => removeFromCart(p.id)} className="btn btn-secondary" style={{ padding: '0.2rem 0.6rem', fontSize: '1rem' }}>-</button>
                    <span style={{ fontWeight: 800, minWidth: '1.5rem' }}>{inCart}</span>
                    <button onClick={() => addToCart(p.id)} className="btn btn-primary" style={{ padding: '0.2rem 0.6rem', fontSize: '1rem' }} disabled={inCart >= p.stock}>+</button>
                  </div>
                ) : (
                  <button 
                    onClick={() => addToCart(p.id)} 
                    className="btn btn-secondary" 
                    style={{ width: '90%', fontSize: '0.85rem' }}
                    disabled={p.stock === 0}
                  >
                    {p.stock > 0 ? 'AGREGAR' : 'AGOTADO'}
                  </button>
                )}
              </div>
              
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
                {p.stock > 5 ? (
                  <span style={{ color: 'var(--text-secondary)' }}>STOCK: {p.stock}</span>
                ) : p.stock > 0 ? (
                  <span style={{ color: 'var(--accent-warning)' }}>¡SOLO {p.stock} LEFT!</span>
                ) : (
                  <span style={{ color: 'var(--accent-danger)' }}>SIN STOCK</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
