"use client";

import { ListItemProps } from "@/types/todo";
import Checkbox from "./CheckBox";

export default function ListItem({ item, onChange, onEdit }: ListItemProps) {
  return (
    <li
      onClick={() => onEdit(item)}
      className={`
        grid grid-cols-[1fr_auto_auto] gap-4 p-2 border-b border-gray-200 items-center
        ${item.checked ? "bg-gray-100" : ""}
      `}
    >
      <div className="flex flex-col">
        <b className={`text-lg ${item.checked ? "text-gray-600" : ""}`}>
          {item.title}
        </b>
        <span className="text-gray-600">{item.description}</span>
      </div>

      <div className="text-sm text-gray-500">{item.dueDate}</div>

      <div>
        <Checkbox checked={item.checked || false} onChange={onChange} />
      </div>
    </li>
  );
}
