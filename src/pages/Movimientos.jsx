import React, { useState, useEffect } from 'react';

const Movimientos = ({ onNavigate, darkMode, toggleDarkMode, user }) => {
  const [movimientos, setMovimientos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    // Simular datos de movimientos
    const datosMovimientos = [
      {
        id: 1,
        tipo: 'entrada',
        producto: 'Laptop Dell XPS 13',
        cantidad: 5,
        fecha: '2024-01-15',
        usuario: 'empleado@romm.com',
        motivo: 'Compra nueva'
      },
      {
        id: 2,
        tipo: 'salida',
        producto: 'Mouse Inalámbrico',
        cantidad: 3,
        fecha: '2024-01-14',
        usuario: 'empleado@romm.com',
        motivo: 'Venta a cliente'
      },
      {
        id: 3,
        tipo: 'entrada',
        producto: 'Teclado Mecánico',
        cantidad: 10,
        fecha: '2024-01-13',
        usuario: 'empleado@romm.com',
        motivo: 'Reabastecimiento'
      },
      {
        id: 4,
        tipo: 'salida',
        producto: 'Monitor 24"',
        cantidad: 2,
        fecha: '2024-01-12',
        usuario: 'empleado@romm.com',
        motivo: 'Instalación oficina'
      },
      {
        id: 5,
        tipo: 'entrada',
        producto: 'Cables HDMI',
        cantidad: 25,
        fecha: '2024-01-11',
        usuario: 'empleado@romm.com',
        motivo: 'Compra mayorista'
      }
    ];
    setMovimientos(datosMovimientos);
  }, []);

  const movimientosFiltrados = movimientos.filter(mov => {
    if (filtro === 'todos') return true;
    return mov.tipo === filtro;
  }).filter(mov => {
    if (!fechaInicio && !fechaFin) return true;
    const fechaMov = new Date(mov.fecha);
    const inicio = fechaInicio ? new Date(fechaInicio) : null;
    const fin = fechaFin ? new Date(fechaFin) : null;
    
    if (inicio && fin) {
      return fechaMov >= inicio && fechaMov <= fin;
    } else if (inicio) {
      return fechaMov >= inicio;
    } else if (fin) {
      return fechaMov <= fin;
    }
    return true;
  });

  const getColorTipo = (tipo) => {
    return tipo === 'entrada' 
      ? (darkMode ? '#10B981' : '#059669')
      : (darkMode ? '#EF4444' : '#DC2626');
  };

  const getIconoTipo = (tipo) => {
    return tipo === 'entrada' ? '⬆️' : '⬇️';
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: darkMode ? '#1a1a1a' : '#f8fafc',
      color: darkMode ? '#ffffff' : '#000000',
      padding: '0 0 2rem 0'
    }}>
      {/* Header */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <button 
            onClick={() => onNavigate('empleado-dashboard')}
            style={{
              background: 'none',
              border: 'none',
              color: darkMode ? '#60A5FA' : '#2563EB',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ← Volver al Dashboard
          </button>
          <h1 style={{ 
            margin: 0, 
            color: darkMode ? '#ffffff' : '#1f2937',
            fontSize: '24px'
          }}>
            Movimientos de Inventario
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* ✅ BOTÓN MODO NOCTURNO AGREGADO */}
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

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: darkMode ? '#d1d5db' : '#6b7280',
            fontSize: '14px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px'
            }}>
              {user?.name?.charAt(0) || 'E'}
            </div>
            <span>{user?.name || 'Empleado'}</span>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Filtros y Controles */}
        <div style={{
          background: darkMode ? '#2d2d2d' : 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            {/* Filtro por Tipo */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: darkMode ? '#d1d5db' : '#374151',
                fontWeight: '500'
              }}>
                Tipo de Movimiento
              </label>
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                  borderRadius: '8px',
                  background: darkMode ? '#374151' : 'white',
                  color: darkMode ? 'white' : '#374151',
                  fontSize: '14px'
                }}
              >
                <option value="todos">Todos los movimientos</option>
                <option value="entrada">Entradas</option>
                <option value="salida">Salidas</option>
              </select>
            </div>

            {/* Filtro por Fecha Inicio */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: darkMode ? '#d1d5db' : '#374151',
                fontWeight: '500'
              }}>
                Fecha Inicio
              </label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                  borderRadius: '8px',
                  background: darkMode ? '#374151' : 'white',
                  color: darkMode ? 'white' : '#374151',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Filtro por Fecha Fin */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: darkMode ? '#d1d5db' : '#374151',
                fontWeight: '500'
              }}>
                Fecha Fin
              </label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
                  borderRadius: '8px',
                  background: darkMode ? '#374151' : 'white',
                  color: darkMode ? 'white' : '#374151',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Resumen */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: darkMode ? '#1e40af' : '#dbeafe',
              color: darkMode ? 'white' : '#1e40af',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Total: {movimientosFiltrados.length} movimientos
            </div>
            <div style={{
              background: darkMode ? '#059669' : '#d1fae5',
              color: darkMode ? 'white' : '#059669',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Entradas: {movimientosFiltrados.filter(m => m.tipo === 'entrada').length}
            </div>
            <div style={{
              background: darkMode ? '#dc2626' : '#fee2e2',
              color: darkMode ? 'white' : '#dc2626',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Salidas: {movimientosFiltrados.filter(m => m.tipo === 'salida').length}
            </div>
          </div>
        </div>

        {/* Lista de Movimientos */}
        <div style={{
          background: darkMode ? '#2d2d2d' : 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {movimientosFiltrados.length === 0 ? (
            <div style={{
              padding: '3rem',
              textAlign: 'center',
              color: darkMode ? '#9ca3af' : '#6b7280'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>No hay movimientos</h3>
              <p style={{ margin: 0 }}>No se encontraron movimientos con los filtros seleccionados.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '800px'
              }}>
                <thead>
                  <tr style={{
                    background: darkMode ? '#374151' : '#f9fafb',
                    borderBottom: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
                  }}>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      color: darkMode ? '#d1d5db' : '#374151',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>Tipo</th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      color: darkMode ? '#d1d5db' : '#374151',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>Producto</th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      color: darkMode ? '#d1d5db' : '#374151',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>Cantidad</th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      color: darkMode ? '#d1d5db' : '#374151',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>Fecha</th>
                    <th style={{
                      padding: '1rem',
                      textAlign: 'left',
                      color: darkMode ? '#d1d5db' : '#374151',
                      fontWeight: '600',
                      fontSize: '14px'
                    }}>Motivo</th>
                  </tr>
                </thead>
                <tbody>
                  {movimientosFiltrados.map((movimiento) => (
                    <tr 
                      key={movimiento.id}
                      style={{
                        borderBottom: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.parentNode.style.background = darkMode ? '#374151' : '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        e.target.parentNode.style.background = 'transparent';
                      }}
                    >
                      <td style={{ padding: '1rem' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span style={{ fontSize: '16px' }}>
                            {getIconoTipo(movimiento.tipo)}
                          </span>
                          <span style={{
                            color: getColorTipo(movimiento.tipo),
                            fontWeight: '600',
                            fontSize: '14px',
                            textTransform: 'capitalize'
                          }}>
                            {movimiento.tipo}
                          </span>
                        </div>
                      </td>
                      <td style={{ 
                        padding: '1rem',
                        color: darkMode ? '#e5e7eb' : '#374151',
                        fontWeight: '500'
                      }}>
                        {movimiento.producto}
                      </td>
                      <td style={{ 
                        padding: '1rem',
                        color: darkMode ? '#e5e7eb' : '#374151',
                        fontWeight: '600'
                      }}>
                        {movimiento.cantidad}
                      </td>
                      <td style={{ 
                        padding: '1rem',
                        color: darkMode ? '#9ca3af' : '#6b7280',
                        fontSize: '14px'
                      }}>
                        {new Date(movimiento.fecha).toLocaleDateString('es-ES')}
                      </td>
                      <td style={{ 
                        padding: '1rem',
                        color: darkMode ? '#d1d5db' : '#4b5563',
                        fontSize: '14px'
                      }}>
                        {movimiento.motivo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: darkMode ? '#2d2d2d' : '#f8fafc',
          borderRadius: '12px',
          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
        }}>
          <h3 style={{ 
            margin: '0 0 1rem 0',
            color: darkMode ? '#e5e7eb' : '#374151',
            fontSize: '18px'
          }}>
            📋 Información de Movimientos
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1rem',
            color: darkMode ? '#d1d5db' : '#6b7280',
            fontSize: '14px'
          }}>
            <div>
              <strong>Entradas (⬆️):</strong> Productos que ingresan al inventario
            </div>
            <div>
              <strong>Salidas (⬇️):</strong> Productos que salen del inventario
            </div>
            <div>
              <strong>Filtros:</strong> Puedes filtrar por tipo y rango de fechas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movimientos;