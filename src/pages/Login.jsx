import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const Login = ({ onLogin, onNavigate, darkMode, toggleDarkMode, sessionExpired = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usingMockAuth, setUsingMockAuth] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    
    // Limpiar mensaje de error si sessionExpired cambia
    if (sessionExpired) {
      setError('');
    }
  }, [darkMode, sessionExpired]);

  // Autenticación de respaldo que siempre funciona - CORREGIDO
  const mockAuth = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@romm.com' && password === 'admin123') {
          const user = {
            id: 1,
            email: email,
            name: 'Administrador',
            role: 'admin'
          };
          const token = `mock-jwt-token-${user.id}`;
          localStorage.setItem('romm_user', JSON.stringify(user));
          localStorage.setItem('romm_token', token);
          resolve({ data: { ...user, token } });
        } 
        else if (email === 'empleado@romm.com' && password === 'empleado123') {
          const user = {
            id: 2,
            email: email,
            name: 'Empleado',
            role: 'empleado' // ✅ CORREGIDO: era 'employee', ahora 'empleado'
          };
          const token = `mock-jwt-token-${user.id}`;
          localStorage.setItem('romm_user', JSON.stringify(user));
          localStorage.setItem('romm_token', token);
          resolve({ data: { ...user, token } });
        } 
        else {
          reject(new Error('Credenciales incorrectas. Usa las credenciales de prueba.'));
        }
      }, 1500);
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      
      // Intentar con API primero
      try {
        response = await authAPI.login(email, password);
        setUsingMockAuth(false);
      } catch (apiError) {
        // Si falla la API, usar autenticación simulada
        console.log('API no disponible, usando autenticación simulada');
        response = await mockAuth(email, password);
        setUsingMockAuth(true);
      }

      console.log('Login exitoso:', response.data);
      onLogin(response.data);
      
    } catch (error) {
      setError(error.message);
      console.error('Error en login:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener colores según el tema
  const getColors = () => {
    if (darkMode) {
      return {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        cardBackground: '#1e293b',
        textPrimary: '#f1f5f9',
        textSecondary: '#e2e8f0', 
        textMuted: '#94a3b8',
        border: '#475569',
        inputBackground: '#1e293b',
        inputText: '#f1f5f9',
        primary: '#8b5cf6',
        buttonHover: '#374151',
        warningBackground: '#7c2d12',
        warningBorder: '#9a3412',
        warningText: '#fdba74'
      };
    } else {
      return {
        background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
        cardBackground: '#ffffff',
        textPrimary: '#1e293b',
        textSecondary: '#475569',
        textMuted: '#64748b',
        border: '#e2e8f0',
        inputBackground: '#ffffff',
        inputText: '#1e293b',
        primary: '#6D28D9',
        buttonHover: '#f8fafc',
        warningBackground: '#fffbeb',
        warningBorder: '#fcd34d',
        warningText: '#92400e'
      };
    }
  };

  const colors = getColors();

  const containerStyle = {
    minHeight: '100vh',
    background: colors.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '1rem',
    position: 'relative',
    transition: 'all 0.3s ease'
  };

  const cardStyle = {
    background: colors.cardBackground,
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '420px',
    border: `1px solid ${colors.border}`,
    transition: 'all 0.3s ease'
  };

  const inputStyle = {
    width: '100%', 
    padding: '14px 16px',
    border: `2px solid ${colors.border}`,
    borderRadius: '12px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    background: colors.inputBackground,
    color: colors.inputText,
    fontFamily: 'inherit'
  };

  const buttonBaseStyle = {
    position: 'absolute',
    background: colors.cardBackground,
    border: `1px solid ${colors.border}`,
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: colors.primary,
    fontSize: '20px',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    zIndex: 10
  };

  return (
    <div style={containerStyle}>
      
      {/* 🔙 BOTÓN VOLVER */}
      <button 
        onClick={() => onNavigate('home')}
        style={{
          ...buttonBaseStyle,
          top: '2rem',
          left: '2rem',
          fontSize: '24px'
        }}
        onMouseOver={(e) => {
          e.target.style.background = colors.buttonHover;
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = colors.cardBackground;
          e.target.style.transform = 'scale(1)';
        }}
        title="Volver al inicio"
      >
        ←
      </button>

      {/* 🌙 BOTÓN MODO NOCTURNO */}
      <button 
        onClick={toggleDarkMode}
        style={{
          ...buttonBaseStyle,
          top: '2rem',
          right: '2rem'
        }}
        onMouseOver={(e) => {
          e.target.style.background = colors.buttonHover;
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = colors.cardBackground;
          e.target.style.transform = 'scale(1)';
        }}
        title={darkMode ? 'Modo Claro' : 'Modo Nocturno'}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Login Card */}
      <div style={cardStyle}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '70px',
            height: '70px',
            background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '28px',
            margin: '0 auto 1rem auto',
            boxShadow: '0 8px 25px rgba(139, 95, 191, 0.4)'
          }}>
            R
          </div>
          <h2 style={{ 
            margin: '0 0 0.5rem 0',
            color: colors.textPrimary,
            fontSize: '28px',
            fontWeight: '600'
          }}>
            ROMM Solutions
          </h2>
          <p style={{ 
            margin: 0,
            color: colors.textSecondary,
            fontSize: '16px'
          }}>
            Inicia sesión en tu cuenta
          </p>
          {usingMockAuth && (
            <p style={{ 
              margin: '0.5rem 0 0 0',
              color: colors.textMuted,
              fontSize: '12px',
              fontStyle: 'italic'
            }}>
              🔧 Usando autenticación simulada
            </p>
          )}
        </div>

        {/* Mensaje de Sesión Expirada */}
        {sessionExpired && (
          <div style={{
            background: colors.warningBackground,
            border: `1px solid ${colors.warningBorder}`,
            color: colors.warningText,
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease-in'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '8px'
            }}>
              <div style={{ fontSize: '20px' }}>⏰</div>
              <strong style={{ fontSize: '16px' }}>
                Tu sesión expiró
              </strong>
            </div>
            <p style={{ 
              margin: 0, 
              fontSize: '14px',
              opacity: 0.9
            }}>
              Volvé a ingresar para seguir operando
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: colors.textSecondary,
              fontWeight: '500',
              fontSize: '14px'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.border;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <label style={{
                color: colors.textSecondary,
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Contraseña
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: colors.textMuted,
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                {showPassword ? '👁️ Ocultar' : '👁️ Mostrar'}
              </button>
            </div>
            
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.border;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ 
              background: darkMode ? '#7F1D1D' : '#FEF2F2',
              color: darkMode ? '#FCA5A5' : '#DC2626',
              padding: '12px 16px',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              border: darkMode ? '1px solid #991B1B' : '1px solid #FECACA',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                background: '#DC2626', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                !
              </div>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '16px',
              background: loading 
                ? (darkMode ? '#475569' : '#9CA3AF') 
                : 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: loading ? 'none' : '0 8px 25px rgba(139, 95, 191, 0.4)',
              fontFamily: 'inherit'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 30px rgba(139, 95, 191, 0.6)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(139, 95, 191, 0.4)';
              }
            }}
          >
            {loading ? '🔄 Iniciando sesión...' : '🚀 Iniciar Sesión'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div style={{ 
          marginTop: '2rem',
          padding: '1.5rem',
          background: darkMode ? '#334155' : '#f8fafc',
          borderRadius: '12px',
          border: `1px solid ${colors.border}`
        }}>
          <p style={{ 
            margin: '0 0 1rem 0',
            color: colors.textSecondary,
            fontWeight: '600',
            fontSize: '14px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '16px' }}>💡</span>
            Credenciales de prueba - Haz clic para autocompletar
          </p>
          
          <div style={{ display: 'grid', gap: '1rem', fontSize: '13px' }}>
            {/* Tarjeta Admin */}
            <div 
              style={{ 
                background: colors.cardBackground,
                padding: '1rem',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                setEmail('admin@romm.com');
                setPassword('admin123');
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '600', color: '#6D28D9' }}>Administrador</span>
                <span style={{ 
                  background: '#6D28D9', 
                  color: 'white', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '10px', 
                  fontWeight: 'bold' 
                }}>
                  FULL ACCESS
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ color: colors.textMuted, fontSize: '12px' }}>Email:</span>
                <span style={{ fontWeight: '500', color: colors.textSecondary, fontSize: '12px' }}>admin@romm.com</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: colors.textMuted, fontSize: '12px' }}>Contraseña:</span>
                <span style={{ fontWeight: '500', color: colors.textSecondary, fontSize: '12px' }}>admin123</span>
              </div>
              <div style={{ 
                marginTop: '0.5rem', 
                padding: '0.25rem', 
                background: darkMode ? '#4B5563' : '#E5E7EB', 
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                <span style={{ color: colors.textMuted, fontSize: '10px' }}>↙️ Haz clic para autocompletar</span>
              </div>
            </div>

            {/* Tarjeta Empleado */}
            <div 
              style={{ 
                background: colors.cardBackground,
                padding: '1rem',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                setEmail('empleado@romm.com');
                setPassword('empleado123');
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '600', color: '#10B981' }}>Empleado</span>
                <span style={{ 
                  background: '#10B981', 
                  color: 'white', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '4px', 
                  fontSize: '10px', 
                  fontWeight: 'bold' 
                }}>
                  LIMITED
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ color: colors.textMuted, fontSize: '12px' }}>Email:</span>
                <span style={{ fontWeight: '500', color: colors.textSecondary, fontSize: '12px' }}>empleado@romm.com</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: colors.textMuted, fontSize: '12px' }}>Contraseña:</span>
                <span style={{ fontWeight: '500', color: colors.textSecondary, fontSize: '12px' }}>empleado123</span>
              </div>
              <div style={{ 
                marginTop: '0.5rem', 
                padding: '0.25rem', 
                background: darkMode ? '#4B5563' : '#E5E7EB', 
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                <span style={{ color: colors.textMuted, fontSize: '10px' }}>↙️ Haz clic para autocompletar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Información de seguridad */}
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center'
        }}>
          <p style={{ 
            margin: 0,
            color: colors.textMuted,
            fontSize: '11px',
            lineHeight: '1.4'
          }}>
            🔒 Tus credenciales se mantienen seguras en este dispositivo
          </p>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Login;