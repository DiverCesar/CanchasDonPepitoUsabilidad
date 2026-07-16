'use client';
import { useState } from 'react';

type OrderState = 'pendiente' | 'preparacion' | 'despachado' | 'entregado';
type PaymentState = 'confirmado' | 'revertido';

export default function AdminDashboard() {
  const [orderState, setOrderState] = useState<OrderState>('pendiente');
  const [paymentState, setPaymentState] = useState<PaymentState>('confirmado');

  const advanceOrder = () => {
    if (orderState === 'pendiente') setOrderState('preparacion');
    else if (orderState === 'preparacion') setOrderState('despachado');
    else if (orderState === 'despachado') setOrderState('entregado');
  };

  return (
    <div className="container animate-slide">
      <div className="flex justify-between items-center mb-4 panel" style={{ padding: '1rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>CONTROL DE MANDO</h1>
        <div className="badge badge-success">SISTEMA ONLINE</div>
      </div>
      
      <div className="grid grid-cols-4 mb-4">
        <div className="card text-center" style={{ borderLeft: '4px solid var(--accent-success)' }}>
          <p className="input-label">INGRESOS DEL DÍA</p>
          <h2 style={{ fontSize: '2rem', color: 'var(--accent-success)' }}>$345.50</h2>
        </div>
        <div className="card text-center" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
          <p className="input-label">RESERVAS ACTIVAS</p>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>8</h2>
        </div>
        <div className="card text-center" style={{ borderLeft: '4px solid var(--accent-warning)' }}>
          <p className="input-label">PEDIDOS PENDIENTES</p>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>3</h2>
        </div>
        <div className="card text-center" style={{ borderLeft: '4px solid var(--accent-danger)' }}>
          <p className="input-label">REEMBOLSOS (GI)</p>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>1</h2>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="panel">
          <h3 className="mb-2" style={{ color: 'var(--text-secondary)' }}>COLA DE PEDIDOS Y TRANSICIONES</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>ORDEN #</th>
                <th>CLIENTE (ZONA)</th>
                <th>ESTADO ACTUAL</th>
                <th>ACCIÓN (RF-034)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ORD-845</td>
                <td>
                  Juan Pérez<br/>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)' }}>📍 GPS Confirmado</span>
                </td>
                <td>
                  <span className={`badge ${orderState === 'entregado' ? 'badge-success' : orderState === 'pendiente' ? 'badge-danger' : 'badge-warning'}`}>
                    {orderState}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-secondary" 
                    style={{ fontSize: '0.7rem', padding: '0.4rem' }}
                    onClick={advanceOrder}
                    disabled={orderState === 'entregado'}
                  >
                    AVANZAR ESTADO →
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="panel">
          <h3 className="mb-2" style={{ color: 'var(--text-secondary)' }}>REGISTRO DE PAGOS Y DEVOLUCIONES (GI)</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>REF</th>
                <th>MÉTODO</th>
                <th>MONTO</th>
                <th>ESTADO</th>
                <th>ACCIÓN (RF-004)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TRX-001</td>
                <td>Transf.</td>
                <td>$16.50</td>
                <td>
                  <span className={`badge ${paymentState === 'confirmado' ? 'badge-success' : 'badge-danger'}`}>
                    {paymentState}
                  </span>
                </td>
                <td>
                  {paymentState === 'confirmado' && (
                    <button 
                      className="btn btn-secondary" 
                      style={{ fontSize: '0.7rem', padding: '0.4rem', borderColor: 'var(--accent-danger)', color: 'var(--accent-danger)' }}
                      onClick={() => setPaymentState('revertido')}
                    >
                      REVERTIR
                    </button>
                  )}
                  {paymentState === 'revertido' && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Reembolso Registrado</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
