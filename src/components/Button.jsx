import clsx from "clsx";
import React from "react";

const Button = ({ icon, className, label, type, onClick = () => {}, disabled = false }) => {
  return (
    <button
      type={type || "button"}
      className={clsx(
        "px-3 py-2 outline-none",
        className,
        { "opacity-50 cursor-not-allowed": disabled } // Apply styles if disabled
      )}
      onClick={!disabled ? onClick : undefined} // Prevent click if disabled
      disabled={disabled} // Add disabled attribute
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
