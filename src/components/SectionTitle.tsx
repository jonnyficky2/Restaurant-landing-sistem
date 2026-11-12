import React from 'react';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ subtitle, title, className = '' }) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <p className="text-amber-500 text-lg font-semibold mb-2">{subtitle}</p>
      <h2 className="text-4xl md:text-5xl font-bold text-white">{title}</h2>
    </div>
  );
};

export default SectionTitle;
