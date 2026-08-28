import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import request from "supertest";
import app from "../src/app.ts";

describe("POST /api/tickets", () => {
  it("should create a new ticket and return 201", async () => {
    const res = await request(app).post("/api/tickets");
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("code");
    expect(res.body).toHaveProperty("is_used", false);
    expect(res.body).toHaveProperty("used_at", null);
    expect(res.body).toHaveProperty("created_at");
    expect(res.body).toHaveProperty("updated_at");
    expect(res.body.code).toMatch(/^[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}$/);
  });
});