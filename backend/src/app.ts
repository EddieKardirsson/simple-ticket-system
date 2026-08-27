import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req: express.Request, res: express.Response) => {
  res.send("API running");
});

export default app;