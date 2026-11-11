import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProductos } from '../../context/ProductosContext';
import '../Dashboard.css';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { productos, agregarProducto, toggleEstadoProducto } = useProductos(); // Obtenemos funciones del contexto real

  // Estados locales para capturar los datos del nuevo producto a registrar
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevaDesc, setNuevaDesc] = useState('');
  const [nuevaImg, setNuevaImg] = useState('');

  // Función para manejar el envío del formulario de nuevo producto
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoPrecio) return;

    const nuevo = {
      id: Date.now(), // ID único basado en la fecha actual
      nombre: nuevoNombre,
      precio: Number(nuevoPrecio),
      desc: nuevaDesc || 'Producto exclusivo de skincare.',
      estado: 'Activo',
      img: nuevaImg || 'https://images.unsplash.com/photo-1608248597359-9d74b075b3a2?w=400&auto=format&fit=crop&q=60'
    };

    agregarProducto(nuevo); // Guardamos en el contexto real (localStorage)

    // Limpiamos los campos del formulario tras registrar
    setNuevoNombre('');
    setNuevoPrecio('');
    setNuevaDesc('');
    setNuevaImg('');
  };

  return (
    <div className="dashboard-container">
      {/* Cabecera del panel */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Panel de Administración — Inventario Real</h1>
        <button onClick={logout} className="logout-button">Cerrar Sesión</button>
      </div>

      {/* Formulario para agregar productos */}
      <div className="form-container-inline">
        <h3>➕ Registrar Nuevo Producto en el Sistema</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-field">
            <label>Nombre</label>
            <input type="text" placeholder="Ej: Protector Solar SPF 50" value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Precio ($)</label>
            <input type="number" placeholder="Ej: 55000" value={nuevoPrecio} onChange={e => setNuevoPrecio(e.target.value)} required />
          </div>
          <div className="form-field">
            <label>Descripción</label>
            <input type="text" placeholder="Breve descripción..." value={nuevaDesc} onChange={e => setNuevaDesc(e.target.value)} />
          </div>
          <div className="form-field">
            <label>URL Imagen</label>
            <input type="text" placeholder="https://..." value={nuevaImg} onChange={e => setNuevaImg(e.target.value)} />
          </div>
          <button type="submit" className="action-btn">Guardar Producto</button>
        </form>
      </div>

      {/* Tabla para listar y suspender/activar productos */}
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
                  {/* Botón para alternar el estado Activo / Suspendido */}
                  <button onClick={() => toggleEstadoProducto(p.id)} className={`action-btn ${p.estado === 'Activo' ? 'danger' : ''}`}>
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