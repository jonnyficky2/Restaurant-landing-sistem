import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseStyles = 'px-8 py-3 rounded-full font-semibold transition-transform transform hover:scale-105';
  const styles = {
    primary: 'bg-amber-500 text-white hover:bg-amber-600',
    secondary: 'bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white',
  };

  return (
    <button className={`${baseStyles} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
