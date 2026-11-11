import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError('Credenciales inválidas. Usa: admin, cliente o vendedor (clave: 1234)');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2 className="login-title">Luminaria Skincare</h2>
        <p className="login-subtitle">Portal de gestión y bienestar facial</p>
        
        {error && <div className="login-error">{error}</div>}
        
        <div className="form-group">
          <label className="form-label">Usuario</label>
          <input 
            type="text" 
            className="form-input"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="admin / cliente / vendedor"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <input 
            type="password" 
            className="form-input"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}