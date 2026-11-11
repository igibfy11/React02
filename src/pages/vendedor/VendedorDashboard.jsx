import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePedidos } from '../../context/PedidosContext';
import '../Dashboard.css';

export default function VendedorDashboard() {
  const { logout } = useAuth();
  const { pedidos, toggleEstadoPedido } = usePedidos(); // Leemos los pedidos reales y la función de actualizar

  // Calculamos dinámicamente el dinero de los pedidos que ya están 'Completado'
  const totalVentas = pedidos
    .filter(p => p.estado === 'Completado')
    .reduce((acc, p) => acc + p.total, 0);

  // Contamos cuántos pedidos siguen en estado 'Pendiente'
  const pedidosPendientes = pedidos.filter(p => p.estado === 'Pendiente').length;

  return (
    <div className="dashboard-container">
      {/* Cabecera */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Panel de Ventas y Reportes</h1>
        <button onClick={logout} className="logout-button">Cerrar Sesión</button>
      </div>

      {/* Tarjetas de estadísticas calculadas en tiempo real */}
      <div className="stats-row">
        <div className="stat-box">
          <h4>Ventas Totales Completadas</h4>
          <p>${totalVentas.toLocaleString()}</p>
        </div>
        <div className="stat-box">
          <h4>Pedidos Pendientes</h4>
          <p>{pedidosPendientes}</p>
        </div>
        <div className="stat-box">
          <h4>Total de Órdenes</h4>
          <p>{pedidos.length}</p>
        </div>
      </div>

      {/* Tabla con los pedidos reales generados por los clientes */}
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
                  {/* Botón que guarda el cambio de estado de forma permanente */}
                  <button onClick={() => toggleEstadoPedido(p.id)} className="action-btn secondary">
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