import React from "react";

interface LayoutButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<LayoutButtonProps> = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
  >
    {children}
  </button>
);

export default Button;