// filepath: c:\Users\aDMin\downloads\web_f_project\components\ui\badge.jsx
import React from "react";

export function Badge({ children, className }) {
  return (
    <span className={`badge ${className}`}>
      {children}
    </span>
  );
}