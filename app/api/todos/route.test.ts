import { GET, PATCH, POST } from "./route";
import { describe, it, expect, beforeEach } from "vitest";
import { testTodos } from "./data";

beforeEach(async () => {
  for (const todo of testTodos) {
    const req = new Request("http://localhost/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" }
    });

    await POST(req);
  }
});

describe("GET /api/todos", () => {
  it("returns todos", async () => {
    const res = await GET();
    const data = await res.json();

    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("title");
    expect(data[0]).toHaveProperty("description");
    expect(data[0]).toHaveProperty("dueDate");
    expect(data[0]).toHaveProperty("checked");
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  describe("PATCH /api/todos", () => {
    it("updates the checked state", async () => {
      const req = new Request("http://localhost", {
        method: "PATCH",
        body: JSON.stringify({ id: "1", checked: true }),
        headers: { "Content-Type": "application/json" }
      });

      const res = await PATCH(req);
      const data = await res.json();

      expect(data.checked).toBe(true);
    });
  });
});
