import express, { Request, Response } from "express";

import { connectToDatabase } from "./config/db.js";

const app = express();
const port = process.env.PORT ?? 3000;

await connectToDatabase();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript !!!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port.toString()}`);
});
