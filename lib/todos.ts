import {
  ListItemData,
  PaginationData,
  ListItemsPaginationData
} from "@/types/todo";

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

export async function getPagination(): Promise<PaginationData> {
  const res = await fetch("/api/todos");
  const { pagination } = await res.json();
  if (!res.ok) throw new Error("Failed to fetch todos");
  return pagination;
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
