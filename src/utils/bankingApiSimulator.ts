/**
 * Simula la validación de un pago por transferencia contra la API del banco.
 * Ahora incluye una restricción estricta de timeout de 5 segundos.
 */
export async function simulateBankTransferValidation(token: string): Promise<{ success: boolean; message: string; timeout?: boolean }> {
  return new Promise((resolve) => {
    // Generate a random delay between 1s and 6s.
    // If it exceeds 5s, the frontend must strictly handle it as a timeout failure.
    const delay = Math.random() * 5000 + 1000; 
    
    const isTimeout = delay > 5000;
    
    // We enforce the response at Math.min(delay, 5001) to simulate the strict cutoff.
    setTimeout(() => {
      if (isTimeout) {
        resolve({ success: false, message: 'TIMEOUT: La plataforma de banca móvil excedió los 5 segundos de espera permitidos (RNF-006).', timeout: true });
        return;
      }
      
      const isSuccess = Math.random() > 0.15;
      if (isSuccess) {
        resolve({ success: true, message: 'TRX_OK: Transacción confirmada exitosamente.' });
      } else {
        resolve({ success: false, message: 'TRX_REJECTED: Transacción rechazada por el banco (fondos o token inválido).' });
      }
    }, Math.min(delay, 5001));
  });
}
