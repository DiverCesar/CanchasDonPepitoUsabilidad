'use client';
import { useState } from 'react';
import { simulateBankTransferValidation } from '@/utils/bankingApiSimulator';
import Link from 'next/link';

export default function CheckoutPage() {
  const [method, setMethod] = useState<'efectivo' | 'transferencia' | null>(null);
  const [status, setStatus] = useState<'pendiente' | 'procesando' | 'confirmado' | 'rechazado'>('pendiente');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handlePayment = async () => {
    if (method === 'efectivo') {
      setStatus('confirmado');
      setMessage('Pago en efectivo registrado. Acércate a caja para concretar.');
    } else if (method === 'transferencia') {
      if (!token) {
        setMessage('Ingresa el token o comprobante de la transferencia.');
        return;
      }
      setStatus('procesando');
      setMessage('Validando transacción con el banco (max 5s)...');
      
      const res = await simulateBankTransferValidation(token);
      
      if (res.success) {
        setStatus('confirmado');
      } else {
        setStatus('rechazado');
      }
      setMessage(res.message);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '600px' }}>
      <h1 className="mb-4 text-center">Caja y Pagos (GI)</h1>

      <div className="glass-panel">
        <h2 className="mb-2">Resumen de Cuenta</h2>
        <div className="flex justify-between items-center mb-2" style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          <span>1x Gatorade Azul 500ml</span>
          <span>$1.50</span>
        </div>
        <div className="flex justify-between items-center mb-2" style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          <span>1x Reserva Cancha 1 (18:00)</span>
          <span>$15.00</span>
        </div>
        <div className="flex justify-between items-center mt-4" style={{ fontSize: '1.25rem', fontWeight: 800 }}>
          <span>Total a Pagar</span>
          <span style={{ color: 'var(--accent-success)' }}>$16.50</span>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '1.5rem 0' }} />

        {status === 'pendiente' && (
          <>
            <h3 className="mb-2">Método de Pago</h3>
            <div className="grid grid-cols-2 mb-4">
              <button 
                className={`btn ${method === 'efectivo' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMethod('efectivo')}
                style={{ padding: '1rem' }}
              >
                💵 Efectivo
              </button>
              <button 
                className={`btn ${method === 'transferencia' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMethod('transferencia')}
                style={{ padding: '1rem' }}
              >
                🏦 Banca Móvil
              </button>
            </div>

            {method === 'transferencia' && (
              <div className="input-group animate-fade-in">
                <label className="input-label">Token de Referencia (Banco Pichincha)</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Ej: 123456789" 
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
            )}

            {method && (
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={handlePayment}>
                Confirmar Pago
              </button>
            )}
            
            {message && <p className="mt-2 text-center" style={{ color: 'var(--accent-warning)' }}>{message}</p>}
          </>
        )}

        {status === 'procesando' && (
          <div className="text-center mt-4 mb-4 animate-fade-in">
            <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid var(--glass-border)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p className="mt-2">{message}</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {(status === 'confirmado' || status === 'rechazado') && (
          <div className="text-center mt-4 animate-fade-in">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              {status === 'confirmado' ? '✅' : '❌'}
            </div>
            <h3 style={{ color: status === 'confirmado' ? 'var(--accent-success)' : 'var(--accent-danger)' }}>
              {status === 'confirmado' ? 'Pago Exitoso' : 'Pago Fallido'}
            </h3>
            <p className="mt-2 text-secondary">{message}</p>
            
            <div className="mt-4 flex gap-4 justify-center">
              {status === 'rechazado' && (
                <button className="btn btn-secondary" onClick={() => { setStatus('pendiente'); setMessage(''); setToken(''); }}>Intentar de nuevo</button>
              )}
              <Link href="/" className="btn btn-primary">Volver al Inicio</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
