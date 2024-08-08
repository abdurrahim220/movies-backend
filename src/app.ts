import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MovieRouter } from "./modules/movies/movie.route";
const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/movies", MovieRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
