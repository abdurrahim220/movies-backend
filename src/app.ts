import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MovieRouter } from "./modules/movies/movie.route";
import { notFound } from "./middleware/NotFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
const app = express();

dotenv.config();

app.use(express.json());

app.use("/api/movies", MovieRouter);

app.use(notFound);
app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
