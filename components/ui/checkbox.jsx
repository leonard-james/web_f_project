// filepath: c:\Users\aDMin\downloads\web_f_project\components\ui\checkbox.jsx
import React from "react";

export function Checkbox({ checked, onCheckedChange, className, ...props }) {
  return (
    <input
      type="checkbox"
      className={`checkbox ${className}`}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      {...props}
    />
  );
}