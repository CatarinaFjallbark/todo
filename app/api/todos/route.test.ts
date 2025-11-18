import { GET, PATCH, POST, RESET, pageLimit } from "./route";
import { describe, it, expect, beforeEach } from "vitest";
import { testTodos } from "./data";

beforeEach(async () => {
  await RESET();

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
    const req = new Request("http://test/api/todos?page=1");
    const res = await GET(req);

    const { data } = await res.json();

    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("title");
    expect(data[0]).toHaveProperty("description");
    expect(data[0]).toHaveProperty("dueDate");
    expect(data[0]).toHaveProperty("checked");
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(testTodos.length);
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
    const req = new Request("http://test/api/todos?page=1");
    const res = await GET(req);
    const { data } = await res.json();
    expect(data[0].checked).toBe(false);
    expect(data[1].checked).toBe(false);
    expect(data[2].checked).toBe(true);
  });
});

describe("Pagination", () => {
  it("returns the correct page of todos", async () => {
    const reqPage1 = new Request(`http://test/api/todos?page=1`);
    const res1 = await GET(reqPage1);
    const { data: dataPage1, pagination: pagination1 } = await res1.json();

    expect(dataPage1.length).toBeLessThanOrEqual(pageLimit);

    expect(pagination1.page).toBe(1);
    expect(pagination1.totalPages).toBe(
      Math.ceil(testTodos.length / pageLimit)
    );
    const reqPage2 = new Request(`http://test/api/todos?page=2`);
    const res2 = await GET(reqPage2);
    const { data: dataPage2 } = await res2.json();

    expect(dataPage2.length).toBeLessThanOrEqual(pageLimit);
  });
});
