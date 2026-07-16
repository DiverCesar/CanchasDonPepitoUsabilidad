'use client';
import { useState, useEffect } from 'react';
import { simulateBankTransferValidation } from '@/utils/bankingApiSimulator';
import Link from 'next/link';

export default function CheckoutPage() {
  const [method, setMethod] = useState<'efectivo' | 'transferencia' | null>(null);
  const [status, setStatus] = useState<'pendiente' | 'procesando' | 'confirmado' | 'rechazado'>('pendiente');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  
  // GPS Consent state (RF-031 / RNF-014)
  const [gpsConsent, setGpsConsent] = useState(false);
  const [generalConsent, setGeneralConsent] = useState(false);
  
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'procesando') {
      setTimer(5);
      interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handlePayment = async () => {
    if (!generalConsent || !gpsConsent) {
      setMessage('Debes aceptar el consentimiento general y de ubicación GPS (LOPDP).');
      return;
    }

    if (method === 'efectivo') {
      setStatus('confirmado');
      setMessage('PAGO_EFECTIVO: Registrado. Acércate a caja para concretar.');
    } else if (method === 'transferencia') {
      if (!token) {
        setMessage('Ingresa el token de la transferencia.');
        return;
      }
      setStatus('procesando');
      setMessage('Validando con Banco Pichincha...');
      
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
    <div className="container animate-slide" style={{ maxWidth: '640px' }}>
      <h1 className="mb-4 text-center">CAJA Y CHECKOUT</h1>

      <div className="panel">
        <h3 className="mb-2" style={{ borderBottom: '2px solid var(--bg-tertiary)', paddingBottom: '0.5rem' }}>RESUMEN DE CUENTA</h3>
        <div className="flex justify-between items-center mb-1" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <span>1x Gatorade Azul 500ml</span>
          <span style={{ color: 'var(--text-primary)' }}>$1.50</span>
        </div>
        <div className="flex justify-between items-center mb-4" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <span>1x Reserva Cancha 1 (18:00)</span>
          <span style={{ color: 'var(--text-primary)' }}>$15.00</span>
        </div>
        <div className="flex justify-between items-center mt-2" style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>
          <span>TOTAL A PAGAR</span>
          <span style={{ color: 'var(--accent-primary)' }}>$16.50</span>
        </div>
        <hr style={{ border: 'none', borderTop: '2px solid var(--bg-primary)', margin: '1.5rem 0' }} />

        {status === 'pendiente' && (
          <>
            <h3 className="mb-2">MÉTODO DE PAGO</h3>
            <div className="grid grid-cols-2 mb-4">
              <button 
                className={`btn ${method === 'efectivo' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMethod('efectivo')}
                style={{ padding: '1.25rem' }}
              >
                💵 EFECTIVO
              </button>
              <button 
                className={`btn ${method === 'transferencia' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMethod('transferencia')}
                style={{ padding: '1.25rem' }}
              >
                🏦 BANCA MÓVIL
              </button>
            </div>

            {method === 'transferencia' && (
              <div className="input-group animate-slide">
                <label className="input-label">Token de Transferencia</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Ej: TRX-123456789" 
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
            )}

            <div className="mt-4 mb-4" style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '4px' }}>
              <label className="checkbox-label mb-2">
                <input type="checkbox" checked={generalConsent} onChange={(e) => setGeneralConsent(e.target.checked)} />
                <span>Acepto el tratamiento de datos personales conforme a la LOPDP.</span>
              </label>
              <label className="checkbox-label">
                <input type="checkbox" checked={gpsConsent} onChange={(e) => setGpsConsent(e.target.checked)} />
                <span>Consiento el uso de mi ubicación GPS exclusivamente para la entrega del pedido a la cancha.</span>
              </label>
            </div>

            {method && (
              <button className="btn btn-primary w-full" style={{ padding: '1rem' }} onClick={handlePayment}>
                CONFIRMAR PAGO
              </button>
            )}
            
            {message && <p className="mt-2 text-center" style={{ color: 'var(--accent-warning)', fontWeight: 700 }}>{message}</p>}
          </>
        )}

        {status === 'procesando' && (
          <div className="text-center mt-4 mb-4 animate-slide">
            <h2 style={{ fontSize: '4rem', color: 'var(--accent-warning)', margin: '1rem 0' }}>00:0{timer}</h2>
            <div style={{ display: 'inline-block', width: '30px', height: '30px', border: '3px solid var(--bg-tertiary)', borderTopColor: 'var(--accent-warning)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p className="mt-2" style={{ fontWeight: 600, textTransform: 'uppercase' }}>{message}</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {(status === 'confirmado' || status === 'rechazado') && (
          <div className="text-center mt-4 animate-slide">
            <div style={{ padding: '1.5rem', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
                {status === 'confirmado' ? '✅' : '⛔'}
              </div>
              <h3 style={{ color: status === 'confirmado' ? 'var(--accent-success)' : 'var(--accent-danger)' }}>
                {status === 'confirmado' ? 'PAGO EXITOSO' : 'PAGO RECHAZADO'}
              </h3>
              <p className="mt-2" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{message}</p>
            </div>
            
            <div className="mt-4 flex gap-4 justify-center">
              {status === 'rechazado' && (
                <button className="btn btn-secondary" onClick={() => { setStatus('pendiente'); setMessage(''); setToken(''); }}>REINTENTAR</button>
              )}
              <Link href="/" className="btn btn-primary">VOLVER AL INICIO</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
