import { PaginationProps } from "@/types/todo";

export const PaginationContainer = ({
  totalPages,
  currentPage,
  onPageChange
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-6 w-full max-w-full overflow-x-auto">
      <div className="inline-flex gap-2 px-1 py-2 whitespace-nowrap min-w-max">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => {
              if (page !== currentPage) {
                onPageChange(page);
              }
            }}
            className={`flex-none px-3 py-1 rounded-lg text-sm transition
            ${
              page === currentPage
                ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black"
                : "bg-zinc-200 text-black hover:bg-zinc-300 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
            }
          `}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};
