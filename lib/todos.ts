import { testTodos } from "@/app/api/todos/data";
import { ListItemData, ListItemsPaginationData } from "@/types/todo";

export async function getTodos(page: number): Promise<ListItemsPaginationData> {
  const res = await fetch(`/api/todos?page=${page}`);
  const { data, pagination } = await res.json();
  if (!res.ok || !data) throw new Error("Failed to fetch todos");
  return {
    items: data,
    page: pagination.page,
    totalPages: pagination.totalPages
  };
}

export async function setPagination(
  page: number
): Promise<ListItemsPaginationData> {
  const res = await fetch(`/api/todos?page=${page}`);
  const { pagination, data } = await res.json();
  if (!res.ok || !data) throw new Error("Failed to set pagination");
  return {
    page: pagination.page,
    totalPages: pagination.totalPages,
    items: data
  };
}

export async function deleteTodo(id: string) {
  const res = await fetch("/api/todos", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });

  if (!res.ok) throw new Error("Failed to delete todo");
}

export async function postTodo(title: string): Promise<ListItemData> {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

export async function addTestTodos(): Promise<void> {
  for (const todo of testTodos) {
    const resPost = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: todo.title })
    });
    if (!resPost.ok) throw new Error("Failed to post testdata");

    const created = await resPost.json();
    const resPatch = await fetch("/api/todos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, id: created.id })
    });
    if (!resPatch.ok) throw new Error("Failed to patch testdata");
  }
}

export async function toggleTodo(
  id: string,
  checked: boolean
): Promise<ListItemData> {
  const res = await fetch("/api/todos", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, checked })
  });

  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}

export async function editTodo(todo: ListItemData): Promise<ListItemData> {
  const res = await fetch("/api/todos", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...todo })
  });

  if (!res.ok) throw new Error("Failed to update todo");
  return res.json();
}
