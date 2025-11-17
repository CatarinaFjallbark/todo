import { ListItemData } from "@/types/list";
import { NextResponse } from "next/server";

let todos: ListItemData[] = [];

export async function GET() {
  return NextResponse.json(todos);
}

export async function DELETE() {
  todos = [];
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { title, id } = await request.json();

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const newTodo = {
    id: id || crypto.randomUUID(),
    title
  };

  todos.push(newTodo);

  return NextResponse.json(newTodo, { status: 201 });
}

export async function PATCH(request: Request) {
  const { id, checked, title, description, dueDate } = await request.json();

  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }
  if (checked !== undefined) todos[index].checked = checked;
  if (title !== undefined) todos[index].title = title;
  if (description !== undefined) todos[index].description = description;
  if (dueDate !== undefined) todos[index].dueDate = dueDate;

  return NextResponse.json(todos[index], { status: 200 });
}
