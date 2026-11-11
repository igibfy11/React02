import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProductos } from '../../context/ProductosContext';
import { usePedidos } from '../../context/PedidosContext';
import '../Dashboard.css';

export default function ClienteDashboard() {
  const { user, logout } = useAuth();
  const { productos } = useProductos();
  const { registrarPedido } = usePedidos(); // Obtenemos la función para guardar la compra real

  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState([]);

  // Filtramos solo los productos activos
  const productosActivos = productos.filter(p => p.estado === 'Activo');

  // Filtramos según el buscador
  const productosFiltrados = productosActivos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Agregar al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  // Calcular total
  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio, 0);

  // Procesar y guardar la compra real en el sistema
  const realizarCompra = () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    // Registramos el pedido real con el nombre del usuario logueado
    registrarPedido(user?.username || 'Cliente Web', carrito, totalCarrito);

    alert(`¡Compra realizada con éxito por $${totalCarrito.toLocaleString()}! Tu pedido ha sido enviado al área de ventas.`);
    setCarrito([]); // Vaciamos el carrito
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Boutique Luminaria Skincare</h1>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ fontWeight: '600' }}>🛍️ Carrito: {carrito.length} items (${totalCarrito.toLocaleString()})</span>
          {carrito.length > 0 && (
            <button onClick={realizarCompra} className="action-btn" style={{ backgroundColor: '#3b5343' }}>Pagar Ahora</button>
          )}
          <button onClick={logout} className="logout-button">Cerrar Sesión</button>
        </div>
      </div>

      <div className="controls-bar">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Buscar productos de skincare..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {productosFiltrados.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6b7268', padding: '40px' }}>No hay productos disponibles en este momento.</p>
        ) : (
          productosFiltrados.map(p => (
            <div key={p.id} className="product-card">
              <img src={p.img} alt={p.nombre} className="product-img" />
              <div className="product-info">
                <div className="product-title">{p.nombre}</div>
                <div className="product-price">${p.precio.toLocaleString()}</div>
                <div className="product-desc">{p.desc}</div>
                <button onClick={() => agregarAlCarrito(p)} className="action-btn">
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}