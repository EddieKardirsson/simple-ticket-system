import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction): void => {

  if (typeof err === "object" && err !== null && "status" in err && "message" in err) {
    const { status, message } = err as { status: number; message: string };
    res.status(status).json({ error: message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

