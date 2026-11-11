import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../Dashboard.css';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Gel Limpiador Facial', precio: 45000, estado: 'Activo', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=60' },
    { id: 2, nombre: 'Molde Facial de Hielo', precio: 28000, estado: 'Activo', img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&auto=format&fit=crop&q=60' },
    { id: 3, nombre: 'Mascarilla de Hidratación', precio: 15000, estado: 'Suspendido', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=60' }
  ]);

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevaImg, setNuevaImg] = useState('');

  const agregarProducto = (e) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoPrecio) return;
    
    const nuevo = {
      id: Date.now(),
      nombre: nuevoNombre,
      precio: Number(nuevoPrecio),
      estado: 'Activo',
      img: nuevaImg || 'https://images.unsplash.com/photo-1608248597359-9d74b075b3a2?w=400&auto=format&fit=crop&q=60'
    };

    setProductos([...productos, nuevo]);
    setNuevoNombre('');
    setNuevoPrecio('');
    setNuevaImg('');
  };

  const toggleSuspender = (id) => {
    setProductos(productos.map(p => p.id === id ? { ...p, estado: p.estado === 'Activo' ? 'Suspendido' : 'Activo' } : p));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Panel de Administración — Inventario Skincare</h1>
        <button onClick={logout} className="logout-button">Cerrar Sesión</button>
      </div>

      <div className="form-container-inline">
        <h3>➕ Registrar Nuevo Producto</h3>
        <form onSubmit={agregarProducto} className="form-grid">
          <div className="form-field">
            <label>Nombre del Producto</label>
            <input type="text" placeholder="Ej: Sérum Vitamina C" value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Precio ($)</label>
            <input type="number" placeholder="Ej: 55000" value={nuevoPrecio} onChange={e => setNuevoPrecio(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>URL de Imagen (Opcional)</label>
            <input type="text" placeholder="https://..." value={nuevaImg} onChange={e => setNuevaImg(e.target.value)} />
          </div>
          <button type="submit" className="action-btn">Guardar Producto</button>
        </form>
      </div>

      <div className="dashboard-card">
        <h3>Catálogo General y Gestión de Estado</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td><img src={p.img} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} /></td>
                <td><strong>{p.nombre}</strong></td>
                <td>${p.precio.toLocaleString()}</td>
                <td><span className={`badge ${p.estado.toLowerCase()}`}>{p.estado}</span></td>
                <td>
                  <button onClick={() => toggleSuspender(p.id)} className={`action-btn ${p.estado === 'Activo' ? 'danger' : ''}`}>
                    {p.estado === 'Activo' ? 'Suspender' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}