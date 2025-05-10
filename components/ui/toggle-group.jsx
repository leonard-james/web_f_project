// filepath: c:\Users\aDMin\downloads\web_f_project\components\ui\toggle-group.jsx
import React from "react";

export function ToggleGroup({ children, type, value, onValueChange, className }) {
  return (
    <div className={`toggle-group ${className}`} data-type={type}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { type, value, onValueChange })
      )}
    </div>
  );
}

export function ToggleGroupItem({ children, value, onValueChange, className }) {
  return (
    <button
      className={`toggle-group-item ${className}`}
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  );
}