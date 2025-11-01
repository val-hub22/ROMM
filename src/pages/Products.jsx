import React, { useState, useEffect } from 'react';

const Products = ({ onNavigate, user, darkMode, toggleDarkMode }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    minStock: ''
  });

  // 🎯 DETECTAR SI ES EMPLEADO (SOLO LECTURA)
  const isEmployee = user?.role === 'empleado';
  const isAdmin = user?.role === 'admin';

  // 📊 DATOS DE EJEMPLO FIJO - SIN DEPENDER DE API
  const sampleProducts = [
    {
      id: 1,
      name: "Mouse Inalámbrico Logitech",
      description: "Logitech",
      category: "Tecnologia",
      price: 29.99,
      stock: 3,
      minStock: 10,
      status: "Stock Bajo"
    },
    {
      id: 2,
      name: "Teclado Mecánico RGB Razer",
      description: "Razer",
      category: "Tecnologia",
      price: 89.99,
      stock: 15,
      minStock: 5,
      status: "Disponible"
    },
    {
      id: 3,
      name: "Auriculares Coradir",
      description: "Coradir",
      category: "Tecnologia",
      price: 5000.00,
      stock: 0,
      minStock: 10,
      status: "Sin Stock"
    }
  ];

  useEffect(() => {
    // 🎯 CARGAR DIRECTAMENTE LOS DATOS DE EJEMPLO
    setProducts(sampleProducts);
    setLoading(false);
  }, []);

  // 🎯 AGREGAR PRODUCTO
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const product = {
      id: Date.now(), // ID temporal
      name: newProduct.name,
      description: newProduct.description,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock) || 0,
      minStock: parseInt(newProduct.minStock) || 0,
      status: "Disponible"
    };

    setProducts([...products, product]);
    setNewProduct({ name: '', description: '', category: '', price: '', stock: '', minStock: '' });
    setShowAddForm(false);
    alert('✅ Producto agregado correctamente');
  };

  // 🎯 EDITAR PRODUCTO
  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      minStock: product.minStock
    });
    setShowAddForm(true);
  };

  // 🎯 ACTUALIZAR PRODUCTO
  const handleUpdateProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const updatedProducts = products.map(p =>
      p.id === editingProduct.id
        ? {
            ...p,
            name: newProduct.name,
            description: newProduct.description,
            category: newProduct.category,
            price: parseFloat(newProduct.price),
            stock: parseInt(newProduct.stock) || 0,
            minStock: parseInt(newProduct.minStock) || 0
          }
        : p
    );

    setProducts(updatedProducts);
    setEditingProduct(null);
    setNewProduct({ name: '', description: '', category: '', price: '', stock: '', minStock: '' });
    setShowAddForm(false);
    alert('✅ Producto actualizado correctamente');
  };

  // 🎯 ELIMINAR PRODUCTO
  const handleDelete = (productId) => {
    if (!isAdmin) {
      alert('No tienes permisos para eliminar productos');
      return;
    }

    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      // 🎯 ELIMINAR DE LA LISTA LOCAL
      setProducts(products.filter(product => product.id !== productId));
      alert('✅ Producto eliminado correctamente');
    }
  };

  // 🎯 CANCELAR EDICIÓN/AGREGADO
  const handleCancel = () => {
    setEditingProduct(null);
    setShowAddForm(false);
    setNewProduct({ name: '', description: '', category: '', price: '', stock: '', minStock: '' });
  };

  // 🎯 FUNCIÓN PARA DETERMINAR COLOR DE ESTADO
  const getStatusStyle = (status) => {
    switch (status) {
      case "Sin Stock":
        return {
          background: darkMode ? '#7F1D1D' : '#FEE2E2',
          color: darkMode ? '#FCA5A5' : '#DC2626'
        };
      case "Stock Bajo":
        return {
          background: darkMode ? '#78350F' : '#FEF3C7',
          color: darkMode ? '#FDBA74' : '#92400E'
        };
      case "Disponible":
        return {
          background: darkMode ? '#064E3B' : '#D1FAE5',
          color: darkMode ? '#34D399' : '#065F46'
        };
      default:
        return {
          background: darkMode ? '#374151' : '#F3F4F6',
          color: darkMode ? '#D1D5DB' : '#6B7280'
        };
    }
  };

  // 🎯 FUNCIÓN PARA DETERMINAR COLOR DE STOCK
  const getStockStyle = (stock, minStock) => {
    if (stock === 0) {
      return {
        background: darkMode ? '#7F1D1D' : '#FEE2E2',
        color: darkMode ? '#FCA5A5' : '#DC2626'
      };
    } else if (stock < minStock) {
      return {
        background: darkMode ? '#78350F' : '#FEF3C7',
        color: darkMode ? '#FDBA74' : '#92400E'
      };
    } else {
      return {
        background: darkMode ? '#064E3B' : '#D1FAE5',
        color: darkMode ? '#34D399' : '#065F46'
      };
    }
  };

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
        padding: '15px 25px',
        background: darkMode ? '#1E293B' : '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
      }}>
        <div>
          <h1 style={{ 
            margin: 0, 
            color: darkMode ? '#F1F5F9' : '#1E293B',
            fontSize: '28px',
            fontWeight: 'bold'
          }}>
            {isEmployee ? '📋 Consultar Inventario' : '📦 Gestión de Productos'}
          </h1>
          <p style={{
            color: darkMode ? '#CBD5E1' : '#64748B',
            margin: '5px 0 0 0',
            fontSize: '14px'
          }}>
            {isEmployee 
              ? 'Modo solo lectura - Consulta de stock disponible' 
              : 'Administra el inventario completo'
            }
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* BOTÓN MODO NOCTURNO */}
          <button
            onClick={toggleDarkMode}
            style={{
              padding: '10px 20px',
              background: darkMode ? '#4F46E5' : '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            {darkMode ? '☀️ Modo Claro' : '🌙 Modo Nocturno'}
          </button>

          {/* BOTÓN VOLVER */}
          <button
            onClick={() => onNavigate(isEmployee ? 'empleado-dashboard' : 'dashboard')}
            style={{
              padding: '10px 20px',
              background: '#6B7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            ← Volver
          </button>

          {/* 🎯 SOLO ADMIN PUEDE AGREGAR PRODUCTOS */}
          {isAdmin && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setNewProduct({ name: '', description: '', category: '', price: '', stock: '', minStock: '' });
                setShowAddForm(true);
              }}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              ＋ Agregar Producto
            </button>
          )}
        </div>
      </div>

      {/* FORMULARIO AGREGAR/EDITAR PRODUCTO */}
      {showAddForm && isAdmin && (
        <div style={{
          background: darkMode ? '#1E293B' : '#FFFFFF',
          borderRadius: '12px',
          padding: '25px',
          marginBottom: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
        }}>
          <h3 style={{ 
            color: darkMode ? '#F1F5F9' : '#1E293B',
            margin: '0 0 20px 0',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            {editingProduct ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: darkMode ? '#CBD5E1' : '#374151', fontWeight: '600' }}>
                Nombre del Producto *
              </label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: darkMode ? '#334155' : '#F8FAFC',
                  border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#F1F5F9' : '#000000',
                  fontSize: '14px'
                }}
                placeholder="Ej: Mouse Inalámbrico"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: darkMode ? '#CBD5E1' : '#374151', fontWeight: '600' }}>
                Categoría *
              </label>
              <input
                type="text"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: darkMode ? '#334155' : '#F8FAFC',
                  border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#F1F5F9' : '#000000',
                  fontSize: '14px'
                }}
                placeholder="Ej: Tecnología"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: darkMode ? '#CBD5E1' : '#374151', fontWeight: '600' }}>
                Precio *
              </label>
              <input
                type="number"
                step="0.01"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: darkMode ? '#334155' : '#F8FAFC',
                  border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#F1F5F9' : '#000000',
                  fontSize: '14px'
                }}
                placeholder="Ej: 29.99"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: darkMode ? '#CBD5E1' : '#374151', fontWeight: '600' }}>
                Stock Actual
              </label>
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: darkMode ? '#334155' : '#F8FAFC',
                  border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#F1F5F9' : '#000000',
                  fontSize: '14px'
                }}
                placeholder="Ej: 15"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: darkMode ? '#CBD5E1' : '#374151', fontWeight: '600' }}>
                Stock Mínimo
              </label>
              <input
                type="number"
                value={newProduct.minStock}
                onChange={(e) => setNewProduct({...newProduct, minStock: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: darkMode ? '#334155' : '#F8FAFC',
                  border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#F1F5F9' : '#000000',
                  fontSize: '14px'
                }}
                placeholder="Ej: 5"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: darkMode ? '#CBD5E1' : '#374151', fontWeight: '600' }}>
                Descripción
              </label>
              <input
                type="text"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: darkMode ? '#334155' : '#F8FAFC',
                  border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#F1F5F9' : '#000000',
                  fontSize: '14px'
                }}
                placeholder="Ej: Marca del producto"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              onClick={handleCancel}
              style={{
                padding: '10px 20px',
                background: '#6B7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Cancelar
            </button>
            <button
              onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {editingProduct ? '💾 Guardar Cambios' : '➕ Agregar Producto'}
            </button>
          </div>
        </div>
      )}

      {/* MENSAJE DE PERMISOS PARA EMPLEADO */}
      {isEmployee && (
        <div style={{
          background: darkMode ? '#78350F' : '#FEF3C7',
          border: darkMode ? '1px solid #F59E0B' : '1px solid #F59E0B',
          borderRadius: '8px',
          padding: '15px 20px',
          marginBottom: '20px',
          color: darkMode ? '#FDBA74' : '#92400E'
        }}>
          <strong>Modo de solo lectura:</strong> Puedes consultar el stock disponible pero no realizar modificaciones.
        </div>
      )}

      {/* TABLA DE PRODUCTOS */}
      <div style={{
        background: darkMode ? '#1E293B' : '#FFFFFF',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
      }}>
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
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Producto</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Categoría</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Precio</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Stock</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Estado</th>
                {!isEmployee && (
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Acciones</th>
                )}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const statusStyle = getStatusStyle(product.status);
                const stockStyle = getStockStyle(product.stock, product.minStock);
                
                return (
                  <tr key={product.id} style={{ 
                    borderBottom: `1px solid ${darkMode ? '#334155' : '#E2E8F0'}`
                  }}>
                    <td style={{ padding: '12px' }}>
                      <strong style={{ color: darkMode ? '#F1F5F9' : '#1E293B' }}>
                        {product.name}
                      </strong>
                      {product.description && (
                        <div style={{ 
                          fontSize: '12px', 
                          color: darkMode ? '#94A3B8' : '#64748B',
                          marginTop: '4px'
                        }}>
                          {product.description}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                      {product.category}
                    </td>
                    <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                      ${product.price.toFixed(2)}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: stockStyle.background,
                        color: stockStyle.color,
                        display: 'inline-block',
                        minWidth: '80px',
                        textAlign: 'center'
                      }}>
                        {product.stock} / Min: {product.minStock}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: statusStyle.background,
                        color: statusStyle.color,
                        display: 'inline-block',
                        minWidth: '100px',
                        textAlign: 'center'
                      }}>
                        {product.status}
                      </span>
                    </td>
                    
                    {/* 🎯 SOLO ADMIN VE BOTONES DE ACCIÓN */}
                    {!isEmployee && (
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleEdit(product)}
                            style={{
                              padding: '8px 16px',
                              background: '#3B82F6',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            style={{
                              padding: '8px 16px',
                              background: '#EF4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* INFORMACIÓN DEL ROL */}
      <div style={{
        background: darkMode ? '#1E293B' : '#FFFFFF',
        borderRadius: '12px',
        padding: '15px 25px',
        marginTop: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0',
        textAlign: 'center'
      }}>
        <p style={{ 
          color: darkMode ? '#CBD5E1' : '#64748B',
          margin: 0,
          fontSize: '14px'
        }}>
          Usuario: <strong>{user?.email}</strong> | 
          Rol: <strong style={{color: '#6D28D9'}}>{user?.role}</strong> | 
          Productos mostrados: <strong>{products.length}</strong>
        </p>
      </div>
    </div>
  );
};

export default Products;