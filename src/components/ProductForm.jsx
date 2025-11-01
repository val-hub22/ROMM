// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSave, onCancel, proveedores }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    proveedor: '',
    sku: '',
    precio_compra: '',
    precio_venta: '',
    precio_mayorista: '',
    stock: '',
    stock_minimo: '',
    stock_maximo: '',
    fecha_vencimiento: '',
    activo: true
  });

  const [errors, setErrors] = useState({});

  // Categorías predefinidas
  const categorias = [
    'Tecnología',
    'Oficina',
    'Hogar',
    'Electrodomésticos',
    'Herramientas',
    'Otros'
  ];

  // Efecto para cargar datos si es edición
  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        categoria: product.categoria || '',
        proveedor: product.proveedor || '',
        sku: product.sku || generarSKU(),
        precio_compra: product.precio_compra || '',
        precio_venta: product.precio || '',
        precio_mayorista: product.precio_mayorista || '',
        stock: product.stock || '',
        stock_minimo: product.stock_minimo || '',
        stock_maximo: product.stock_maximo || '',
        fecha_vencimiento: product.fecha_vencimiento || '',
        activo: product.activo !== undefined ? product.activo : true
      });
    } else {
      // Si es nuevo producto, generar SKU automático
      setFormData(prev => ({
        ...prev,
        sku: generarSKU()
      }));
    }
  }, [product]);

  // Generar SKU automático
  const generarSKU = () => {
    const prefix = 'PROD';
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    return `${prefix}-${random}`;
  };

  // Validaciones
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.categoria) {
      newErrors.categoria = 'La categoría es requerida';
    }

    if (!formData.proveedor) {
      newErrors.proveedor = 'El proveedor es requerido';
    }

    if (!formData.precio_compra || formData.precio_compra <= 0) {
      newErrors.precio_compra = 'Precio de compra inválido';
    }

    if (!formData.precio_venta || formData.precio_venta <= 0) {
      newErrors.precio_venta = 'Precio de venta inválido';
    }

    if (formData.stock_minimo && formData.stock_maximo) {
      if (parseInt(formData.stock_minimo) >= parseInt(formData.stock_maximo)) {
        newErrors.stock_maximo = 'El stock máximo debe ser mayor al mínimo';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(139, 95, 191, 0.1)',
      padding: '2rem',
      border: '2px solid #F3F4F6'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #F3F4F6'
      }}>
        <h2 style={{
          margin: 0,
          color: '#6D28D9',
          fontSize: '24px',
          fontWeight: '600'
        }}>
          {product ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}
        </h2>
        
        <button
          onClick={onCancel}
          style={{
            padding: '8px 16px',
            background: '#6B7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Cancelar
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Columna 1 */}
          <div>
            {/* Nombre del Producto */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                Nombre del Producto *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `2px solid ${errors.nombre ? '#EF4444' : '#D1D5DB'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
                placeholder="Ej: Mouse Inalámbrico Logitech"
                onFocus={(e) => {
                  e.target.style.borderColor = '#8B5FBF';
                  e.target.style.boxShadow = '0 0 0 3px rgba(139, 95, 191, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.nombre ? '#EF4444' : '#D1D5DB';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.nombre && (
                <span style={{
                  color: '#EF4444',
                  fontSize: '12px',
                  marginTop: '4px',
                  display: 'block'
                }}>
                  {errors.nombre}
                </span>
              )}
            </div>

            {/* SKU */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                Código SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#F9FAFB',
                  color: '#6B7280'
                }}
                readOnly
              />
              <span style={{
                color: '#6B7280',
                fontSize: '12px',
                marginTop: '4px',
                display: 'block'
              }}>
                Código generado automáticamente
              </span>
            </div>

            {/* Categoría */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                Categoría *
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `2px solid ${errors.categoria ? '#EF4444' : '#D1D5DB'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'white'
                }}
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.categoria && (
                <span style={{
                  color: '#EF4444',
                  fontSize: '12px',
                  marginTop: '4px',
                  display: 'block'
                }}>
                  {errors.categoria}
                </span>
              )}
            </div>

            {/* Proveedor */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                Proveedor *
              </label>
              <select
                name="proveedor"
                value={formData.proveedor}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `2px solid ${errors.proveedor ? '#EF4444' : '#D1D5DB'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'white'
                }}
              >
                <option value="">Seleccionar proveedor</option>
                {proveedores.map(prov => (
                  <option key={prov.id} value={prov.nombre}>
                    {prov.nombre} {!prov.activo && '(Inactivo)'}
                  </option>
                ))}
              </select>
              {errors.proveedor && (
                <span style={{
                  color: '#EF4444',
                  fontSize: '12px',
                  marginTop: '4px',
                  display: 'block'
                }}>
                  {errors.proveedor}
                </span>
              )}
            </div>

            {/* Descripción */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="3"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px',
                  resize: 'vertical',
                  minHeight: '80px'
                }}
                placeholder="Descripción detallada del producto..."
              />
            </div>
          </div>

          {/* Columna 2 */}
          <div>
            {/* Precios */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Precio Compra *
                </label>
                <input
                  type="number"
                  name="precio_compra"
                  value={formData.precio_compra}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `2px solid ${errors.precio_compra ? '#EF4444' : '#D1D5DB'}`,
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="0.00"
                />
                {errors.precio_compra && (
                  <span style={{
                    color: '#EF4444',
                    fontSize: '12px',
                    marginTop: '4px',
                    display: 'block'
                  }}>
                    {errors.precio_compra}
                  </span>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Precio Venta *
                </label>
                <input
                  type="number"
                  name="precio_venta"
                  value={formData.precio_venta}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `2px solid ${errors.precio_venta ? '#EF4444' : '#D1D5DB'}`,
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="0.00"
                />
                {errors.precio_venta && (
                  <span style={{
                    color: '#EF4444',
                    fontSize: '12px',
                    marginTop: '4px',
                    display: 'block'
                  }}>
                    {errors.precio_venta}
                  </span>
                )}
              </div>
            </div>

            {/* Precio Mayorista */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                Precio Mayorista
              </label>
              <input
                type="number"
                name="precio_mayorista"
                value={formData.precio_mayorista}
                onChange={handleChange}
                step="0.01"
                min="0"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                placeholder="0.00"
              />
            </div>

            {/* Stock */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Stock Actual
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '2px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="0"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Stock Mínimo
                </label>
                <input
                  type="number"
                  name="stock_minimo"
                  value={formData.stock_minimo}
                  onChange={handleChange}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '2px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="0"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Stock Máximo
                </label>
                <input
                  type="number"
                  name="stock_maximo"
                  value={formData.stock_maximo}
                  onChange={handleChange}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `2px solid ${errors.stock_maximo ? '#EF4444' : '#D1D5DB'}`,
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  placeholder="0"
                />
                {errors.stock_maximo && (
                  <span style={{
                    color: '#EF4444',
                    fontSize: '10px',
                    marginTop: '4px',
                    display: 'block'
                  }}>
                    {errors.stock_maximo}
                  </span>
                )}
              </div>
            </div>

            {/* Fecha de Vencimiento */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151'
              }}>
                Fecha de Vencimiento
              </label>
              <input
                type="date"
                name="fecha_vencimiento"
                value={formData.fecha_vencimiento}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '2px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Estado Activo */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                color: '#374151',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  name="activo"
                  checked={formData.activo}
                  onChange={handleChange}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                Producto Activo
              </label>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          paddingTop: '1.5rem',
          borderTop: '2px solid #F3F4F6'
        }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '12px 24px',
              background: '#6B7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#4B5563';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#6B7280';
            }}
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              background: '#8B5FBF',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#6D28D9';
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#8B5FBF';
            }}
          >
            {product ? '💾 Guardar Cambios' : '➕ Agregar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;