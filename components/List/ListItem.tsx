"use client";

import { ListItemProps } from "@/types/list";
import Checkbox from "../CheckButton";

export default function ListItem({ item, onChange }: ListItemProps) {
  return (
    <li className="grid grid-cols-[1fr_auto_auto] gap-4 p-2 border-b border-gray-200 items-center">
      <div className="flex flex-col">
        <b className="text-lg">{item.title}</b>
        <span className="text-gray-600">{item.description}</span>
      </div>

      <div className="text-sm text-gray-500">{item.dueDate}</div>

      <div>
        <Checkbox checked={item.checked} onChange={onChange} />
      </div>
    </li>
  );
}
