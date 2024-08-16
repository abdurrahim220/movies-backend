import express from "express";

import { MovieControllers } from "./movie.controller";
import { ReviewControllers } from "../reviews/reviews.controllers";

import { zodMovieSchema } from "./zodMovieSchema";
import { validateZodRequest } from "../../middleware/validateZodRquest";
const router = express.Router();

router.post(
  "/",
  validateZodRequest(zodMovieSchema),
  MovieControllers.createMovie
);
router.get("/", MovieControllers.getAllMovies);
router.get("/:id", MovieControllers.getSingleMovie);
router.get("/slug/:slug", MovieControllers.getSingleMovieBySlug);

// review api
router.post("/slug/:slug/review", ReviewControllers.addReview);
// router.get("/slug/:slug/review", ReviewControllers.getSingleReviewById);
// router.get("/slug/:slug/review", ReviewControllers.getAllReviews);
// router.put("/slug/:slug/review", ReviewControllers.updateReview);
// router.delete("/slug/:slug/review", ReviewControllers.deleteReview);

export const MovieRouter = router;
