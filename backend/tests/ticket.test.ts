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

describe("GET /api/tickets", () => {
  it("should return 200 and an array of tickets", async () => {
    const res = await request(app).get("/api/tickets");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return tickets with the correct shape", async () => {
    // First create a ticket so the list is guaranteed to be non-empty
    await request(app).post("/api/tickets");

    const res = await request(app).get("/api/tickets");
    const ticket = res.body[0];

    expect(ticket).toHaveProperty("id");
    expect(ticket).toHaveProperty("code");
    expect(ticket).toHaveProperty("is_used");
    expect(ticket).toHaveProperty("used_at");
    expect(ticket).toHaveProperty("created_at");
    expect(ticket).toHaveProperty("updated_at");
    expect(typeof ticket.is_used).toBe("boolean");
    expect(ticket.code).toMatch(/^[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}$/);
  });
});