import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded 
                  bg-primary-surface 
                  text-primary-foreground 
                  border-primary-outline 
                  border
                hover:bg-teal-200
                 hover:text-primary-foreground
                  active:bg-primary-outline ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;