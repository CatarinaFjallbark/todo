import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { EditContainerProps } from "@/types/todo";

export const EditContainer = ({
  todo,
  onClose,
  onChange,
  onDelete
}: EditContainerProps) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(
    todo.description || ""
  );
  const [dueDate, setDueDate] = useState<string>(todo.dueDate || "");
  const close = useCallback(() => {
    onChange({
      ...todo,
      title,
      // Making sure that the values stay persistent if no change is made
      description:
        todo.description === undefined && description === ""
          ? undefined
          : description,
      dueDate:
        todo.dueDate === undefined && dueDate === "" ? undefined : dueDate
    });
    onClose();
  }, [todo, title, description, dueDate, onChange, onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [close]);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={close} />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: todo ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="fixed right-0 top-0 z-50 h-full w-full sm:w-1/3 bg-white dark:bg-zinc-900 shadow-xl p-6 flex flex-col gap-6 overflow-y-auto"
      >
        <h2 className="text-2xl font-semibold">Edit Todo</h2>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-2 h-28 resize-none focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
            className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-2 focus:outline-none"
          />
        </div>

        <button
          onClick={() => onDelete(todo)}
          className="ml-auto inline-flex items-center gap-2 text-zinc-600 border border-zinc-400 rounded-lg px-3 py-1 hover:bg-zinc-300 hover:text-black transition"
        >
          <FaTrash />
          Delete
        </button>
      </motion.div>
    </>
  );
};
