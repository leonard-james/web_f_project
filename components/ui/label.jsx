// filepath: c:\Users\aDMin\downloads\web_f_project\components\ui\label.jsx
import React from "react";

export function Label({ children, htmlFor, className }) {
  return (
    <label htmlFor={htmlFor} className={`label ${className}`}>
      {children}
    </label>
  );
}