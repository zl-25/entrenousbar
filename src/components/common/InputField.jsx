import React from 'react';
import './InputField.css';

const InputField = ({ label, type = 'text', id, placeholder, ...props }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id} className="input-label">{label}</label>}
      {type === 'textarea' ? (
        <textarea 
          id={id} 
          className="input-field" 
          placeholder={placeholder}
          rows="4"
          {...props}
        />
      ) : (
        <input 
          type={type} 
          id={id} 
          className="input-field" 
          placeholder={placeholder}
          {...props}
        />
      )}
    </div>
  );
};

export default InputField;
