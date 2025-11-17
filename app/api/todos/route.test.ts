import { GET, PATCH, POST, DELETE } from "./route";
import { describe, it, expect, beforeEach } from "vitest";
import { testTodos } from "./data";
import { desc } from "framer-motion/client";

beforeEach(async () => {
  await DELETE();

  for (const todo of testTodos) {
    const reqPost = new Request("http://test/api/todos", {
      method: "POST",
      body: JSON.stringify({ title: todo.title, id: todo.id }),
      headers: { "Content-Type": "application/json" }
    });
    const reqPatch = new Request("http://test/api/todos", {
      method: "PATCH",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" }
    });

    await POST(reqPost);
    await PATCH(reqPatch);
  }
});

describe("GET /api/todos", () => {
  it("returns todos", async () => {
    const res = await GET();
    const data = await res.json();

    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("title");
    expect(data[0]).toHaveProperty("description");
    expect(data[0]).toHaveProperty("dueDate");
    expect(data[0]).toHaveProperty("checked");
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(3);
  });
});

describe("PATCH /api/todos", () => {
  it("updates the checked state", async () => {
    const req = new Request("http://test/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id: "1", checked: true }),
      headers: { "Content-Type": "application/json" }
    });

    const res = await PATCH(req);
    const data = await res.json();

    expect(data.checked).toBe(true);
  });
});

describe("Sorting", () => {
  it("returns todos with checked items last", async () => {
    const res = await GET();
    const data = await res.json();
    expect(data[0].checked).toBe(false);
    expect(data[1].checked).toBe(false);
    expect(data[2].checked).toBe(true);
  });
});
