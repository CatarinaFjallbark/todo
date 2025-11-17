import { ListItemData } from "@/types/list";

export async function getTodos(): Promise<ListItemData[]> {
  const res = await fetch("/api/todos");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
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
