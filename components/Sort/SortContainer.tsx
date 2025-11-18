import { SortContainerProps } from "@/types/todo";
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

export const SortContainer = ({
  checkedLast,
  onToggle
}: SortContainerProps) => {
  const handleClick = () => {
    const newOrder = !checkedLast;
    onToggle(newOrder);
  };

  return (
    <div
      className="flex items-center gap-2 p-2 rounded-xl
                 border border-zinc-300 dark:border-zinc-700
                 bg-white dark:bg-zinc-900 w-full"
    >
      <button
        onClick={handleClick}
        className="flex items-center justify-center w-full h-full
          text-zinc-900 dark:text-zinc-100"
      >
        {checkedLast ? <FaSortAmountDown /> : <FaSortAmountUp />}
      </button>
    </div>
  );
};
