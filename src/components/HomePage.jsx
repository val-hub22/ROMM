import React from 'react';

const HomePage = ({ onNavigate, darkMode, toggleDarkMode }) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: darkMode ? '#1a1a1a' : '#fafafa',
      color: darkMode ? '#ffffff' : '#000000'
    }}>
      {/* Header Público */}
      <header style={{
        background: darkMode ? '#2d2d2d' : 'white',
        color: darkMode ? '#ffffff' : '#000000',
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
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.8'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
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
              fontSize: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#5B21B6'}
            onMouseOut={(e) => e.target.style.color = '#6D28D9'}
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
              fontSize: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#5B21B6'}
            onMouseOut={(e) => e.target.style.color = '#6D28D9'}
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
              fontSize: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#5B21B6'}
            onMouseOut={(e) => e.target.style.color = '#6D28D9'}
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
              fontSize: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Iniciar Sesión
          </button>
        </nav>
      </header>

      {/* Hero Section */}
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
          Soluciones simples y accesibles para tu negocio
        </h1>
        <p style={{ 
          fontSize: '20px', 
          marginBottom: '2rem',
          opacity: '0.9'
        }}>
          Digitalizamos el control de tu inventario sin complicaciones
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <button 
            onClick={() => onNavigate('login')}
            style={{
              padding: '1rem 2rem',
              background: 'white',
              color: '#6D28D9',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Probar gratis 30 días
          </button>
          <button 
            onClick={() => onNavigate('servicios')}
            style={{
              padding: '1rem 2rem',
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            Conocer más
          </button>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '0.5rem' }}>📦</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '18px' }}>Gestión de inventario</h3>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '0.5rem' }}>👥</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '18px' }}>Multiusuario</h3>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '0.5rem' }}>📊</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '18px' }}>Con trazabilidad</h3>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ 
        padding: '4rem 2rem', 
        textAlign: 'center',
        background: darkMode ? '#2d2d2d' : 'white',
        color: darkMode ? '#ffffff' : '#000000'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div>
            <h3 style={{ color: '#6D28D9', fontSize: '24px', marginBottom: '1rem' }}>100% Online Escalable</h3>
            <p style={{ color: darkMode ? '#cccccc' : '#7C73B9', lineHeight: '1.6' }}>Accede desde cualquier dispositivo, sin instalaciones complicadas</p>
          </div>
          <div>
            <h3 style={{ color: '#6D28D9', fontSize: '24px', marginBottom: '1rem' }}>Fácil de usar</h3>
            <p style={{ color: darkMode ? '#cccccc' : '#7C73B9', lineHeight: '1.6' }}>Diseñado para personas sin conocimientos técnicos</p>
          </div>
        </div>
      </section>

      {/* Servicios Preview */}
      <section style={{ 
        padding: '4rem 2rem', 
        background: darkMode ? '#2d2d2d' : '#f8fafc',
        color: darkMode ? '#ffffff' : '#000000'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            color: '#6D28D9',
            fontSize: '36px',
            marginBottom: '1rem'
          }}>
            Nuestros Servicios
          </h2>
          <p style={{ color: darkMode ? '#cccccc' : '#7C73B9', marginBottom: '2rem', fontSize: '18px' }}>
            Descubre todas las funcionalidades que ofrecemos para tu negocio
          </p>
          <button 
            onClick={() => onNavigate('servicios')}
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Ver todos los servicios
          </button>
        </div>
      </section>

      {/* Planes Preview */}
      <section style={{ 
        padding: '4rem 2rem', 
        background: darkMode ? '#2d2d2d' : 'white',
        color: darkMode ? '#ffffff' : '#000000'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            color: '#6D28D9',
            fontSize: '36px',
            marginBottom: '1rem'
          }}>
            Nuestros Planes
          </h2>
          <p style={{ color: darkMode ? '#cccccc' : '#7C73B9', marginBottom: '2rem', fontSize: '18px' }}>
            Elige el plan que mejor se adapte a las necesidades de tu negocio
          </p>
          <button 
            onClick={() => onNavigate('planes')}
            style={{
              padding: '1rem 2rem',
              background: 'transparent',
              color: '#6D28D9',
              border: '2px solid #6D28D9',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#6D28D9';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#6D28D9';
            }}
          >
            Comparar planes
          </button>
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

export default HomePage;