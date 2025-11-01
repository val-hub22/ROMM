// src/components/AlertasInteligentes.jsx
import React from 'react';

// Función auxiliar para calcular días restantes
const calcularDiasRestantes = (fechaVencimiento) => {
  const hoy = new Date();
  const vencimiento = new Date(fechaVencimiento);
  const diferencia = vencimiento - hoy;
  return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
};

// Componente principal de Alertas
const AlertasInteligentes = ({ productos }) => {
  // Generar alertas basadas en los productos
  const generarAlertas = () => {
    const alertas = [];
    
    productos.forEach(producto => {
      // Alerta Stock Bajo
      if (producto.stockActual < producto.stockMinimo && producto.stockActual > 0) {
        alertas.push({
          id: `${producto.id}_stock_bajo`,
          tipo: "stock_bajo",
          producto: producto.nombre,
          categoria: producto.categoria,
          stockActual: producto.stockActual,
          stockMinimo: producto.stockMinimo,
          diferencia: producto.stockMinimo - producto.stockActual,
          prioridad: "alta",
          icono: "🟠",
          texto: "STOCK BAJO",
          accion: "Reponer Stock",
          fecha: new Date().toLocaleDateString()
        });
      }
      
      // Alerta Sin Stock
      if (producto.stockActual === 0) {
        alertas.push({
          id: `${producto.id}_sin_stock`,
          tipo: "sin_stock",
          producto: producto.nombre,
          categoria: producto.categoria,
          prioridad: "critica",
          icono: "🔴",
          texto: "SIN STOCK",
          accion: "COMPRAR INMEDIATO",
          fecha: new Date().toLocaleDateString()
        });
      }
      
      // Alerta Próximo a Vencer
      if (producto.fechaVencimiento) {
        const diasRestantes = calcularDiasRestantes(producto.fechaVencimiento);
        if (diasRestantes <= 30 && diasRestantes > 0) {
          alertas.push({
            id: `${producto.id}_vencimiento`,
            tipo: "proximo_vencer",
            producto: producto.nombre,
            categoria: producto.categoria,
            diasRestantes,
            prioridad: "media",
            icono: "🟡",
            texto: "PRÓXIMO A VENCER",
            accion: "Ver Detalles",
            fecha: new Date().toLocaleDateString()
          });
        }
      }
    });
    
    // Ordenar por prioridad: crítica -> alta -> media
    return alertas.sort((a, b) => {
      const prioridades = { critica: 0, alta: 1, media: 2 };
      return prioridades[a.prioridad] - prioridades[b.prioridad];
    });
  };

  const alertas = generarAlertas();

  // Estilos para las alertas
  const getAlertaStyles = (prioridad) => {
    const baseStyles = "p-4 rounded-lg border-l-4 mb-3 shadow-sm";
    
    switch(prioridad) {
      case 'critica':
        return `${baseStyles} bg-red-50 border-red-500`;
      case 'alta':
        return `${baseStyles} bg-orange-50 border-orange-500`;
      case 'media':
        return `${baseStyles} bg-yellow-50 border-yellow-500`;
      default:
        return `${baseStyles} bg-gray-50 border-gray-500`;
    }
  };

  const getButtonStyles = (prioridad) => {
    const baseStyles = "px-3 py-1 rounded text-sm font-medium";
    
    switch(prioridad) {
      case 'critica':
        return `${baseStyles} bg-red-600 text-white hover:bg-red-700`;
      case 'alta':
        return `${baseStyles} bg-orange-600 text-white hover:bg-orange-700`;
      case 'media':
        return `${baseStyles} bg-yellow-600 text-white hover:bg-yellow-700`;
      default:
        return `${baseStyles} bg-gray-600 text-white hover:bg-gray-700`;
    }
  };

  if (alertas.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-2xl mb-2">✅</div>
        <h3 className="text-green-800 font-semibold">¡Todo bajo control!</h3>
        <p className="text-green-600 text-sm">No hay alertas activas en este momento.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">🔔 Alertas Activas</h2>
        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
          {alertas.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {alertas.map(alerta => (
          <div key={alerta.id} className={getAlertaStyles(alerta.prioridad)}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{alerta.icono}</span>
                  <span className={`font-semibold ${
                    alerta.prioridad === 'critica' ? 'text-red-700' : 
                    alerta.prioridad === 'alta' ? 'text-orange-700' : 'text-yellow-700'
                  }`}>
                    {alerta.texto}
                  </span>
                </div>
                
                <p className="text-gray-700 font-medium">{alerta.producto}</p>
                <p className="text-gray-600 text-sm">{alerta.categoria}</p>
                
                {/* Información específica por tipo de alerta */}
                {alerta.tipo === 'stock_bajo' && (
                  <p className="text-sm text-gray-600 mt-1">
                    Stock actual: <span className="font-semibold">{alerta.stockActual}</span> | 
                    Mínimo requerido: <span className="font-semibold">{alerta.stockMinimo}</span> | 
                    Faltan: <span className="font-semibold text-red-600">{alerta.diferencia} unidades</span>
                  </p>
                )}
                
                {alerta.tipo === 'sin_stock' && (
                  <p className="text-sm text-red-600 font-semibold mt-1">
                    Producto completamente agotado
                  </p>
                )}
                
                {alerta.tipo === 'proximo_vencer' && (
                  <p className="text-sm text-gray-600 mt-1">
                    Vence en <span className="font-semibold text-yellow-600">{alerta.diasRestantes} días</span>
                  </p>
                )}
              </div>
              
              <button className={getButtonStyles(alerta.prioridad)}>
                {alerta.accion}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertasInteligentes;