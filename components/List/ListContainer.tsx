"use client";

import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { ListItemData } from "@/types/list";
import { getTodos, toggleTodo } from "@/lib/todos";

export default function ListContainer() {
  const [items, setItems] = useState<ListItemData[]>([]);

  useEffect(() => {
    getTodos().then(setItems);
  }, []);

  return (
    <ul className="w-full">
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onChange={async () => {
            const updatedTodo = await toggleTodo(item.id, !item.checked);
            setItems(items.map((i) => (i.id === item.id ? updatedTodo : i)));
          }}
        />
      ))}
    </ul>
  );
}
