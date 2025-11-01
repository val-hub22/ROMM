import React from 'react';

const Dashboard = ({ onNavigate, onLogout, user, darkMode, toggleDarkMode }) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: darkMode ? '#0F172A' : '#f8fafc',
      color: darkMode ? '#F1F5F9' : '#000000',
      transition: 'all 0.3s ease'
    }}>
      {/* Header del Dashboard Admin */}
      <header style={{
        background: darkMode ? '#1E293B' : 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: darkMode ? '1px solid #334155' : '1px solid #E5E7EB'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            👑
          </div>
          <div>
            <h3 style={{ 
              margin: 0, 
              color: darkMode ? '#F1F5F9' : '#1F2937',
              fontSize: '20px'
            }}>
              Panel de Administrador
            </h3>
            <p style={{ 
              margin: 0, 
              color: '#6B7280', 
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>Hola,</span>
              <strong style={{ color: '#8B5FBF' }}>{user?.name || 'Admin'}</strong>
              <span style={{
                background: '#8B5FBF',
                color: 'white',
                padding: '0.2rem 0.5rem',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 'bold'
              }}>
                ADMIN
              </span>
            </p>
          </div>
        </div>
        
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* BOTÓN MODO NOCTURNO - ¡AQUÍ ESTÁ! */}
          <button 
            onClick={toggleDarkMode}
            style={{
              padding: '0.5rem 1rem',
              background: darkMode ? '#374151' : '#f0f0f0',
              color: darkMode ? '#F1F5F9' : '#000000',
              border: darkMode ? '1px solid #4B5563' : '1px solid #D1D5DB',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = darkMode ? '#4B5563' : '#e5e7eb';
            }}
            onMouseOut={(e) => {
              e.target.style.background = darkMode ? '#374151' : '#f0f0f0';
            }}
          >
            {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
          </button>

          <button 
            onClick={onLogout}
            style={{
              padding: '0.6rem 1.2rem',
              background: '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#DC2626'}
            onMouseOut={(e) => e.target.style.background = '#EF4444'}
          >
            🚪 Cerrar Sesión
          </button>
        </nav>
      </header>

      {/* Métricas del Dashboard */}
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          color: darkMode ? '#F1F5F9' : '#1F2937', 
          marginBottom: '2rem',
          fontSize: '1.8rem'
        }}>
          Resumen del Sistema
        </h2>
        
        {/* Tarjetas de Métricas */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {/* Productos */}
          <div style={{
            background: darkMode ? '#1E293B' : 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: darkMode ? '1px solid #334155' : '1px solid #E5E7EB',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ 
                  color: darkMode ? '#94A3B8' : '#6B7280', 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '14px' 
                }}>
                  Total Productos
                </p>
                <h3 style={{ 
                  color: darkMode ? '#F1F5F9' : '#1F2937', 
                  margin: 0, 
                  fontSize: '28px' 
                }}>
                  156
                </h3>
                <span style={{ 
                  color: '#10B981',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  ↗ 12% este mes
                </span>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#3B82F6',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px'
              }}>
                📦
              </div>
            </div>
          </div>

          {/* Ventas */}
          <div style={{
            background: darkMode ? '#1E293B' : 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: darkMode ? '1px solid #334155' : '1px solid #E5E7EB'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ 
                  color: darkMode ? '#94A3B8' : '#6B7280', 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '14px' 
                }}>
                  Ventas Hoy
                </p>
                <h3 style={{ 
                  color: darkMode ? '#F1F5F9' : '#1F2937', 
                  margin: 0, 
                  fontSize: '28px' 
                }}>
                  $2,840
                </h3>
                <span style={{ 
                  color: '#10B981',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  ↗ 8% vs ayer
                </span>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#10B981',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px'
              }}>
                💰
              </div>
            </div>
          </div>

          {/* Stock Bajo */}
          <div style={{
            background: darkMode ? '#1E293B' : 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: darkMode ? '1px solid #334155' : '1px solid #E5E7EB'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ 
                  color: darkMode ? '#94A3B8' : '#6B7280', 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '14px' 
                }}>
                  Stock Bajo
                </p>
                <h3 style={{ 
                  color: darkMode ? '#F1F5F9' : '#1F2937', 
                  margin: 0, 
                  fontSize: '28px' 
                }}>
                  12
                </h3>
                <span style={{ 
                  color: '#EF4444',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  ⚠️ Necesitan atención
                </span>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#F59E0B',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px'
              }}>
                ⚠️
              </div>
            </div>
          </div>
        </div>

        {/* Funcionalidades Principales */}
        <h3 style={{ 
          color: darkMode ? '#F1F5F9' : '#1F2937', 
          marginBottom: '1.5rem',
          fontSize: '1.4rem'
        }}>
          Gestión del Sistema
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem' 
        }}>
          {/* Gestión de Productos */}
          <div style={{
            background: darkMode ? '#1E293B' : 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: darkMode ? '1px solid #334155' : '1px solid #E5E7EB',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onClick={() => onNavigate('products')}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '24px' }}>📦</div>
              <h4 style={{ 
                margin: 0, 
                color: darkMode ? '#F1F5F9' : '#1F2937',
                fontSize: '1.2rem'
              }}>
                Gestión de Productos
              </h4>
            </div>
            <p style={{ 
              color: darkMode ? '#94A3B8' : '#6B7280', 
              marginBottom: '1rem',
              lineHeight: '1.5'
            }}>
              Administra el inventario completo: agregar, editar, eliminar productos y controlar stock.
            </p>
            <button 
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Gestionar Productos
            </button>
          </div>

          {/* Gestión de Proveedores */}
          <div style={{
            background: darkMode ? '#1E293B' : 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: darkMode ? '1px solid #334155' : '1px solid #E5E7EB',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onClick={() => onNavigate('proveedores')}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '24px' }}>👥</div>
              <h4 style={{ 
                margin: 0, 
                color: darkMode ? '#F1F5F9' : '#1F2937',
                fontSize: '1.2rem'
              }}>
                Gestión de Proveedores
              </h4>
            </div>
            <p style={{ 
              color: darkMode ? '#94A3B8' : '#6B7280', 
              marginBottom: '1rem',
              lineHeight: '1.5'
            }}>
              Administra proveedores, contactos y categorías. Controla el abastecimiento de productos.
            </p>
            <button 
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Gestionar Proveedores
            </button>
          </div>

          {/* Reportes */}
          <div style={{
            background: darkMode ? '#1E293B' : 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: darkMode ? '1px solid #334155' : '1px solid #E5E7EB',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onClick={() => onNavigate('reportes')}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '24px' }}>📊</div>
              <h4 style={{ 
                margin: 0, 
                color: darkMode ? '#F1F5F9' : '#1F2937',
                fontSize: '1.2rem'
              }}>
                Reportes y Análisis
              </h4>
            </div>
            <p style={{ 
              color: darkMode ? '#94A3B8' : '#6B7280', 
              marginBottom: '1rem',
              lineHeight: '1.5'
            }}>
              Genera reportes de ventas, inventario y análisis de rendimiento del negocio.
            </p>
            <button 
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Ver Reportes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;