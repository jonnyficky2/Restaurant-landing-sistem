import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-8 py-3.5 rounded-full font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 transform active:scale-95 cursor-pointer outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-zinc-950 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-gold-500 text-zinc-950 hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/20 border border-transparent',
    secondary: 'bg-transparent border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-zinc-950 hover:shadow-lg hover:shadow-gold-500/10',
    dark: 'bg-zinc-900 border border-zinc-800 text-zinc-100 hover:bg-zinc-800 hover:border-zinc-700 hover:text-white',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
