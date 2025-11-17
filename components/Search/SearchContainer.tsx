import { SearchInputProps } from "@/types/todo";
import { FaSearch } from "react-icons/fa";

export const SearchContainer = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 w-full">
      <FaSearch className="text-zinc-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"Search title..."}
        className="flex-1 bg-transparent focus:outline-none text-sm text-zinc-900 dark:text-zinc-100"
      />
    </div>
  );
};
