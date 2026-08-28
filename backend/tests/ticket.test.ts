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

describe("PATCH /api/tickets/:id/redeem", () => {
  it("should redeem an unused ticket and return 200", async () => {
    const created = await request(app).post("/api/tickets");
    const id = created.body.id;

    const res = await request(app).patch(`/api/tickets/${id}/redeem`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("is_used", true);
    expect(res.body).toHaveProperty("used_at");
    expect(res.body.used_at).not.toBeNull();
  });

  it("should return 409 when redeeming an already used ticket", async () => {
    const created = await request(app).post("/api/tickets");
    const id = created.body.id;

    await request(app).patch(`/api/tickets/${id}/redeem`);
    const res = await request(app).patch(`/api/tickets/${id}/redeem`);

    expect(res.status).toBe(409);
  });

  it("should return 404 when ticket does not exist", async () => {
    const res = await request(app).patch("/api/tickets/999999/redeem");

    expect(res.status).toBe(404);
  });
});