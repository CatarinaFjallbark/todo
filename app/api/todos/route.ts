import { ListItemData } from "@/types/todo";
import { NextResponse } from "next/server";

let todos: ListItemData[] = [];

const checkedLast = (a: ListItemData, b: ListItemData) => {
  const aFlag = a.checked ? 1 : 0;
  const bFlag = b.checked ? 1 : 0;
  return aFlag - bFlag;
};

export const pageLimit = 10;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const param = url.searchParams.get("page");

  const page = param ? Math.max(1, parseInt(param, 10)) : 1;

  const sorted = todos.sort(checkedLast);
  const totalPages = Math.ceil(sorted.length / pageLimit);

  const safePage = Math.min(page, totalPages === 0 ? 1 : totalPages);

  const start = (safePage - 1) * pageLimit;
  const end = start + pageLimit;

  const paginated = sorted.slice(start, end);

  return NextResponse.json({
    data: paginated,
    pagination: {
      page: safePage,
      totalPages
    }
  });
}

export async function RESET() {
  todos = [];
  return NextResponse.json(todos);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Id is required" }, { status: 400 });
  }
  todos = todos.filter((t) => t.id !== id);
  return new Response(null, { status: 204 });
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
  todos = [newTodo, ...todos];

  return NextResponse.json(newTodo, { status: 201 });
}

export async function PATCH(request: Request) {
  const { id, checked, title, description, dueDate } = await request.json();
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Id is required" }, { status: 400 });
  }
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
