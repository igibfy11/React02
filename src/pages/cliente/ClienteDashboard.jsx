import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../Dashboard.css';

export default function ClienteDashboard() {
  const { user, logout } = useAuth();
  const [busqueda, setBusqueda] = useState('');
  const [carrito, setCarrito] = useState([]);

  const productosDisponibles = [
    { id: 1, nombre: 'Gel Limpiador Facial', precio: 45000, desc: 'Limpieza profunda con extracto de manzanilla.', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=60' },
    { id: 2, nombre: 'Molde Facial de Hielo', precio: 28000, desc: 'Ideal para reducir poros y desinflamar el rostro.', img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&auto=format&fit=crop&q=60' },
    { id: 3, nombre: 'Mascarilla Hidratante', precio: 15000, desc: 'Tela nutritiva con ácido hialurónico.', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=60' },
    { id: 4, nombre: 'Sérum Facial Antioxidante', precio: 62000, desc: 'Vitamina C pura para iluminar la piel.', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=60' }
  ];

  const productosFiltrados = productosDisponibles.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio, 0);

  const realizarCompra = () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    alert(`¡Compra realizada con éxito por un total de $${totalCarrito.toLocaleString()}! Gracias por confiar en Luminaria.`);
    setCarrito([]);
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
        {productosFiltrados.map(p => (
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
        ))}
      </div>
    </div>
  );
}