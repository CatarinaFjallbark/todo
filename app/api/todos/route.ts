import { ListItemData } from "@/types/list";
import { NextResponse } from "next/server";

const todos: ListItemData[] = [
  {
    id: "1",
    title: "Buy groceries",
    description: "Milk, Eggs, Bread",
    dueDate: "2025-11-20",
    checked: false,
  },
  {
    id: "2",
    title: "Finish project",
    description: "Submit Next.js app",
    dueDate: "2025-11-22",
    checked: true,
  },
];

export async function GET() {
  return NextResponse.json(todos);
}
