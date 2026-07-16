import ProductCatalog from '@/components/ProductCatalog';

export default function PedidosPage() {
  return (
    <div className="container">
      <div className="mb-4">
        <h1>Pedidos de Bebidas y Snacks</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Haz tu pedido directo a la cancha, ¡rápido y fácil!</p>
      </div>
      <ProductCatalog />
    </div>
  );
}
