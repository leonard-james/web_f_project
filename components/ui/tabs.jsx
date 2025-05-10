// filepath: c:\Users\aDMin\downloads\web_f_project\components\ui\tabs.jsx
import React, { useState } from "react";

export function Tabs({ children, className }) {
  return <div className={`tabs ${className}`}>{children}</div>;
}

export function TabsList({ children, className }) {
  return <div className={`tabs-list ${className}`}>{children}</div>;
}

export function TabsTrigger({ children, onClick, isActive, className }) {
  return (
    <button
      className={`tabs-trigger ${isActive ? "active" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, isActive, className }) {
  return (
    <div className={`tabs-content ${isActive ? "active" : ""} ${className}`}>
      {children}
    </div>
  );
}