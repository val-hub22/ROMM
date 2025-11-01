import React, { useEffect } from 'react';

const Planes = ({ onNavigate, darkMode, toggleDarkMode }) => {

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

      {/* Hero Section Planes */}
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
          Nuestros Planes
        </h1>
        <p style={{ 
          fontSize: '20px', 
          marginBottom: '2rem',
          opacity: '0.9',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Elegí el plan que mejor se adapte a las necesidades de tu negocio
        </p>
      </section>

      {/* Planes Grid */}
      <section style={{ 
        padding: '4rem 2rem', 
        maxWidth: '1200px', 
        margin: '0 auto',
        background: darkMode ? '#1a1a1a' : 'transparent'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          
          {/* Plan Gratuito */}
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(139, 95, 191, 0.1)',
            border: darkMode ? '2px solid #444444' : '2px solid #E5E7EB',
            textAlign: 'center',
            position: 'relative',
            color: darkMode ? '#ffffff' : '#000000'
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#10B981',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Más Popular
            </div>
            
            <h3 style={{ 
              margin: '1rem 0 1rem 0',
              color: '#6D28D9',
              fontSize: '24px',
              fontWeight: '600'
            }}>
              Plan Gratuito
            </h3>
            
            <div style={{ 
              marginBottom: '2rem',
              color: '#10B981',
              fontSize: '32px',
              fontWeight: '700'
            }}>
              $0
            </div>

            <ul style={{ 
              margin: '0 0 2rem 0',
              padding: 0,
              listStyle: 'none',
              textAlign: 'left',
              color: darkMode ? '#cccccc' : '#4B5563',
              fontSize: '14px',
              lineHeight: '1.8'
            }}>
              <li style={{ 
                padding: '0.5rem 0', 
                borderBottom: darkMode ? '1px solid #444444' : '1px solid #F3F4F6', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#10B981' }}>✓</span>
                Historial completo (visible últimos 15 días)
              </li>
              <li style={{ 
                padding: '0.5rem 0', 
                borderBottom: darkMode ? '1px solid #444444' : '1px solid #F3F4F6', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#10B981' }}>✓</span>
                Exportación manual (PDF o Excel)
              </li>
              <li style={{ 
                padding: '0.5rem 0', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#10B981' }}>✓</span>
                Sin límites de productos ni registros
              </li>
            </ul>

            <button style={{
              width: '100%',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={() => onNavigate('login')}>
              Comenzar Gratis
            </button>
          </div>

          {/* Plan Básico */}
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(139, 95, 191, 0.1)',
            border: '2px solid #8B5FBF',
            textAlign: 'center',
            color: darkMode ? '#ffffff' : '#000000'
          }}>
            <h3 style={{ 
              margin: '0 0 1rem 0',
              color: '#6D28D9',
              fontSize: '24px',
              fontWeight: '600'
            }}>
              Plan Básico
            </h3>
            
            <div style={{ 
              marginBottom: '2rem',
              color: '#6D28D9',
              fontSize: '32px',
              fontWeight: '700'
            }}>
              $8.000
              <span style={{ fontSize: '16px', color: darkMode ? '#a5a5a5' : '#7C73B9' }}>/mes</span>
            </div>

            <ul style={{ 
              margin: '0 0 2rem 0',
              padding: 0,
              listStyle: 'none',
              textAlign: 'left',
              color: darkMode ? '#cccccc' : '#4B5563',
              fontSize: '14px',
              lineHeight: '1.8'
            }}>
              <li style={{ 
                padding: '0.5rem 0', 
                borderBottom: darkMode ? '1px solid #444444' : '1px solid #F3F4F6', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#10B981' }}>✓</span>
                Hasta 5 usuarios simultáneos
              </li>
              <li style={{ 
                padding: '0.5rem 0', 
                borderBottom: darkMode ? '1px solid #444444' : '1px solid #F3F4F6', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#10B981' }}>✓</span>
                Historial completo sin límites
              </li>
              <li style={{ 
                padding: '0.5rem 0', 
                borderBottom: darkMode ? '1px solid #444444' : '1px solid #F3F4F6', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#10B981' }}>✓</span>
                Reportes simples y exportación
              </li>
              <li style={{ 
                padding: '0.5rem 0', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#10B981' }}>✓</span>
                Soporte técnico prioritario
              </li>
            </ul>

            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              background: darkMode ? '#3d3d3d' : '#F3F4F6',
              borderRadius: '8px',
              fontSize: '14px',
              color: darkMode ? '#a5a5a5' : '#6B7280',
              fontWeight: '500'
            }}>
              Ideal para pequeñas empresas
            </div>

            <button style={{
              width: '100%',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={() => onNavigate('login')}>
              Elegir Plan Básico
            </button>
          </div>

          {/* Plan Premium */}
          <div style={{
            background: darkMode ? '#2d2d2d' : 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(139, 95, 191, 0.1)',
            border: '2px solid #F59E0B',
            textAlign: 'center',
            color: darkMode ? '#ffffff' : '#000000'
          }}>
            <h3 style={{ 
              margin: '0 0 1rem 0',
              color: '#D97706',
              fontSize: '24px',
              fontWeight: '600'
            }}>
              Plan Premium
            </h3>
            
            <div style={{ 
              marginBottom: '2rem',
              color: '#D97706',
              fontSize: '32px',
              fontWeight: '700'
            }}>
              $25.000
              <span style={{ fontSize: '16px', color: darkMode ? '#a5a5a5' : '#7C73B9' }}>/mes</span>
            </div>

            <ul style={{ 
              margin: '0 0 2rem 0',
              padding: 0,
              listStyle: 'none',
              textAlign: 'left',
              color: darkMode ? '#cccccc' : '#4B5563',
              fontSize: '14px',
              lineHeight: '1.8'
            }}>
              <li style={{ 
                padding: '0.5rem 0', 
                borderBottom: darkMode ? '1px solid #444444' : '1px solid #F3F4F6', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#10B981' }}>✓</span>
                Usuarios ilimitados
              </li>
              <li style={{ 
                padding: '0.5rem 0', 
                borderBottom: darkMode ? '1px solid #444444' : '1px solid #F3F4F6', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#10B981' }}>✓</span>
                Reportes avanzados y analytics
              </li>
              <li style={{ 
                padding: '0.5rem 0', 
                borderBottom: darkMode ? '1px solid #444444' : '1px solid #F3F4F6', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#10B981' }}>✓</span>
                Backup automático diario
              </li>
              <li style={{ 
                padding: '0.5rem 0', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <span style={{ color: '#10B981' }}>✓</span>
                Personalización completa del sistema
              </li>
            </ul>

            <button style={{
              width: '100%',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={() => onNavigate('login')}>
              Elegir Plan Premium
            </button>
          </div>
        </div>

        {/* Nota adicional */}
        <div style={{
          background: darkMode ? '#1e3a1e' : '#F0FDF4',
          border: darkMode ? '2px solid #2d5a2d' : '2px solid #BBF7D0',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center',
          color: darkMode ? '#a5f3a5' : '#065F46'
        }}>
          <p style={{ 
            margin: 0,
            fontSize: '14px',
            fontWeight: '500'
          }}>
            💡 Todos los planes incluyen actualizaciones gratuitas y soporte técnico. 
            Prueba gratuita de 30 días disponible para todos los planes pagos.
          </p>
        </div>
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

export default Planes;