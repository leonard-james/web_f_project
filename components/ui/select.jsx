// filepath: c:\Users\aDMin\downloads\web_f_project\components\ui\select.jsx
import React from "react";

export function Select({ children }) {
  return <div className="select">{children}</div>;
}

export function SelectContent({ children }) {
  return <div className="select-content">{children}</div>;
}

export function SelectItem({ children }) {
  return <div className="select-item">{children}</div>;
}

export function SelectTrigger({ children }) {
  return <button className="select-trigger">{children}</button>;
}

export function SelectValue({ children }) {
  return <span className="select-value">{children}</span>;
}