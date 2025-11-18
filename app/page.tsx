"use client";

import {
  getTodos,
  postTodo,
  editTodo,
  toggleTodo,
  deleteTodo,
  setPagination
} from "@/lib/todos";
import InputContainer from "@/components/Input/InputContainer";
import ListContainer from "@/components/List/ListContainer";
import { useEffect, useState } from "react";
import { ListItemData } from "@/types/todo";
import EditContainer from "@/components/Edit/EditContainer";
import { PaginationContainer } from "@/components/Pagination/PaginationContainer";
import { SearchContainer } from "@/components/Search/SearchContainer";
import { SortContainer } from "@/components/Sort/SortContainer";

export default function Home() {
  const [items, setItems] = useState<ListItemData[]>([]);
  const [edit, setEdit] = useState<ListItemData | undefined>();
  const [currentPage, setPage] = useState(1);
  const [totalPages, setTotalPagesPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortCheckedLast, setSort] = useState(true);

  // updates local state
  const setData = async () => {
    const data = await getTodos(currentPage);
    setItems(data.items);
    setTotalPagesPage(data.totalPages);
  };

  const onAdd = async (title: string) => {
    await postTodo(title.trim());
    setData();
  };
  const onEdit = async (todo: ListItemData) => {
    await editTodo(todo);
    setData();
  };

  const onToggle = async (todo: ListItemData) => {
    await toggleTodo(todo.id, !todo.checked);
    setData();
  };

  const onDelete = async (todo: ListItemData) => {
    // close edit view
    setEdit(undefined);
    await deleteTodo(todo.id);
    setData();
  };

  const onSort = () => {
    return sortCheckedLast ? items : [...items].reverse();
  };

  const onPageChange = async (newPage: number) => {
    // close edit view
    setEdit(undefined);
    const res = await setPagination(newPage);
    setItems(res.items);
    setPage(res.page);
    setTotalPagesPage(res.totalPages);
  };

  useEffect(() => {
    const load = async () => {
      setData();
    };
    load();
  }, []);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-8 items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full gap-4">
          <div className="flex-[4]">
            <SearchContainer value={search} onChange={setSearch} />
          </div>

          <div className="flex-[1]">
            <SortContainer
              checkedLast={sortCheckedLast}
              onToggle={() => {
                setSort(!sortCheckedLast);
              }}
            />
          </div>
        </div>
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
          items={onSort().filter((item) => item.title.startsWith(search))}
          setItems={setItems}
          onEdit={(todo: ListItemData) => setEdit(todo)}
          onToggle={onToggle}
        />
        {totalPages > 1 && (
          <PaginationContainer
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
      </main>
    </div>
  );
}
