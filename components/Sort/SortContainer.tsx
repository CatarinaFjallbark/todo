import { SortContainerProps } from "@/types/todo";
import React, { useState } from "react";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

export const SortContainer: React.FC<SortContainerProps> = ({
  checkedLast,
  onToggle
}) => {
  const handleClick = () => {
    const newOrder = !checkedLast;
    onToggle(newOrder);
  };

  return (
    <div className="flex items-center gap-2 p-2 rounded-xl w-full">
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-3 py-1 rounded-lg border border-zinc-300 dark:border-zinc-700
             text-zinc-900 dark:text-zinc-100
             hover:bg-zinc-200 dark:hover:bg-zinc-800
             transition ml-auto"
      >
        {checkedLast ? <FaSortAmountDown /> : <FaSortAmountUp />}
      </button>
    </div>
  );
};
