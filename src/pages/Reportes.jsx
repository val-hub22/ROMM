import React, { useState } from 'react';

const Reportes = ({ onNavigate, darkMode, toggleDarkMode }) => {
  const [selectedReport, setSelectedReport] = useState('stock-bajo');
  const [dateRange, setDateRange] = useState('7-days');

  // 📊 Datos de ejemplo para reportes COMPLETOS
  const reportData = {
    'stock-bajo': [
      { 
        id: 1, 
        name: "Mouse Inalámbrico Logitech", 
        category: "Tecnología", 
        brand: "Logitech",
        stock: 3, 
        minStock: 10,
        status: "Crítico",
        lastUpdate: "2024-01-20"
      },
      { 
        id: 2, 
        name: "Auriculares Gamer", 
        category: "Tecnología", 
        brand: "HyperX",
        stock: 2, 
        minStock: 5,
        status: "Crítico",
        lastUpdate: "2024-01-19"
      }
    ],
    'sin-stock': [
      { 
        id: 1, 
        name: "Auriculares Coradir", 
        category: "Tecnología", 
        brand: "Coradir",
        stock: 0, 
        minStock: 10,
        status: "Sin Stock",
        lastUpdate: "2024-01-15"
      }
    ],
    'movimientos': [
      { 
        id: 1, 
        product: "Mouse Logitech", 
        type: "Entrada", 
        quantity: 50,
        date: "2024-01-20",
        user: "admin"
      }
    ],
    'proveedores': [
      { 
        id: 1, 
        name: "Razer Distribuidores", 
        contact: "contacto@razer.com", 
        status: "Inactivo",
        totalProducts: 15,
        activeProducts: 10,
        lastOrder: "2024-01-15",
        rating: "Bajo",
        performance: "65%"
      },
      { 
        id: 2, 
        name: "Logitech Supply", 
        contact: "pedidos@logitech.com", 
        status: "Activo",
        totalProducts: 25,
        activeProducts: 22,
        lastOrder: "2024-01-20",
        rating: "Excelente",
        performance: "95%"
      }
    ],
    'ventas': [
      { 
        id: 1, 
        product: "Mouse Inalámbrico Logitech", 
        category: "Tecnología",
        unitsSold: 45,
        totalRevenue: 1349.55,
        date: "2024-01-20",
        profit: 674.78,
        trend: "Alta"
      },
      { 
        id: 2, 
        product: "Teclado Mecánico RGB Razer", 
        category: "Tecnología",
        unitsSold: 28,
        totalRevenue: 2519.72,
        date: "2024-01-19",
        profit: 1259.86,
        trend: "Media"
      }
    ]
  };

  const reportTypes = [
    { id: 'stock-bajo', name: 'Stock Bajo Crítico', icon: '⚠️', description: 'Productos con stock por debajo del mínimo' },
    { id: 'sin-stock', name: 'Sin Stock', icon: '❌', description: 'Productos agotados' },
    { id: 'movimientos', name: 'Movimientos Recientes', icon: '📈', description: 'Entradas y salidas de inventario' },
    { id: 'proveedores', name: 'Análisis Proveedores', icon: '👥', description: 'Rendimiento de proveedores' },
    { id: 'ventas', name: 'Reporte de Ventas', icon: '💰', description: 'Análisis de ventas por período' }
  ];

  const stats = {
    criticalProducts: reportData['stock-bajo'].length,
    outOfStock: reportData['sin-stock'].length,
    totalMovements: reportData['movimientos'].length,
    totalSuppliers: reportData['proveedores'].length,
    totalSales: reportData['ventas'].reduce((sum, sale) => sum + sale.unitsSold, 0)
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Crítico": case "Inactivo":
        return {
          background: darkMode ? '#7F1D1D' : '#FEE2E2',
          color: darkMode ? '#FCA5A5' : '#DC2626'
        };
      case "Bajo":
        return {
          background: darkMode ? '#78350F' : '#FEF3C7',
          color: darkMode ? '#FDBA74' : '#92400E'
        };
      case "Sin Stock":
        return {
          background: darkMode ? '#374151' : '#F3F4F6',
          color: darkMode ? '#D1D5DB' : '#6B7280'
        };
      default:
        return {
          background: darkMode ? '#064E3B' : '#D1FAE5',
          color: darkMode ? '#34D399' : '#065F46'
        };
    }
  };

  const getMovementStyle = (type) => {
    return type === "Entrada" 
      ? { background: darkMode ? '#064E3B' : '#D1FAE5', color: darkMode ? '#34D399' : '#065F46' }
      : { background: darkMode ? '#7F1D1D' : '#FEE2E2', color: darkMode ? '#FCA5A5' : '#DC2626' };
  };

  const getRatingStyle = (rating) => {
    switch (rating) {
      case "Excelente":
        return {
          background: darkMode ? '#064E3B' : '#D1FAE5',
          color: darkMode ? '#34D399' : '#065F46'
        };
      case "Alto":
        return {
          background: darkMode ? '#065F46' : '#A7F3D0',
          color: darkMode ? '#6EE7B7' : '#047857'
        };
      case "Medio":
        return {
          background: darkMode ? '#78350F' : '#FEF3C7',
          color: darkMode ? '#FDBA74' : '#92400E'
        };
      case "Bajo":
        return {
          background: darkMode ? '#7F1D1D' : '#FEE2E2',
          color: darkMode ? '#FCA5A5' : '#DC2626'
        };
      default:
        return {
          background: darkMode ? '#374151' : '#F3F4F6',
          color: darkMode ? '#D1D5DB' : '#6B7280'
        };
    }
  };

  const getTrendStyle = (trend) => {
    switch (trend) {
      case "Alta":
        return {
          background: darkMode ? '#064E3B' : '#D1FAE5',
          color: darkMode ? '#34D399' : '#065F46'
        };
      case "Media":
        return {
          background: darkMode ? '#78350F' : '#FEF3C7',
          color: darkMode ? '#FDBA74' : '#92400E'
        };
      case "Baja":
        return {
          background: darkMode ? '#7F1D1D' : '#FEE2E2',
          color: darkMode ? '#FCA5A5' : '#DC2626'
        };
      default:
        return {
          background: darkMode ? '#374151' : '#F3F4F6',
          color: darkMode ? '#D1D5DB' : '#6B7280'
        };
    }
  };

  // 🎯 FUNCIÓN REAL PARA EXPORTAR PDF
  const handleExportPDF = () => {
    const reportName = reportTypes.find(r => r.id === selectedReport)?.name || 'Reporte';
    const timestamp = new Date().toLocaleString();
    
    // Crear contenido HTML para el PDF
    const content = `
      <html>
        <head>
          <title>${reportName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; border-bottom: 2px solid #6D28D9; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f8fafc; font-weight: bold; }
            .header { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .timestamp { color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${reportName}</h1>
            <div class="timestamp">Generado: ${timestamp}</div>
          </div>
          <table>
            <thead>
              ${generateTableHeaders()}
            </thead>
            <tbody>
              ${generateTableRows()}
            </tbody>
          </table>
          <div style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">
            ROMM Solutions - Sistema de Gestión de Inventario
          </div>
        </body>
      </html>
    `;

    // Abrir ventana para imprimir (simula PDF)
    const printWindow = window.open('', '_blank');
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
    
    alert('📄 PDF generado correctamente. Usa la opción de imprimir para guardar como PDF.');
  };

  // 🎯 FUNCIÓN REAL PARA EXPORTAR EXCEL (CSV)
  const handleExportExcel = () => {
    const reportName = reportTypes.find(r => r.id === selectedReport)?.name || 'Reporte';
    const data = currentReport;
    
    if (data.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    // Crear contenido CSV
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => 
      Object.values(item).map(value => 
        `"${String(value).replace(/"/g, '""')}"`
      ).join(',')
    );
    
    const csvContent = [headers, ...rows].join('\n');
    
    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_${selectedReport}_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('📊 Archivo CSV descargado correctamente. Ábrelo con Excel.');
  };

  // 🎯 FUNCIÓN REAL PARA EXPORTAR JSON
  const handleExportJSON = () => {
    const reportName = reportTypes.find(r => r.id === selectedReport)?.name || 'Reporte';
    const exportData = {
      reporte: reportName,
      tipo: selectedReport,
      rangoFechas: dateRange,
      generado: new Date().toISOString(),
      totalRegistros: currentReport.length,
      datos: currentReport
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `reporte_${selectedReport}_${new Date().getTime()}.json`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('🔗 Archivo JSON descargado correctamente.');
  };

  // 🎯 FUNCIONES AUXILIARES PARA GENERAR TABLAS
  const generateTableHeaders = () => {
    if (selectedReport === 'movimientos') {
      return `
        <tr>
          <th>Producto</th>
          <th>Tipo</th>
          <th>Cantidad</th>
          <th>Fecha</th>
          <th>Usuario</th>
        </tr>
      `;
    } else if (selectedReport === 'proveedores') {
      return `
        <tr>
          <th>Proveedor</th>
          <th>Contacto</th>
          <th>Estado</th>
          <th>Productos</th>
          <th>Último Pedido</th>
          <th>Rating</th>
          <th>Rendimiento</th>
        </tr>
      `;
    } else if (selectedReport === 'ventas') {
      return `
        <tr>
          <th>Producto</th>
          <th>Categoría</th>
          <th>Unidades Vendidas</th>
          <th>Ingresos Totales</th>
          <th>Ganancia</th>
          <th>Fecha</th>
          <th>Tendencia</th>
        </tr>
      `;
    } else {
      return `
        <tr>
          <th>Producto</th>
          <th>Categoría</th>
          <th>Marca</th>
          <th>Stock</th>
          <th>Mínimo</th>
          <th>Estado</th>
          <th>Última Actualización</th>
        </tr>
      `;
    }
  };

  const generateTableRows = () => {
    return currentReport.map(item => {
      if (selectedReport === 'movimientos') {
        return `
          <tr>
            <td>${item.product}</td>
            <td>${item.type}</td>
            <td>${item.quantity} unidades</td>
            <td>${item.date}</td>
            <td>${item.user}</td>
          </tr>
        `;
      } else if (selectedReport === 'proveedores') {
        return `
          <tr>
            <td>${item.name}</td>
            <td>${item.contact}</td>
            <td>${item.status}</td>
            <td>${item.activeProducts} / ${item.totalProducts} activos</td>
            <td>${item.lastOrder}</td>
            <td>${item.rating}</td>
            <td>${item.performance}</td>
          </tr>
        `;
      } else if (selectedReport === 'ventas') {
        return `
          <tr>
            <td>${item.product}</td>
            <td>${item.category}</td>
            <td>${item.unitsSold} unidades</td>
            <td>$${item.totalRevenue.toLocaleString()}</td>
            <td>$${item.profit.toLocaleString()}</td>
            <td>${item.date}</td>
            <td>${item.trend}</td>
          </tr>
        `;
      } else {
        return `
          <tr>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.brand}</td>
            <td>${item.stock} unidades</td>
            <td>${item.minStock} unidades</td>
            <td>${item.status}</td>
            <td>${item.lastUpdate}</td>
          </tr>
        `;
      }
    }).join('');
  };

  const currentReport = reportData[selectedReport] || [];

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
        padding: '20px 30px',
        background: darkMode ? '#1E293B' : '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
        border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
      }}>
        <div>
          <h1 style={{ 
            margin: 0, 
            color: darkMode ? '#F1F5F9' : '#1E293B',
            fontSize: '32px',
            fontWeight: 'bold'
          }}>
            📊 Reportes del Sistema
          </h1>
          <p style={{
            color: darkMode ? '#CBD5E1' : '#64748B',
            margin: '8px 0 0 0',
            fontSize: '16px'
          }}>
            Genera reportes detallados de tu inventario
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button
            onClick={toggleDarkMode}
            style={{
              padding: '12px 20px',
              background: darkMode ? '#4F46E5' : '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            style={{
              padding: '12px 20px',
              background: '#6B7280',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            ← Volver
          </button>
        </div>
      </div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: darkMode ? '#1E293B' : '#FFFFFF',
          borderRadius: '16px',
          padding: '25px',
          textAlign: 'center',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚠️</div>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: 'bold',
            color: darkMode ? '#F59E0B' : '#D97706',
            marginBottom: '5px'
          }}>
            {stats.criticalProducts}
          </div>
          <div style={{ 
            color: darkMode ? '#CBD5E1' : '#64748B',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Stock Crítico
          </div>
        </div>

        <div style={{
          background: darkMode ? '#1E293B' : '#FFFFFF',
          borderRadius: '16px',
          padding: '25px',
          textAlign: 'center',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>👥</div>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: 'bold',
            color: darkMode ? '#8B5FBF' : '#6D28D9',
            marginBottom: '5px'
          }}>
            {stats.totalSuppliers}
          </div>
          <div style={{ 
            color: darkMode ? '#CBD5E1' : '#64748B',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Proveedores
          </div>
        </div>

        <div style={{
          background: darkMode ? '#1E293B' : '#FFFFFF',
          borderRadius: '16px',
          padding: '25px',
          textAlign: 'center',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>💰</div>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: 'bold',
            color: darkMode ? '#10B981' : '#059669',
            marginBottom: '5px'
          }}>
            {stats.totalSales}
          </div>
          <div style={{ 
            color: darkMode ? '#CBD5E1' : '#64748B',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Ventas Totales
          </div>
        </div>

        <div style={{
          background: darkMode ? '#1E293B' : '#FFFFFF',
          borderRadius: '16px',
          padding: '25px',
          textAlign: 'center',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>📈</div>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: 'bold',
            color: darkMode ? '#3B82F6' : '#2563EB',
            marginBottom: '5px'
          }}>
            {stats.totalMovements}
          </div>
          <div style={{ 
            color: darkMode ? '#CBD5E1' : '#64748B',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Movimientos
          </div>
        </div>
      </div>

      {/* CONTROLES DE REPORTE */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '30px',
        marginBottom: '30px'
      }}>
        {/* SELECTOR DE REPORTE */}
        <div style={{
          background: darkMode ? '#1E293B' : '#FFFFFF',
          borderRadius: '16px',
          padding: '25px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
        }}>
          <h3 style={{ 
            color: darkMode ? '#F1F5F9' : '#1E293B',
            margin: '0 0 20px 0',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            📋 Tipo de Reporte
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            {reportTypes.map((report) => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                style={{
                  background: selectedReport === report.id 
                    ? (darkMode ? '#334155' : '#F1F5F9')
                    : (darkMode ? '#1E293B' : '#FFFFFF'),
                  border: selectedReport === report.id 
                    ? `2px solid ${darkMode ? '#8B5FBF' : '#6D28D9'}` 
                    : `1px solid ${darkMode ? '#334155' : '#E2E8F0'}`,
                  borderRadius: '12px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>
                  {report.icon}
                </div>
                <div style={{ 
                  color: darkMode ? '#F1F5F9' : '#1E293B',
                  fontWeight: '600',
                  marginBottom: '5px',
                  fontSize: '14px'
                }}>
                  {report.name}
                </div>
                <div style={{ 
                  color: darkMode ? '#94A3B8' : '#64748B',
                  fontSize: '12px'
                }}>
                  {report.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTROLES DE EXPORTACIÓN */}
        <div style={{
          background: darkMode ? '#1E293B' : '#FFFFFF',
          borderRadius: '16px',
          padding: '25px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
        }}>
          <h3 style={{ 
            color: darkMode ? '#F1F5F9' : '#1E293B',
            margin: '0 0 20px 0',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            ⚙️ Configuración
          </h3>

          {/* SELECTOR DE RANGO DE FECHAS */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              color: darkMode ? '#CBD5E1' : '#374151',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Rango de Fechas
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                background: darkMode ? '#334155' : '#F8FAFC',
                border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
                borderRadius: '8px',
                color: darkMode ? '#F1F5F9' : '#000000',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="7-days">Últimos 7 días</option>
              <option value="30-days">Últimos 30 días</option>
              <option value="90-days">Últimos 90 días</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>

          {/* BOTONES DE EXPORTACIÓN */}
          <div>
            <label style={{ 
              display: 'block', 
              color: darkMode ? '#CBD5E1' : '#374151',
              marginBottom: '12px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Exportar Reporte
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleExportPDF}
                style={{
                  padding: '12px',
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
                  justifyContent: 'center'
                }}
              >
                📄 Exportar PDF
              </button>
              <button
                onClick={handleExportExcel}
                style={{
                  padding: '12px',
                  background: '#10B981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center'
                }}
              >
                📊 Exportar Excel
              </button>
              <button
                onClick={handleExportJSON}
                style={{
                  padding: '12px',
                  background: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center'
                }}
              >
                🔗 Exportar JSON
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REPORTE DETALLADO */}
      <div style={{
        background: darkMode ? '#1E293B' : '#FFFFFF',
        borderRadius: '16px',
        padding: '25px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
        border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ 
            color: darkMode ? '#F1F5F9' : '#1E293B',
            margin: 0,
            fontSize: '20px',
            fontWeight: '600'
          }}>
            {reportTypes.find(r => r.id === selectedReport)?.name || 'Reporte'}
          </h3>
          <div style={{ 
            color: darkMode ? '#94A3B8' : '#64748B',
            fontSize: '14px'
          }}>
            {currentReport.length} registros encontrados
          </div>
        </div>

        {currentReport.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            color: darkMode ? '#CBD5E1' : '#64748B'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
            <h3>No hay datos para este reporte</h3>
            <p>Selecciona otro tipo de reporte o ajusta los filtros</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              color: darkMode ? '#F1F5F9' : '#000000'
            }}>
              <thead>
                <tr style={{ 
                  background: darkMode ? '#334155' : '#F1F5F9',
                  borderBottom: `2px solid ${darkMode ? '#475569' : '#E2E8F0'}`
                }}>
                  {selectedReport === 'movimientos' ? (
                    <>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Producto</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Tipo</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Cantidad</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Fecha</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Usuario</th>
                    </>
                  ) : selectedReport === 'proveedores' ? (
                    <>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Proveedor</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Contacto</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Estado</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Productos</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Último Pedido</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Rating</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Rendimiento</th>
                    </>
                  ) : selectedReport === 'ventas' ? (
                    <>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Producto</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Categoría</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Unidades Vendidas</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Ingresos Totales</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Ganancia</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Fecha</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Tendencia</th>
                    </>
                  ) : (
                    <>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Producto</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Categoría</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Marca</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Stock</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Mínimo</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Estado</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Última Actualización</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentReport.map((item) => (
                  <tr key={item.id} style={{ 
                    borderBottom: `1px solid ${darkMode ? '#334155' : '#E2E8F0'}`
                  }}>
                    {selectedReport === 'movimientos' ? (
                      <>
                        <td style={{ padding: '12px' }}>
                          <strong style={{ color: darkMode ? '#F1F5F9' : '#1E293B' }}>
                            {item.product}
                          </strong>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            ...getMovementStyle(item.type),
                            display: 'inline-block',
                            minWidth: '80px',
                            textAlign: 'center'
                          }}>
                            {item.type}
                          </span>
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.quantity} unidades
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.date}
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.user}
                        </td>
                      </>
                    ) : selectedReport === 'proveedores' ? (
                      <>
                        <td style={{ padding: '12px' }}>
                          <strong style={{ color: darkMode ? '#F1F5F9' : '#1E293B' }}>
                            {item.name}
                          </strong>
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.contact}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            ...getStatusStyle(item.status),
                            display: 'inline-block',
                            minWidth: '80px',
                            textAlign: 'center'
                          }}>
                            {item.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.activeProducts} / {item.totalProducts} activos
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.lastOrder}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            ...getRatingStyle(item.rating),
                            display: 'inline-block',
                            minWidth: '80px',
                            textAlign: 'center'
                          }}>
                            {item.rating}
                          </span>
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.performance}
                        </td>
                      </>
                    ) : selectedReport === 'ventas' ? (
                      <>
                        <td style={{ padding: '12px' }}>
                          <strong style={{ color: darkMode ? '#F1F5F9' : '#1E293B' }}>
                            {item.product}
                          </strong>
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.category}
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.unitsSold} unidades
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          ${item.totalRevenue.toLocaleString()}
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          ${item.profit.toLocaleString()}
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.date}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            ...getTrendStyle(item.trend),
                            display: 'inline-block',
                            minWidth: '80px',
                            textAlign: 'center'
                          }}>
                            {item.trend}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: '12px' }}>
                          <strong style={{ color: darkMode ? '#F1F5F9' : '#1E293B' }}>
                            {item.name}
                          </strong>
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.category}
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.brand}
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.stock} unidades
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.minStock} unidades
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            ...getStatusStyle(item.status),
                            display: 'inline-block',
                            minWidth: '80px',
                            textAlign: 'center'
                          }}>
                            {item.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                          {item.lastUpdate}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reportes;