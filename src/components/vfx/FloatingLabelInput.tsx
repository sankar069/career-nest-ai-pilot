
import React from "react";
import { motion } from "framer-motion";

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, error, className = "", ...props }, ref) => (
    <div className="relative w-full">
      <input
        ref={ref}
        {...props}
        className={`peer w-full bg-transparent border-b-2 border-accent/60 transition-all px-0 py-2 text-[1.04rem] focus:outline-none focus:border-accent ${className} ${error ? "border-red-400 animate-shake" : ""}`}
        placeholder=" "
        autoComplete={props.type === "password" ? "current-password" : "on"}
      />
      <motion.label
        htmlFor={props.id}
        initial={false}
        animate={{ color: error ? "#ff5050" : "#97ff5c" }}
        className={`absolute -top-3 left-0 text-accent/80 text-xs font-bold pointer-events-none px-1 transition-all
          peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal
          peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent`}
      >
        {label}
      </motion.label>
    </div>
  )
);
FloatingLabelInput.displayName = "FloatingLabelInput";
