"use client";

import { getTodos, postTodo, editTodo } from "@/lib/todos";
import InputContainer from "@/components/Input/InputContainer";
import ListContainer from "@/components/List/ListContainer";
import { useEffect, useState } from "react";
import { ListItemData } from "@/types/list";
import EditContainer from "@/components/Edit/EditContainer";

export default function Home() {
  const [items, setItems] = useState<ListItemData[]>([]);
  const [edit, setEdit] = useState<ListItemData | undefined>(undefined);

  const onAdd = async (e: { key: string }, text: string) => {
    const newTodo = await postTodo(text.trim());
    setItems([newTodo, ...items]);
  };
  const onEdit = async (todo: ListItemData) => {
    const editedTodo = await editTodo(todo);

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === editedTodo.id ? editedTodo : item))
    );
  };

  useEffect(() => {
    getTodos().then(setItems);
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-8 items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        {edit && (
          <EditContainer
            todo={edit}
            onClose={() => setEdit(undefined)}
            onChange={onEdit}
            onDelete={() => {}}
          />
        )}
        <InputContainer onAdd={onAdd} />
        <ListContainer
          items={items}
          setItems={setItems}
          onEdit={(todo: ListItemData) => setEdit(todo)}
        />
      </main>
    </div>
  );
}
