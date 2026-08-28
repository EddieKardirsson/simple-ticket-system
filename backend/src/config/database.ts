import { Database } from "bun:sqlite";
import path from "path";

const DB_PATH = process.env.DB_PATH ?? path.resolve("data", "tickets.db");

const db = new Database(DB_PATH, { create: true });

db.run("PRAGMA journal_mode = WAL;");
db.run("PRAGMA foreign_keys = ON;");

export default db;