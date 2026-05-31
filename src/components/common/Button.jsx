import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  to, 
  href, 
  className = '', 
  ...props 
}) => {
  const baseClass = `btn btn-${variant} btn-${size} ${className}`;
  
  if (to) {
    return <Link to={to} className={baseClass} {...props}>{children}</Link>;
  }
  
  if (href) {
    return <a href={href} className={baseClass} {...props}>{children}</a>;
  }
  
  return (
    <button className={baseClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
