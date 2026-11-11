import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ClienteDashboard from './pages/cliente/ClienteDashboard';
import VendedorDashboard from './pages/vendedor/VendedorDashboard';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          {user.role === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
          {user.role === 'cliente' && <Route path="/cliente" element={<ClienteDashboard />} />}
          {user.role === 'vendedor' && <Route path="/vendedor" element={<VendedorDashboard />} />}
          
          {/* Redirección automática al panel correspondiente según el rol autenticado */}
          <Route path="*" element={<Navigate to={`/${user.role}`} replace />} />
        </>
      )}
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}