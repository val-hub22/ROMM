import axios from 'axios';

// JSON Server en puerto 5002
const API_BASE_URL = 'http://localhost:5002';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Mock de autenticación para JSON Server
export const authAPI = {
  login: async (email, password) => {
    try {
      // Buscar usuario en la "base de datos"
      const response = await api.get('/users', {
        params: { email, password } // Buscar por email y password
      });
      
      if (response.data.length > 0) {
        const user = response.data[0];
        
        // ✅ USUARIO ENCONTRADO - Crear token y guardar
        const token = `mock-jwt-token-${user.id}`;
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        return { data: { ...user, token } };
      }
      
      throw new Error('Credenciales inválidas');
    } catch (error) {
      throw new Error('Error en el login: ' + error.message);
    }
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return Promise.resolve();
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // ✅ NUEVO: Verificar permisos
  checkPermission: (action) => {
    const user = authAPI.getCurrentUser();
    if (!user) return false;

    // Admin tiene todos los permisos
    if (user.role === 'admin') return true;

    // Permisos específicos para empleados
    const employeePermissions = {
      'view_products': true,
      'read_products': true,
      'view_alerts': true
    };

    return employeePermissions[action] || false;
  }
};

// APIs para productos
export const productsAPI = {
  getProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => {
    // ✅ VERIFICAR PERMISOS ANTES DE CREAR
    if (!authAPI.checkPermission('create_products')) {
      throw new Error('No tienes permisos para crear productos');
    }
    return api.post('/products', productData);
  },
  updateProduct: (id, productData) => {
    // ✅ VERIFICAR PERMISOS ANTES DE ACTUALIZAR
    if (!authAPI.checkPermission('edit_products')) {
      throw new Error('No tienes permisos para editar productos');
    }
    return api.put(`/products/${id}`, productData);
  },
  deleteProduct: (id) => {
    // ✅ VERIFICAR PERMISOS ANTES DE ELIMINAR
    if (!authAPI.checkPermission('delete_products')) {
      throw new Error('No tienes permisos para eliminar productos');
    }
    return api.delete(`/products/${id}`);
  }
};

// APIs para movimientos
export const movementsAPI = {
  getMovements: () => api.get('/movements'),
  createMovement: (movementData) => api.post('/movements', movementData),
  getMovementsByUser: (userId) => api.get(`/movements?usuario_id=${userId}`)
};

export const proveedoresAPI = {
  getProveedores: () => api.get('/proveedores'),
  getProveedor: (id) => api.get(`/proveedores/${id}`),
  createProveedor: (proveedorData) => {
    if (!authAPI.checkPermission('create_suppliers')) {
      throw new Error('No tienes permisos para crear proveedores');
    }
    return api.post('/proveedores', proveedorData);
  },
  updateProveedor: (id, proveedorData) => {
    if (!authAPI.checkPermission('edit_suppliers')) {
      throw new Error('No tienes permisos para editar proveedores');
    }
    return api.put(`/proveedores/${id}`, proveedorData);
  },
  deleteProveedor: (id) => {
    if (!authAPI.checkPermission('delete_suppliers')) {
      throw new Error('No tienes permisos para eliminar proveedores');
    }
    return api.delete(`/proveedores/${id}`);
  }
};

export default api;