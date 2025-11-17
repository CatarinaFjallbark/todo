import { useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";

export default function InputContainer({
  onAdd
}: {
  onAdd: (title: string) => void;
}) {
  const [text, setText] = useState("");

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl shadow bg-white w-full">
      <FaRegPlusSquare className="text-xl" />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAdd(text);
            setText("");
          }
        }}
        placeholder="Add a todo..."
        className="flex-1 focus:outline-none text-base"
      />
    </div>
  );
}
