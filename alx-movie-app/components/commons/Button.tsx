import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={className ?? "px-4 py-2 bg-blue-600 text-white rounded"}
  >
    {children}
  </button>
);

export default Button;