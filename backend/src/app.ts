import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req: express.Request, res: express.Response) => {
  res.send("API running");
});

// test the ticket code generator (Remove this route in production)
import { generateUniqueTicketCode } from "./utils/ticketCodeGenerator";

app.get("/test-code-generator", (_req: express.Request, res: express.Response) => {
  const code = generateUniqueTicketCode();
  res.send(`Generated code: ${code}`);
});

export default app;