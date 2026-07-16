/**
 * Simula la validación de un pago por transferencia contra la API del Banco Pichincha u otro banco.
 * Tarda hasta 5 segundos y puede fallar o aceptar simulando una red real.
 */
export async function simulateBankTransferValidation(token: string): Promise<{ success: boolean; message: string; timeout?: boolean }> {
  return new Promise((resolve) => {
    const delay = Math.random() * 4000 + 1000; // 1s to 5s delay
    
    setTimeout(() => {
      // Simulate 5% chance of timeout exceeding 5 seconds (which is a requirement failure case in GI)
      if (delay > 4800) {
        resolve({ success: false, message: 'Timeout: La plataforma de banca móvil no responde.', timeout: true });
        return;
      }
      
      // Simulate 90% success rate for correct tokens
      const isSuccess = Math.random() > 0.1;
      if (isSuccess) {
        resolve({ success: true, message: 'Transacción confirmada exitosamente.' });
      } else {
        resolve({ success: false, message: 'Transacción rechazada por el banco (fondos insuficientes o token inválido).' });
      }
    }, delay);
  });
}
