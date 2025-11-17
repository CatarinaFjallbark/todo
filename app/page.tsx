"use client";

import {
  getTodos,
  postTodo,
  editTodo,
  toggleTodo,
  deleteTodo
} from "@/lib/todos";
import InputContainer from "@/components/Input/InputContainer";
import ListContainer from "@/components/List/ListContainer";
import { useEffect, useState } from "react";
import { ListItemData } from "@/types/list";
import EditContainer from "@/components/Edit/EditContainer";

export default function Home() {
  const [items, setItems] = useState<ListItemData[]>([]);
  const [edit, setEdit] = useState<ListItemData | undefined>();

  const onAdd = async (title: string) => {
    await postTodo(title.trim());
    setItems(await getTodos());
  };
  const onEdit = async (todo: ListItemData) => {
    await editTodo(todo);
    setItems(await getTodos());
  };

  const onToggle = async (todo: ListItemData) => {
    await toggleTodo(todo.id, !todo.checked);
    setItems(await getTodos());
  };

  const onDelete = async (todo: ListItemData) => {
    setEdit(undefined);
    await deleteTodo(todo.id);
    setItems(await getTodos());
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
            onDelete={onDelete}
          />
        )}
        <InputContainer onAdd={onAdd} />
        <ListContainer
          items={items}
          setItems={setItems}
          onEdit={(todo: ListItemData) => setEdit(todo)}
          onToggle={onToggle}
        />
      </main>
    </div>
  );
}
