import React, { useEffect } from 'react';

const Servicios = ({ onNavigate, darkMode, toggleDarkMode }) => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: darkMode ? '#1a1a1a' : '#fafafa',
      color: darkMode ? '#ffffff' : '#000000'
    }}>
      {/* Header Público */}
      <header style={{
        background: darkMode ? '#2d2d2d' : 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
          onClick={() => onNavigate('home')}
        >
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
        
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {/* Botón Modo Nocturno */}
          <button 
            onClick={toggleDarkMode}
            style={{
              padding: '0.5rem 1rem',
              background: darkMode ? '#4d4d4d' : '#f0f0f0',
              color: darkMode ? '#ffffff' : '#000000',
              border: '1px solid #ddd',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {darkMode ? '☀️' : '🌙'}
            {darkMode ? ' Claro' : ' Oscuro'}
          </button>
          
          <button 
            onClick={() => onNavigate('home')}
            style={{ 
              color: '#6D28D9', 
              textDecoration: 'none', 
              fontWeight: '500',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Inicio
          </button>
          <button 
            onClick={() => onNavigate('servicios')}
            style={{ 
              color: '#6D28D9', 
              textDecoration: 'none', 
              fontWeight: '500',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Servicios
          </button>
          <button 
            onClick={() => onNavigate('planes')}
            style={{ 
              color: '#6D28D9', 
              textDecoration: 'none', 
              fontWeight: '500',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Planes
          </button>
          <button 
            onClick={() => onNavigate('login')}
            style={{
              padding: '0.5rem 1.5rem',
              background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Iniciar Sesión
          </button>
        </nav>
      </header>

      {/* Hero Section Servicios */}
      <section style={{
        background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
        color: 'white',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: '700', 
          marginBottom: '1rem' 
        }}>
          Nuestros Servicios
        </h1>
        <p style={{ 
          fontSize: '20px', 
          marginBottom: '2rem',
          opacity: '0.9',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Soluciones pensadas para pequeñas y medianas empresas que buscan simplicidad
        </p>
      </section>

      {/* Servicios Grid */}
      <section style={{ 
        padding: '4rem 2rem', 
        maxWidth: '1200px', 
        margin: '0 auto',
        background: darkMode ? '#1a1a1a' : 'transparent'
      }}>
        <div style={{ display: 'grid', gap: '2rem' }}>
          
          {/* Gestión de Inventario */}
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(139, 95, 191, 0.1)',
            border: darkMode ? '2px solid #444444' : '2px solid #F3F4F6',
            color: darkMode ? '#ffffff' : '#000000'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                flexShrink: 0
              }}>
                📦
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ 
                  margin: '0 0 1rem 0',
                  color: '#6D28D9',
                  fontSize: '24px',
                  fontWeight: '600'
                }}>
                  Gestión de Inventario
                </h2>
                <ul style={{ 
                  margin: 0,
                  paddingLeft: '1.5rem',
                  color: darkMode ? '#cccccc' : '#4B5563',
                  fontSize: '16px',
                  lineHeight: '1.6'
                }}>
                  <li>Registro y control de stock en tiempo real</li>
                  <li>Trazabilidad completa de cambios y movimientos</li>
                  <li>Reportes básicos y avanzados de inventario</li>
                  <li>Alertas automáticas de stock bajo</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 100% Online y Escalable */}
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(139, 95, 191, 0.1)',
            border: darkMode ? '2px solid #444444' : '2px solid #F3F4F6',
            color: darkMode ? '#ffffff' : '#000000'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                flexShrink: 0
              }}>
                🌐
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ 
                  margin: '0 0 1rem 0',
                  color: '#059669',
                  fontSize: '24px',
                  fontWeight: '600'
                }}>
                  100% Online y Escalable
                </h2>
                <ul style={{ 
                  margin: 0,
                  paddingLeft: '1.5rem',
                  color: darkMode ? '#cccccc' : '#4B5563',
                  fontSize: '16px',
                  lineHeight: '1.6'
                }}>
                  <li>Acceso desde cualquier dispositivo con internet</li>
                  <li>Sin instalación local - todo en la nube</li>
                  <li>Sistema modular con posibilidad de expansión</li>
                  <li>Integración con otros sistemas (ventas, clientes, facturación)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Soporte Multiusuario */}
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(139, 95, 191, 0.1)',
            border: darkMode ? '2px solid #444444' : '2px solid #F3F4F6',
            color: darkMode ? '#ffffff' : '#000000'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                flexShrink: 0
              }}>
                👥
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ 
                  margin: '0 0 1rem 0',
                  color: '#D97706',
                  fontSize: '24px',
                  fontWeight: '600'
                }}>
                  Soporte Multiusuario
                </h2>
                <ul style={{ 
                  margin: 0,
                  paddingLeft: '1.5rem',
                  color: darkMode ? '#cccccc' : '#4B5563',
                  fontSize: '16px',
                  lineHeight: '1.6'
                }}>
                  <li>Acceso simultáneo para varios usuarios</li>
                  <li>Control de roles y permisos personalizables</li>
                  <li>Historial detallado de acciones por usuario</li>
                  <li>Límites de acceso configurables</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Orientado a Microempresas */}
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(139, 95, 191, 0.1)',
            border: darkMode ? '2px solid #444444' : '2px solid #F3F4F6',
            color: darkMode ? '#ffffff' : '#000000'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                flexShrink: 0
              }}>
                🏪
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ 
                  margin: '0 0 1rem 0',
                  color: '#DC2626',
                  fontSize: '24px',
                  fontWeight: '600'
                }}>
                  Orientado a Microempresas
                </h2>
                <ul style={{ 
                  margin: 0,
                  paddingLeft: '1.5rem',
                  color: darkMode ? '#cccccc' : '#4B5563',
                  fontSize: '16px',
                  lineHeight: '1.6'
                }}>
                  <li>Diseñado completamente en español</li>
                  <li>Pensado para almacenes, kioscos, estudios contables, servicios técnicos</li>
                  <li>Fácil de usar para personas sin conocimientos técnicos</li>
                  <li>Implementación rápida y soporte personalizado</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '4rem 2rem', 
        background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '32px', marginBottom: '1rem' }}>
          ¿Listo para optimizar tu inventario?
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '2rem', opacity: '0.9' }}>
          Comienza hoy mismo y lleva el control de tu negocio al siguiente nivel
        </p>
        <button style={{
          padding: '1rem 2rem',
          background: 'white',
          color: '#6D28D9',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
        onClick={() => onNavigate('login')}>
          Comenzar Ahora
        </button>
      </section>

      {/* Footer */}
      <footer style={{
        background: darkMode ? '#1a1a1a' : '#1F2937',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
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
              fontSize: '20px'
            }}>
              ROMM Solutions
            </span>
          </div>
          <p style={{ color: '#9CA3AF', marginBottom: '1rem' }}>
            Simplificando la gestión de inventarios para pequeñas y medianas empresas
          </p>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>
            © 2024 ROMM Solutions. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Servicios;