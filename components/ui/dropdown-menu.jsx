// filepath: c:\Users\aDMin\downloads\web_f_project\components\ui\dropdown-menu.jsx
import React from "react";

export function DropdownMenu({ children }) {
  return <div className="dropdown-menu">{children}</div>;
}

export function DropdownMenuTrigger({ children, asChild, ...props }) {
  if (asChild) {
    return React.cloneElement(children, { ...props });
  }

  return (
    <div
      role="button"
      className="dropdown-menu-trigger"
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuContent({ children }) {
  return <div className="dropdown-menu-content">{children}</div>;
}

export function DropdownMenuItem({ children, ...props }) {
  return (
    <div className="dropdown-menu-item" {...props}>
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ children }) {
  return <div className="dropdown-menu-label">{children}</div>;
}

export function DropdownMenuSeparator() {
  return <hr className="dropdown-menu-separator" />;
}

export function DropdownMenuGroup({ children, className }) {
  return <div className={`dropdown-menu-group ${className}`}>{children}</div>;
}

// Export all components