"use client";

import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

type RoundCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function Checkbox({ checked, onChange }: RoundCheckboxProps) {
  return (
    <div
      role="checkbox"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-center focus:outline-none"
      aria-checked={checked}
    >
      {checked ? (
        <FaCheckCircle size={24} color="#000000" />
      ) : (
        <FaRegCircle size={24} color="#d1d5db" />
      )}
    </div>
  );
}
