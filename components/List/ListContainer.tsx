"use client";

import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { ListItemData } from "@/types/list";

export default function ListContainer() {
  const [items, setItems] = useState<ListItemData[]>([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then(setItems);
  }, []);

  return (
    <ul className="w-full">
      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
