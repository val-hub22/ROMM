import React, { useState, useEffect } from 'react';

// === CATEGORÍAS PREDEFINIDAS ===
const CATEGORIAS_PREDEFINIDAS = [
  'Tecnología',
  'Oficina', 
  'Mobiliario',
  'Limpieza',
  'Seguridad',
  'Herramientas',
  'Materiales',
  'Varios'
];

const ProductModal = ({ isOpen, onClose, onSave, product = null }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    proveedor: '',
    precio: '',
    stock: '',
    stock_minimo: ''
  });

  const [loading, setLoading] = useState(false);

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        categoria: product.categoria || '',
        proveedor: product.proveedor || '',
        precio: product.precio || '',
        stock: product.stock || '',
        stock_minimo: product.stock_minimo || ''
      });
    } else {
      // Resetear form si es nuevo producto
      setFormData({
        nombre: '',
        categoria: '',
        proveedor: '',
        precio: '',
        stock: '',
        stock_minimo: ''
      });
    }
  }, [product, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave({
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        stock_minimo: parseInt(formData.stock_minimo),
        empresa_id: 1
      });
      onClose();
    } catch (error) {
      console.error('Error guardando producto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 20px 60px rgba(139, 95, 191, 0.3)'
      }}>
        <h2 style={{
          color: '#6D28D9',
          margin: '0 0 1.5rem 0',
          fontSize: '24px'
        }}>
          {product ? '✏️ Editar Producto' : '➕ Agregar Producto'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {/* Nombre */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#6D28D9',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Nombre del Producto *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Categoría y Proveedor */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#6D28D9',
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  Categoría *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '16px',
                    background: 'white'
                  }}
                >
                  <option value="">Seleccionar categoría</option>
                  {CATEGORIAS_PREDEFINIDAS.map(categoria => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#6D28D9',
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  Proveedor
                </label>
                <input
                  type="text"
                  name="proveedor"
                  value={formData.proveedor}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>
            </div>

            {/* Precio y Stock */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#6D28D9',
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  Precio *
                </label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#6D28D9',
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                />
              </div>
            </div>

            {/* Stock Mínimo */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#6D28D9',
                fontWeight: '500',
                fontSize: '14px'
              }}>
                Stock Mínimo *
              </label>
              <input
                type="number"
                name="stock_minimo"
                value={formData.stock_minimo}
                onChange={handleChange}
                min="1"
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                background: '#F3F4F6',
                color: '#6B7280',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px',
                background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '500'
              }}
            >
              {loading ? 'Guardando...' : (product ? 'Actualizar' : 'Agregar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;