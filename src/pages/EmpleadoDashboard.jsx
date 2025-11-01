import React from 'react';

const EmpleadoDashboard = ({ onNavigate, onLogout, user, darkMode, toggleDarkMode }) => {
  console.log('🔍 EmpleadoDashboard - user role:', user?.role);
  console.log('🔍 EmpleadoDashboard - onNavigate function:', typeof onNavigate);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: darkMode ? '#0F172A' : '#f8fafc',
      color: darkMode ? '#F1F5F9' : '#000000',
      transition: 'all 0.3s ease',
      padding: '20px'
    }}>
      {/* HEADER */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '15px 25px',
        background: darkMode ? '#1E293B' : '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
      }}>
        <h1 style={{ 
          margin: 0, 
          color: darkMode ? '#F1F5F9' : '#1E293B',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          Dashboard Empleado
        </h1>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* BOTÓN MODO NOCTURNO */}
          <button
            onClick={toggleDarkMode}
            style={{
              padding: '10px 20px',
              background: darkMode ? '#4F46E5' : '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.8'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            {darkMode ? '☀️ Modo Claro' : '🌙 Modo Nocturno'}
          </button>

          {/* BOTÓN CERRAR SESIÓN */}
          <button
            onClick={onLogout}
            style={{
              padding: '10px 20px',
              background: '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.8'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>

      {/* TARJETAS DE ACCIÓN */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '25px',
        marginBottom: '30px'
      }}>
        {/* CONSULTA DE PRODUCTOS */}
        <div style={{
          background: darkMode ? '#1E293B' : '#FFFFFF',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onClick={() => {
          console.log('🎯 Navegando a products...');
          onNavigate('products');
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        }}
        >
          <div style={{ 
            fontSize: '60px', 
            marginBottom: '20px',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
          }}>
            📦
          </div>
          <h3 style={{
            color: darkMode ? '#F1F5F9' : '#1E293B',
            marginBottom: '15px',
            fontSize: '22px',
            fontWeight: '700'
          }}>
            Consultar Inventario
          </h3>
          <p style={{
            color: darkMode ? '#CBD5E1' : '#64748B',
            marginBottom: '20px',
            lineHeight: '1.6',
            fontSize: '14px'
          }}>
            Consulta el stock disponible de productos y verifica la disponibilidad de inventario en tiempo real.
          </p>
          <div style={{
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
            color: 'white',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            display: 'inline-block',
            boxShadow: '0 4px 15px rgba(139, 95, 191, 0.3)'
          }}>
            📋 Ver Stock Disponible
          </div>
        </div>

        {/* MOVIMIENTOS DE INVENTARIO */}
        <div style={{
          background: darkMode ? '#1E293B' : '#FFFFFF',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onClick={() => {
          console.log('🎯 Navegando a movimientos...');
          onNavigate('movimientos');
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        }}
        >
          <div style={{ 
            fontSize: '60px', 
            marginBottom: '20px',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
          }}>
            📊
          </div>
          <h3 style={{
            color: darkMode ? '#F1F5F9' : '#1E293B',
            marginBottom: '15px',
            fontSize: '22px',
            fontWeight: '700'
          }}>
            Movimientos de Inventario
          </h3>
          <p style={{
            color: darkMode ? '#CBD5E1' : '#64748B',
            marginBottom: '20px',
            lineHeight: '1.6',
            fontSize: '14px'
          }}>
            Consulta los últimos movimientos, entradas, salidas y ajustes de inventario realizados.
          </p>
          <div style={{
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: 'white',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '600',
            display: 'inline-block',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
          }}>
            📈 Ver Movimientos
          </div>
        </div>
      </div>

      {/* INFORMACIÓN DEL USUARIO */}
      <div style={{
        background: darkMode ? '#1E293B' : '#FFFFFF',
        borderRadius: '12px',
        padding: '25px',
        marginTop: '40px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0',
        maxWidth: '800px',
        margin: '40px auto 0',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          color: darkMode ? '#F1F5F9' : '#1E293B',
          marginBottom: '15px',
          fontSize: '22px'
        }}>
          Bienvenido, {user?.name || user?.email}
        </h2>
        <div style={{
          display: 'inline-block',
          background: darkMode ? '#334155' : '#F1F5F9',
          padding: '8px 16px',
          borderRadius: '20px',
          marginBottom: '15px'
        }}>
          <span style={{ 
            color: darkMode ? '#CBD5E1' : '#64748B',
            fontWeight: '600'
          }}>
            Rol: <strong style={{color: '#6D28D9'}}>Empleado</strong>
          </span>
        </div>
        <p style={{ 
          color: darkMode ? '#CBD5E1' : '#64748B',
          lineHeight: '1.6',
          marginTop: '15px',
          fontStyle: 'italic',
          fontSize: '14px'
        }}>
          Permisos: Consulta de inventario y seguimiento de movimientos
        </p>
      </div>
    </div>
  );
};

export default EmpleadoDashboard;