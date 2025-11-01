// src/components/layout/PublicLayout.jsx
import React from 'react';

const PublicLayout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Header Público */}
      <header style={{
        background: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            R
          </div>
          <span style={{
            fontWeight: 'bold',
            color: '#6D28D9',
            fontSize: '24px'
          }}>
            ROMM Solutions
          </span>
        </div>
        
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <a href="#inicio" style={{ color: '#6D28D9', textDecoration: 'none', fontWeight: '500' }}>Inicio</a>
          <a href="#servicios" style={{ color: '#6D28D9', textDecoration: 'none', fontWeight: '500' }}>Servicios</a>
          <a href="#planes" style={{ color: '#6D28D9', textDecoration: 'none', fontWeight: '500' }}>Planes</a>
          <button style={{
            padding: '0.5rem 1.5rem',
            background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Iniciar Sesión
          </button>
        </nav>
      </header>

      {/* Contenido Público */}
      {children}
    </div>
  );
};

export default PublicLayout;