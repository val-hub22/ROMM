import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  loading = false,
  ...props 
}) => {
  const baseClasses = 'px-4 py-2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={loading}
      {...props}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
};

export default Button;