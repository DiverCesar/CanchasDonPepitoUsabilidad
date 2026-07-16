'use client';

export default function AdminDashboard() {
  return (
    <div className="container animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h1>Dashboard - Administración</h1>
        <div className="badge badge-success" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>En Línea</div>
      </div>
      
      <div className="grid grid-cols-4 mb-4">
        <div className="glass-card text-center">
          <p className="input-label">Ingresos del Día</p>
          <h2 style={{ fontSize: '2rem', color: 'var(--accent-success)' }}>$345.50</h2>
        </div>
        <div className="glass-card text-center">
          <p className="input-label">Reservas Activas</p>
          <h2 style={{ fontSize: '2rem', color: 'var(--accent-primary)' }}>8</h2>
        </div>
        <div className="glass-card text-center">
          <p className="input-label">Pedidos Pendientes</p>
          <h2 style={{ fontSize: '2rem', color: 'var(--accent-warning)' }}>3</h2>
        </div>
        <div className="glass-card text-center">
          <p className="input-label">Devoluciones (GI)</p>
          <h2 style={{ fontSize: '2rem', color: 'var(--accent-danger)' }}>1</h2>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="glass-panel">
          <h3 className="mb-2">Últimos Pagos (Registro GI)</h3>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ padding: '1rem 0' }}>Referencia</th>
                <th>Cliente</th>
                <th>Método</th>
                <th>Monto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem 0' }}>TRX-001</td>
                <td>Juan Pérez</td>
                <td>Transferencia</td>
                <td>$16.50</td>
                <td><span className="badge badge-success">Confirmado</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '1rem 0' }}>TRX-002</td>
                <td>María López</td>
                <td>Efectivo</td>
                <td>$3.00</td>
                <td><span className="badge badge-success">Confirmado</span></td>
              </tr>
              <tr>
                <td style={{ padding: '1rem 0' }}>TRX-003</td>
                <td>Carlos Ruiz</td>
                <td>Transferencia</td>
                <td>$15.00</td>
                <td><span className="badge badge-danger">Rechazado</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="glass-panel">
          <h3 className="mb-2">Alertas de Stock</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li className="flex justify-between items-center" style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid var(--accent-danger)' }}>
              <span>Pilsener Light</span>
              <span className="badge badge-danger">5 left</span>
            </li>
            <li className="flex justify-between items-center" style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', border: '1px solid var(--accent-warning)' }}>
              <span>Doritos Nacho</span>
              <span className="badge badge-warning">15 left</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
