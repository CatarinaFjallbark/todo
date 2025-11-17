import { SortContainerProps } from "@/types/todo";
import React, { useState } from "react";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

export const SortContainer: React.FC<SortContainerProps> = ({
  ascending = true,
  onToggle
}) => {
  const [isAscending, setIsAscending] = useState(ascending);

  const handleClick = () => {
    const newOrder = !isAscending;
    setIsAscending(newOrder);
    onToggle(newOrder);
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-xl w-full">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition ml-auto"
      >
        {isAscending ? <FaSortAmountUp /> : <FaSortAmountDown />}
      </button>
    </div>
  );
};
