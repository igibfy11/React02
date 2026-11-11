import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../Dashboard.css';

export default function VendedorDashboard() {
  const { user, logout } = useAuth();
  
  const [pedidos, setPedidos] = useState([
    { id: 101, cliente: 'Mariana Gomez', detalle: 'Gel Limpiador Facial (x1)', total: 45000, estado: 'Pendiente' },
    { id: 102, cliente: 'Carlos Ruiz', detalle: 'Molde Facial de Hielo (x2)', total: 56000, estado: 'Completado' },
    { id: 103, cliente: 'Daniela Ospina', detalle: 'Sérum Antioxidante (x1)', total: 62000, estado: 'Pendiente' }
  ]);

  const cambiarEstado = (id) => {
    setPedidos(pedidos.map(p => p.id === id ? { ...p, estado: p.estado === 'Pendiente' ? 'Completado' : 'Pendiente' } : p));
  };

  const totalVentas = pedidos.filter(p => p.estado === 'Completado').reduce((acc, p) => acc + p.total, 0);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Panel de Ventas y Reportes</h1>
        <button onClick={logout} className="logout-button">Cerrar Sesión</button>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <h4>Ventas Totales Completadas</h4>
          <p>${totalVentas.toLocaleString()}</p>
        </div>
        <div className="stat-box">
          <h4>Pedidos Pendientes</h4>
          <p>{pedidos.filter(p => p.estado === 'Pendiente').length}</p>
        </div>
        <div className="stat-box">
          <h4>Total de Órdenes</h4>
          <p>{pedidos.length}</p>
        </div>
      </div>

      <div className="dashboard-card">
        <h3>Consulta y Gestión de Pedidos de Clientes</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Cliente</th>
              <th>Detalle de Productos</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(p => (
              <tr key={p.id}>
                <td><strong>#{p.id}</strong></td>
                <td>{p.cliente}</td>
                <td>{p.detalle}</td>
                <td>${p.total.toLocaleString()}</td>
                <td><span className={`badge ${p.estado.toLowerCase()}`}>{p.estado}</span></td>
                <td>
                  <button onClick={() => cambiarEstado(p.id)} className="action-btn secondary">
                    {p.estado === 'Pendiente' ? 'Marcar Completado' : 'Reabrir'}
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