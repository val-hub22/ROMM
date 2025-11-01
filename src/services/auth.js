// Servicio de autenticación frontend
export const authService = {
  // ✅ Usuarios predefinidos (no modificables desde la UI)
  users: [
    {
      id: 1,
      email: 'admin@romm.com',
      password: 'admin123',
      role: 'admin',
      name: 'Administrador Principal',
      permissions: ['all']
    },
    {
      id: 2, 
      email: 'empleado@romm.com',
      password: 'empleado123',
      name: 'Juan Pérez',
      role: 'empleado',
      permissions: ['read_products', 'create_sales', 'view_alerts']
    }
  ],

  // ✅ Validación de login
  login: (email, password) => {
    const user = authService.users.find(u => 
      u.email === email && u.password === password
    );
    
    if (!user) {
      throw new Error('Credenciales incorrectas');
    }

    // Guardar sesión básica
    const userSession = {
      id: user.id,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
      loginTime: Date.now()
    };

    localStorage.setItem('currentUser', JSON.stringify(userSession));
    return userSession;
  },

  // ✅ Obtener usuario actual
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  },

  // ✅ Cerrar sesión
  logout: () => {
    localStorage.removeItem('currentUser');
  },

  // ✅ Verificar permisos básicos
  checkPermission: (action) => {
    const user = authService.getCurrentUser();
    if (!user) return false;

    // Admin tiene todos los permisos
    if (user.role === 'admin') return true;

    // Permisos específicos para empleados
    const employeePermissions = {
      'view_products': true,
      'create_sales': true, 
      'view_alerts': true,
      'read_products': true
    };

    return employeePermissions[action] || false;
  }
};