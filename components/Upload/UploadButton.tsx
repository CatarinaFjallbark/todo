import { UploadButtonProps } from "@/types/todo";
import { FaUpload } from "react-icons/fa";

export const UploadButton = ({ onClick, className }: UploadButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2
        px-4 py-2
        bg-zinc-200 hover:bg-zinc-300
        dark:bg-zinc-800 dark:hover:bg-zinc-700
        text-zinc-900 dark:text-zinc-100
        font-medium
        rounded-lg
        transition-colors
        ${className ?? ""}
        `}
    >
      <FaUpload className="text-lg" />
      Add test data
    </button>
  );
};
