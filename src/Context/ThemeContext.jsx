// src/Context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const inactivityTimer = useRef(null);

  // Función para reiniciar el temporizador de inactividad
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    // 1 minuto para pruebas (60000 ms)
    inactivityTimer.current = setTimeout(() => {
      handleSessionExpired();
    }, 60000); // 1 minuto
  };

  // Función para manejar la expiración de sesión
  const handleSessionExpired = () => {
    setShowSessionExpired(true);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Limpiar el temporizador
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
  };

  // Función para limpiar el mensaje de sesión expirada
  const clearSessionExpiredMessage = () => {
    setShowSessionExpired(false);
  };

  // Efecto para manejar eventos de actividad del usuario
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      if (user) {
        resetInactivityTimer();
      }
    };

    // Agregar event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Iniciar el temporizador si hay usuario logueado
    if (user) {
      resetInactivityTimer();
    }

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [user]);

  // Verificar si hay usuario en localStorage al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setShowSessionExpired(false);
    resetInactivityTimer();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
  };

  const value = {
    darkMode,
    setDarkMode,
    user,
    login,
    logout,
    showSessionExpired,
    clearSessionExpiredMessage,
    resetInactivityTimer
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};