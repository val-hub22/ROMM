import React, { useState, useEffect } from 'react';

const Proveedores = ({ onNavigate, darkMode, toggleDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    address: '',
    status: 'active'
  });
  
  // 🎯 DATOS DE PROVEEDORES CON ESTADO REACTIVO
  const [suppliers, setSuppliers] = useState([
    { 
      id: 1, 
      name: 'Razer Distribuidores', 
      contact: 'contacto@razer.com', 
      phone: '+1 234 567 890',
      email: 'contacto@razer.com',
      address: 'Av. Principal 123, Ciudad',
      status: 'inactive',
      products: 15,
      lastOrder: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Logitech Supply', 
      contact: 'pedidos@logitech.com', 
      phone: '+1 345 678 901',
      email: 'pedidos@logitech.com',
      address: 'Calle Secundaria 456, Ciudad',
      status: 'active',
      products: 25,
      lastOrder: '2024-01-20'
    }
  ]);

  // 🎯 EFECTO PARA SCROLL AUTOMÁTICO AL FORMULARIO
  useEffect(() => {
    if (showAddForm) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [showAddForm]);

  const stats = {
    total: suppliers.length,
    active: suppliers.filter(s => s.status === 'active').length,
    inactive: suppliers.filter(s => s.status === 'inactive').length
  };

  // 🎯 FILTRAR PROVEEDORES
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (supplier.email && supplier.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 🎯 AGREGAR PROVEEDOR
  const handleAddSupplier = () => {
    if (!newSupplier.name || !newSupplier.contact) {
      alert('Por favor completa los campos obligatorios: Nombre y Contacto');
      return;
    }

    const supplier = {
      id: Date.now(), // ID temporal
      name: newSupplier.name,
      contact: newSupplier.contact,
      phone: newSupplier.phone,
      email: newSupplier.email,
      address: newSupplier.address,
      status: newSupplier.status,
      products: 0,
      lastOrder: 'Nunca'
    };

    setSuppliers([...suppliers, supplier]);
    setNewSupplier({ 
      name: '', 
      contact: '', 
      phone: '', 
      email: '', 
      address: '', 
      status: 'active' 
    });
    setShowAddForm(false);
    alert('✅ Proveedor agregado correctamente');
  };

  // 🎯 EDITAR PROVEEDOR
  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setNewSupplier({
      name: supplier.name,
      contact: supplier.contact,
      phone: supplier.phone,
      email: supplier.email,
      address: supplier.address,
      status: supplier.status
    });
    setShowAddForm(true);
  };

  // 🎯 ACTUALIZAR PROVEEDOR
  const handleUpdateSupplier = () => {
    if (!newSupplier.name || !newSupplier.contact) {
      alert('Por favor completa los campos obligatorios: Nombre y Contacto');
      return;
    }

    const updatedSuppliers = suppliers.map(s =>
      s.id === editingSupplier.id
        ? {
            ...s,
            name: newSupplier.name,
            contact: newSupplier.contact,
            phone: newSupplier.phone,
            email: newSupplier.email,
            address: newSupplier.address,
            status: newSupplier.status
          }
        : s
    );

    setSuppliers(updatedSuppliers);
    setEditingSupplier(null);
    setNewSupplier({ 
      name: '', 
      contact: '', 
      phone: '', 
      email: '', 
      address: '', 
      status: 'active' 
    });
    setShowAddForm(false);
    alert('✅ Proveedor actualizado correctamente');
  };

  // 🎯 ELIMINAR PROVEEDOR
  const handleDelete = (supplierId) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    
    if (window.confirm(`¿Estás seguro de eliminar al proveedor "${supplier.name}"?`)) {
      const updatedSuppliers = suppliers.filter(s => s.id !== supplierId);
      setSuppliers(updatedSuppliers);
      alert('✅ Proveedor eliminado correctamente');
    }
  };

  // 🎯 REACTIVAR PROVEEDOR
  const handleReactivate = (supplierId) => {
    const updatedSuppliers = suppliers.map(s =>
      s.id === supplierId ? { ...s, status: 'active' } : s
    );
    setSuppliers(updatedSuppliers);
    alert('✅ Proveedor reactivado correctamente');
  };

  // 🎯 CANCELAR EDICIÓN/AGREGADO
  const handleCancel = () => {
    setEditingSupplier(null);
    setShowAddForm(false);
    setNewSupplier({ 
      name: '', 
      contact: '', 
      phone: '', 
      email: '', 
      address: '', 
      status: 'active' 
    });
  };

  const getStatusStyle = (status) => {
    return status === 'active' 
      ? { 
          background: darkMode ? '#064E3B' : '#D1FAE5', 
          color: darkMode ? '#34D399' : '#065F46' 
        }
      : { 
          background: darkMode ? '#7F1D1D' : '#FEE2E2', 
          color: darkMode ? '#FCA5A5' : '#DC2626' 
        };
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
            👥 Gestión de Proveedores
          </h1>
          <p style={{
            color: darkMode ? '#CBD5E1' : '#64748B',
            margin: '8px 0 0 0',
            fontSize: '16px'
          }}>
            Administra los proveedores de tu inventario
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

          <button
            onClick={() => {
              setEditingSupplier(null);
              setNewSupplier({ 
                name: '', 
                contact: '', 
                phone: '', 
                email: '', 
                address: '', 
                status: 'active' 
              });
              setShowAddForm(true);
            }}
            style={{
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            ＋ Agregar Proveedor
          </button>
        </div>
      </div>

      {/* FORMULARIO AGREGAR/EDITAR PROVEEDOR */}
      {showAddForm && (
        <div style={{
          background: darkMode ? '#1E293B' : '#FFFFFF',
          borderRadius: '16px',
          padding: '25px',
          marginBottom: '30px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
        }}>
          <h3 style={{ 
            color: darkMode ? '#F1F5F9' : '#1E293B',
            margin: '0 0 20px 0',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            {editingSupplier ? '✏️ Editar Proveedor' : '➕ Agregar Nuevo Proveedor'}
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: darkMode ? '#CBD5E1' : '#374151', fontWeight: '600' }}>
                Nombre del Proveedor *
              </label>
              <input
                type="text"
                value={newSupplier.name}
                onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: darkMode ? '#334155' : '#F8FAFC',
                  border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#F1F5F9' : '#000000',
                  fontSize: '14px'
                }}
                placeholder="Ej: Razer Distribuidores"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: darkMode ? '#CBD5E1' : '#374151', fontWeight: '600' }}>
                Contacto *
              </label>
              <input
                type="text"
                value={newSupplier.contact}
                onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: darkMode ? '#334155' : '#F8FAFC',
                  border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#F1F5F9' : '#000000',
                  fontSize: '14px'
                }}
                placeholder="Ej: contacto@proveedor.com"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: darkMode ? '#CBD5E1' : '#374151', fontWeight: '600' }}>
                Teléfono
              </label>
              <input
                type="text"
                value={newSupplier.phone}
                onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: darkMode ? '#334155' : '#F8FAFC',
                  border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#F1F5F9' : '#000000',
                  fontSize: '14px'
                }}
                placeholder="Ej: +1 234 567 890"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: darkMode ? '#CBD5E1' : '#374151', fontWeight: '600' }}>
                Email
              </label>
              <input
                type="email"
                value={newSupplier.email}
                onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: darkMode ? '#334155' : '#F8FAFC',
                  border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#F1F5F9' : '#000000',
                  fontSize: '14px'
                }}
                placeholder="Ej: contacto@proveedor.com"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: darkMode ? '#CBD5E1' : '#374151', fontWeight: '600' }}>
                Dirección
              </label>
              <input
                type="text"
                value={newSupplier.address}
                onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: darkMode ? '#334155' : '#F8FAFC',
                  border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#F1F5F9' : '#000000',
                  fontSize: '14px'
                }}
                placeholder="Ej: Av. Principal 123, Ciudad"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: darkMode ? '#CBD5E1' : '#374151', fontWeight: '600' }}>
                Estado
              </label>
              <select
                value={newSupplier.status}
                onChange={(e) => setNewSupplier({...newSupplier, status: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: darkMode ? '#334155' : '#F8FAFC',
                  border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#F1F5F9' : '#000000',
                  fontSize: '14px'
                }}
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              onClick={handleCancel}
              style={{
                padding: '12px 24px',
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
              onClick={editingSupplier ? handleUpdateSupplier : handleAddSupplier}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #8B5FBF 0%, #6D28D9 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              {editingSupplier ? '💾 Guardar Cambios' : '➕ Agregar Proveedor'}
            </button>
          </div>
        </div>
      )}

      {/* ESTADÍSTICAS */}
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
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>📊</div>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: 'bold',
            color: darkMode ? '#8B5FBF' : '#6D28D9',
            marginBottom: '5px'
          }}>
            {stats.total}
          </div>
          <div style={{ 
            color: darkMode ? '#CBD5E1' : '#64748B',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Total Proveedores
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
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>✅</div>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: 'bold',
            color: darkMode ? '#10B981' : '#059669',
            marginBottom: '5px'
          }}>
            {stats.active}
          </div>
          <div style={{ 
            color: darkMode ? '#CBD5E1' : '#64748B',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Activos
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
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚠️</div>
          <div style={{ 
            fontSize: '28px', 
            fontWeight: 'bold',
            color: darkMode ? '#F59E0B' : '#D97706',
            marginBottom: '5px'
          }}>
            {stats.inactive}
          </div>
          <div style={{ 
            color: darkMode ? '#CBD5E1' : '#64748B',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Inactivos
          </div>
        </div>
      </div>

      {/* BUSCADOR Y ALERTAS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        marginBottom: '30px'
      }}>
        {/* BUSCADOR */}
        <div style={{
          background: darkMode ? '#1E293B' : '#FFFFFF',
          borderRadius: '16px',
          padding: '25px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
        }}>
          <h3 style={{ 
            color: darkMode ? '#F1F5F9' : '#1E293B',
            margin: '0 0 15px 0',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            🔍 Buscar Proveedores
          </h3>
          <input
            type="text"
            placeholder="Buscar por nombre, contacto o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: darkMode ? '#334155' : '#F8FAFC',
              border: `1px solid ${darkMode ? '#475569' : '#E2E8F0'}`,
              borderRadius: '10px',
              color: darkMode ? '#F1F5F9' : '#000000',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {/* ALERTAS */}
        <div style={{
          background: darkMode ? '#1E293B' : '#FFFFFF',
          borderRadius: '16px',
          padding: '25px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          border: darkMode ? '1px solid #334155' : '1px solid #E2E8F0'
        }}>
          <h3 style={{ 
            color: darkMode ? '#F1F5F9' : '#1E293B',
            margin: '0 0 15px 0',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            ⚠️ Alertas de Proveedores
          </h3>
          <p style={{ 
            color: darkMode ? '#CBD5E1' : '#64748B',
            margin: '0 0 15px 0',
            fontSize: '14px'
          }}>
            Proveedores que necesitan atención
          </p>
          
          {suppliers.filter(s => s.status === 'inactive').map(supplier => (
            <div key={supplier.id} style={{
              background: darkMode ? '#78350F' : '#FEF3C7',
              border: `1px solid ${darkMode ? '#F59E0B' : '#F59E0B'}`,
              borderRadius: '12px',
              padding: '15px',
              marginBottom: '10px'
            }}>
              <div style={{ 
                color: darkMode ? '#FDBA74' : '#92400E',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                {supplier.name}
              </div>
              <div style={{ 
                background: darkMode ? '#92400E' : '#F59E0B',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-block',
                marginBottom: '10px'
              }}>
                PROVEEDOR INACTIVO
              </div>
              <br />
              <button
                onClick={() => handleReactivate(supplier.id)}
                style={{
                  padding: '8px 16px',
                  background: '#10B981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                Reactivar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* TABLA DE PROVEEDORES */}
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
          Lista de Proveedores ({filteredSuppliers.length})
        </h3>

        {filteredSuppliers.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            color: darkMode ? '#CBD5E1' : '#64748B'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>👥</div>
            <h3>No se encontraron proveedores</h3>
            <p>Intenta con otros términos de búsqueda o agrega un nuevo proveedor</p>
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
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Proveedor</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Contacto</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Teléfono</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Productos</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Estado</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => {
                  const statusStyle = getStatusStyle(supplier.status);
                  return (
                    <tr key={supplier.id} style={{ 
                      borderBottom: `1px solid ${darkMode ? '#334155' : '#E2E8F0'}`
                    }}>
                      <td style={{ padding: '12px' }}>
                        <strong style={{ color: darkMode ? '#F1F5F9' : '#1E293B' }}>
                          {supplier.name}
                        </strong>
                        {supplier.address && (
                          <div style={{ 
                            fontSize: '12px', 
                            color: darkMode ? '#94A3B8' : '#64748B',
                            marginTop: '4px'
                          }}>
                            {supplier.address}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                        {supplier.contact}
                      </td>
                      <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                        {supplier.phone}
                      </td>
                      <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                        {supplier.email}
                      </td>
                      <td style={{ padding: '12px', color: darkMode ? '#CBD5E1' : '#374151' }}>
                        {supplier.products} productos
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
                          minWidth: '80px',
                          textAlign: 'center'
                        }}>
                          {supplier.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleEdit(supplier)}
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
                            onClick={() => handleDelete(supplier.id)}
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proveedores;