import React from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
  disabled?: boolean;
  id: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  id,
  disabled,
  ...props
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {label && (
          <label
            htmlFor={id}
            style={{
              marginBottom: "4px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#333",
            }}
          >
            {label}
          </label>
        )}
        <input
          id={id}
          disabled={disabled}
          style={{
            padding: "8px 12px",
            border: `1px solid ${error ? "#e63946" : "#ccc"}`,
            borderRadius: "4px",
            fontSize: "16px",
            outline: "none",
            transition: "border-color 0.2s ease-in-out",
          }}
          {...props}
        />
      </div>
      {error && (
        <p style={{ color: `${error ? "#e63946" : "default"}` }}>{error}</p>
      )}
    </div>
  );
};

export default Input;
