import React, { useEffect, useState, useCallback, useRef } from 'react';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products.jsx';
import Proveedores from './pages/Proveedores.jsx';
import Reportes from './pages/Reportes.jsx';
import Servicios from './pages/Servicios.jsx';
import Planes from './pages/Planes.jsx';
import EmpleadoDashboard from './pages/EmpleadoDashboard.jsx';
import Movimientos from './pages/Movimientos.jsx';
import HomePage from './components/HomePage.jsx';

const darkModeStyles = `
  .dark-mode {
    background-color: #1a1a1a !important;
    color: #ffffff !important;
  }
  
  .dark-mode header {
    background-color: #2d2d2d !important;
    color: #ffffff !important;
  }
  
  .dark-mode section {
    background-color: #2d2d2d !important;
    color: #ffffff !important;
  }
  
  .dark-mode button {
    background-color: #3d3d3d !important;
    color: #ffffff !important;
    border-color: #555555 !important;
  }
  
  .dark-mode .card {
    background-color: #3d3d3d !important;
    color: #ffffff !important;
  }
`;

// Sistema de autenticación simple con localStorage
const authService = {
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('romm_user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },
  
  login: (userData) => {
    localStorage.setItem('romm_user', JSON.stringify(userData));
    localStorage.setItem('romm_token', 'fake-token-' + Date.now());
    localStorage.setItem('romm_last_activity', Date.now().toString());
  },
  
  logout: (showSessionExpired = false) => {
    if (showSessionExpired) {
      localStorage.setItem('romm_session_expired', 'true');
    } else {
      localStorage.removeItem('romm_session_expired');
    }
    localStorage.removeItem('romm_user');
    localStorage.removeItem('romm_token');
    localStorage.removeItem('romm_last_activity');
    localStorage.removeItem('romm_timeout_warning_shown');
  },
  
  updateActivity: () => {
    localStorage.setItem('romm_last_activity', Date.now().toString());
    localStorage.removeItem('romm_timeout_warning_shown');
  },
  
  hasSessionExpired: () => {
    return localStorage.getItem('romm_session_expired') === 'true';
  },
  
  clearSessionExpiredFlag: () => {
    localStorage.removeItem('romm_session_expired');
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [sessionExpired, setSessionExpired] = useState(false);
  
  // ✅ NUEVO: Estado para controlar si estamos dentro del modal
  const [isInModal, setIsInModal] = useState(false);

  // ✅ TIMEOUT CONFIGURACIÓN PARA PRUEBAS (1 minuto = 60000 ms)
  const SESSION_TIMEOUT = 1 * 60 * 1000; // 1 minuto para pruebas
  const WARNING_TIMEOUT = 30 * 1000; // Mostrar advertencia 30 segundos antes

  // Función para cerrar sesión
  const handleLogout = useCallback((showSessionExpired = false) => {
    console.log('🚪 Cerrando sesión' + (showSessionExpired ? ' por inactividad' : ''));
    authService.logout(showSessionExpired);
    setUser(null);
    setShowTimeoutWarning(false);
    setTimeRemaining(30);
    setIsInModal(false); // ✅ Resetear estado del modal
    
    if (showSessionExpired) {
      setSessionExpired(true);
      setCurrentPage('login');
    } else {
      setSessionExpired(false);
      setCurrentPage('home');
    }
  }, []);

  // Función para renovar la sesión
  const renewSession = useCallback(() => {
    console.log('🔄 Renovando sesión - usuario activo');
    authService.updateActivity();
    setShowTimeoutWarning(false);
    setTimeRemaining(30);
    setIsInModal(false); // ✅ Salir del estado modal
  }, []);

  // ✅ CORREGIDO: Detectar actividad del usuario - SOLO si no estamos en el modal
  useEffect(() => {
    const handleUserActivity = () => {
      // ✅ NO hacer nada si estamos interactuando con el modal
      if (isInModal) {
        console.log('🖱️ Actividad dentro del modal - ignorando completamente');
        return;
      }
      
      if (user) {
        authService.updateActivity();
        if (showTimeoutWarning) {
          setShowTimeoutWarning(false);
          setTimeRemaining(30);
          console.log('✅ Sesión renovada por actividad del usuario FUERA del modal');
        }
      }
    };

    // Eventos que indican actividad del usuario
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click', 'keydown'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, [user, showTimeoutWarning, isInModal]); // ✅ Agregar isInModal como dependencia

  // ✅ CORREGIDO: Contador regresivo independiente
  useEffect(() => {
    let countdownInterval;

    if (showTimeoutWarning && timeRemaining > 0) {
      console.log('⏰ Iniciando contador regresivo:', timeRemaining);
      
      countdownInterval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          console.log('⏰ Contador:', newTime);
          
          if (newTime <= 0) {
            console.log('⏰ Tiempo agotado, cerrando sesión...');
            clearInterval(countdownInterval);
            handleLogout(true);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (countdownInterval) {
        console.log('⏰ Limpiando intervalo del contador');
        clearInterval(countdownInterval);
      }
    };
  }, [showTimeoutWarning, handleLogout]);

  // ✅ CORREGIDO: Verificar inactividad
  useEffect(() => {
    let inactivityTimer;

    const checkInactivity = () => {
      if (!user) return;

      const lastActivity = parseInt(localStorage.getItem('romm_last_activity') || '0');
      const currentTime = Date.now();
      const timeElapsed = currentTime - lastActivity;
      const timeRemaining = SESSION_TIMEOUT - timeElapsed;

      console.log(`⏰ [${user.role}] Tiempo inactivo: ${Math.round(timeElapsed / 1000)} segundos`);
      console.log(`⏰ [${user.role}] Tiempo restante: ${Math.round(timeRemaining / 1000)} segundos`);

      // Mostrar advertencia 30 segundos antes del cierre
      if (timeElapsed > (SESSION_TIMEOUT - WARNING_TIMEOUT) && !showTimeoutWarning) {
        console.log(`⚠️ [${user.role}] Mostrando advertencia de timeout - 30 segundos restantes`);
        setShowTimeoutWarning(true);
        setTimeRemaining(30);
        setIsInModal(true); // ✅ Entrar en estado modal
        
        // Cerrar sesión después del tiempo completo
        inactivityTimer = setTimeout(() => {
          console.log(`⏰ [${user.role}] Timeout completado, cerrando sesión...`);
          handleLogout(true);
        }, WARNING_TIMEOUT);
      }
      // Cerrar sesión directamente si ya pasó el tiempo
      else if (timeElapsed > SESSION_TIMEOUT) {
        console.log(`⏰ [${user.role}] Tiempo de sesión agotado - Cerrando sesión`);
        handleLogout(true);
      }
    };

    if (user) {
      // Verificar cada 5 segundos para ser más preciso
      const interval = setInterval(checkInactivity, 5 * 1000);
      // Verificar inmediatamente al cargar
      checkInactivity();

      return () => {
        clearInterval(interval);
        clearTimeout(inactivityTimer);
      };
    }
  }, [user, handleLogout, SESSION_TIMEOUT, WARNING_TIMEOUT, showTimeoutWarning]);

  // Verificar si hay sesión expirada al cargar
  useEffect(() => {
    if (authService.hasSessionExpired()) {
      setSessionExpired(true);
      authService.clearSessionExpiredFlag();
    }
  }, []);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = darkModeStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    console.log('🎯 DarkMode cambiado a:', !darkMode);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    console.log('🔍 Usuario encontrado en localStorage:', currentUser);
    
    if (currentUser) {
      setUser(currentUser);
      if (currentUser.role === 'empleado') {
        setCurrentPage('empleado-dashboard');
      } else {
        setCurrentPage('dashboard');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    console.log('🔐 Iniciando sesión con:', userData);
    authService.login(userData);
    setUser(userData);
    setSessionExpired(false);
    
    if (userData.role === 'empleado') {
      setCurrentPage('empleado-dashboard');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleNavigate = (page) => {
    console.log('📍 Navegando a:', page);
    setCurrentPage(page);
    // Actualizar actividad cuando el usuario navega
    if (user) {
      authService.updateActivity();
    }
  };

  // ✅ NUEVO: Manejar entrada al modal
  const handleModalMouseEnter = () => {
    console.log('🐭 Mouse ENTRÓ al modal');
    setIsInModal(true);
  };

  // ✅ NUEVO: Manejar salida del modal
  const handleModalMouseLeave = (e) => {
    // Verificar que el mouse realmente salió del modal y no solo se movió entre elementos internos
    if (!e.currentTarget.contains(e.relatedTarget)) {
      console.log('🐭 Mouse SALIÓ del modal');
      setIsInModal(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)'
      }}>
        <div style={{ 
          color: 'white', 
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid white',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Cargando...
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  const pageProps = {
    onNavigate: handleNavigate,
    darkMode,
    toggleDarkMode,
    user
  };

  // ✅ Páginas públicas accesibles para todos
  const publicPages = ['home', 'servicios', 'planes', 'login'];
  
  if (!user || publicPages.includes(currentPage)) {
    console.log('🌐 Renderizando página pública:', currentPage);
    switch (currentPage) {
      case 'login':
        return <Login {...pageProps} onLogin={handleLogin} sessionExpired={sessionExpired} />;
      case 'servicios':
        return <Servicios {...pageProps} />;
      case 'planes':
        return <Planes {...pageProps} />;
      case 'home':
      default:
        return <HomePage {...pageProps} />;
    }
  }

  // MODAL DE ADVERTENCIA DE TIMEOUT CON CONTADOR REGRESIVO
  if (showTimeoutWarning) {
    const isCritical = timeRemaining <= 10;
    const progressPercentage = (timeRemaining / 30) * 100;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
        padding: '20px'
      }}>
        <div 
          style={{
            background: darkMode ? '#1E293B' : 'white',
            padding: '40px',
            borderRadius: '16px',
            textAlign: 'center',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0',
            animation: 'scaleIn 0.3s ease-out',
            cursor: 'default'
          }}
          onMouseEnter={handleModalMouseEnter} // ✅ NUEVO: Detectar entrada al modal
          onMouseLeave={handleModalMouseLeave} // ✅ NUEVO: Detectar salida del modal
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icono animado */}
          <div style={{
            fontSize: '60px',
            marginBottom: '20px',
            animation: timeRemaining <= 5 ? 'pulse 0.5s infinite' : 'none'
          }}>
            {isCritical ? '🔴' : '⏰'}
          </div>
          
          <h2 style={{
            color: darkMode ? '#F1F5F9' : '#1E293B',
            marginBottom: '15px',
            fontSize: '24px'
          }}>
            Sesión por expirar
          </h2>

          {/* Contador regresivo grande */}
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: isCritical ? '#DC2626' : '#D97706',
            marginBottom: '15px',
            fontFamily: 'monospace',
            textShadow: isCritical ? '0 0 10px rgba(220, 38, 38, 0.5)' : 'none'
          }}>
            {timeRemaining}s
          </div>

          {/* Barra de progreso */}
          <div style={{
            width: '100%',
            height: '8px',
            background: darkMode ? '#334155' : '#E5E7EB',
            borderRadius: '4px',
            marginBottom: '25px',
            overflow: 'hidden'
          }}>
            <div 
              style={{
                width: `${progressPercentage}%`,
                height: '100%',
                background: isCritical 
                  ? 'linear-gradient(90deg, #DC2626, #EF4444)' 
                  : 'linear-gradient(90deg, #D97706, #F59E0B)',
                borderRadius: '4px',
                transition: 'width 1s linear, background 0.3s ease',
                boxShadow: isCritical ? '0 0 10px rgba(220, 38, 38, 0.5)' : 'none'
              }}
            />
          </div>
          
          <p style={{
            color: darkMode ? '#CBD5E1' : '#64748B',
            marginBottom: '25px',
            lineHeight: '1.6',
            fontSize: '16px'
          }}>
            Tu sesión se cerrará automáticamente en <strong>{timeRemaining} segundos</strong> por inactividad.
          </p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              onClick={renewSession}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flex: 1
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              🟢 Continuar Sesión
            </button>
            <button
              onClick={() => handleLogout(false)}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                color: darkMode ? '#F1F5F9' : '#374151',
                border: `2px solid ${darkMode ? '#475569' : '#D1D5DB'}`,
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flex: 1
              }}
              onMouseOver={(e) => {
                e.target.style.background = darkMode ? '#374151' : '#F3F4F6';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              Cerrar Sesión
            </button>
          </div>
          
          <p style={{
            marginTop: '20px',
            color: darkMode ? '#94A3B8' : '#9CA3AF',
            fontSize: '12px',
            fontStyle: 'italic'
          }}>
            ⚠️ Mueve el mouse FUERA de este cuadro para renovar la sesión automáticamente
          </p>
        </div>

        {/* Estilos de animación */}
        <style>
          {`
            @keyframes scaleIn {
              from { 
                opacity: 0; 
                transform: scale(0.8) translateY(-20px); 
              }
              to { 
                opacity: 1; 
                transform: scale(1) translateY(0); 
              }
            }
            
            @keyframes pulse {
              0%, 100% { 
                opacity: 1; 
                transform: scale(1); 
              }
              50% { 
                opacity: 0.7; 
                transform: scale(1.1); 
              }
            }
          `}
        </style>
      </div>
    );
  }

  // ÁREA PRIVADA - SEGÚN ROL DEL USUARIO
  console.log('🔑 Usuario logueado:', user);
  console.log('📄 Página actual:', currentPage);

  // 1. SI ES EMPLEADO
  if (user.role === 'empleado') {
    console.log('👨‍💼 Renderizando área de empleado');
    switch (currentPage) {
      case 'products':
        return <Products {...pageProps} />;
      case 'movimientos':
        return <Movimientos {...pageProps} />;
      case 'servicios':
        return <Servicios {...pageProps} />;
      case 'planes':
        return <Planes {...pageProps} />;
      case 'empleado-dashboard':
      default:
        return <EmpleadoDashboard 
          {...pageProps} 
          onLogout={() => handleLogout(false)} 
        />;
    }
  }

  // 2. SI ES ADMIN
  if (user.role === 'admin') {
    console.log('👨‍💼 Renderizando área de admin');
    switch (currentPage) {
      case 'products':
        return <Products {...pageProps} />;
      case 'proveedores':
        return <Proveedores {...pageProps} />;
      case 'reportes':
        return <Reportes {...pageProps} />;
      case 'servicios':
        return <Servicios {...pageProps} />;
      case 'planes':
        return <Planes {...pageProps} />;
      case 'dashboard':
      default:
        return <Dashboard {...pageProps} onLogout={() => handleLogout(false)} />;
    }
  }

  // Fallback
  return <HomePage {...pageProps} />;
}

export default App;