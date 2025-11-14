import { ListItemData } from "@/types/list";

export async function getTodos(): Promise<ListItemData[]> {
  const res = await fetch("/api/todos");
  if (!res.ok) throw new Error("Failed to fetch todos");
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
