import { ListItemData } from "@/types/list";
import { NextResponse } from "next/server";
import { testTodos } from "./data";

const todos: ListItemData[] = [...testTodos];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { id, title, description, dueDate, checked } = await request.json();
  todos.push({ id, title, description, dueDate, checked });
  return NextResponse.json(todos);
}

export async function PATCH(request: Request) {
  const { id, checked } = await request.json();

  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  todos[index].checked = checked;

  return NextResponse.json(todos[index]);
}
