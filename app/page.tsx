"use client";

import { getTodos, postTodo } from "@/lib/todos";
import InputContainer from "@/components/Input/InputContainer";
import ListContainer from "@/components/List/ListContainer";
import { useEffect, useState } from "react";
import { ListItemData } from "@/types/list";

export default function Home() {
  const [items, setItems] = useState<ListItemData[]>([]);

  const onAdd = async (e: { key: string }, text: string) => {
    const newTodo = await postTodo(text.trim());
    setItems([newTodo, ...items]);
  };
  useEffect(() => {
    getTodos().then(setItems);
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-8 items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <InputContainer onAdd={onAdd} />
        <ListContainer items={items} setItems={setItems} />
      </main>
    </div>
  );
}
