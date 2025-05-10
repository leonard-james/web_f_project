// filepath: c:\Users\aDMin\downloads\web_f_project\components\ui\table.jsx
import React from "react";

export function Table({ children, className }) {
  return <table className={`table ${className}`}>{children}</table>;
}

export function TableBody({ children, className }) {
  return <tbody className={`table-body ${className}`}>{children}</tbody>;
}

export function TableCell({ children, className }) {
  return <td className={`table-cell ${className}`}>{children}</td>;
}

export function TableHead({ children, className }) {
  return <thead className={`table-head ${className}`}>{children}</thead>;
}

export function TableHeader({ children, className }) {
  return <th className={`table-header ${className}`}>{children}</th>;
}

export function TableRow({ children, className }) {
  return <tr className={`table-row ${className}`}>{children}</tr>;
}