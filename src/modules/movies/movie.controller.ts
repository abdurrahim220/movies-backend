import { NextFunction, Request, Response } from "express";
import { MovieServices } from "./movie.service";
import { z } from "zod";

const zodMovieSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  releaseDate: z.string().date(),
  genre: z.string({
    required_error: "Genre is required",
  }),
  isDeleted: z.boolean().default(false),
  slug: z.string().optional(),
  viewCount: z.number().default(0),
  totalRating: z.number().default(0),
});

const createMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movieData = req.body;
    zodMovieSchema.parse(movieData);

    const result = await MovieServices.createMovie(movieData);
    res.status(201).json({
      success: true,
      message: "Movie is created successfully!!",
      data: result,
    });
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   message: "Could not create movies!",
    //   error: error,
    // });
    next(error);
  }
};

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const result = await MovieServices.getMovies();
    res.status(200).json({
      success: true,
      message: "Movie data retrieve successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Could not fetch movies!",
      error: error,
    });
  }
};

const getSingleMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await MovieServices.getSingleMovie(id);

    res.status(200).json({
      success: true,
      message: "Movie data retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not retrieve movie data!",
      error: error || "An unexpected error occurred.",
    });
  }
};
const getSingleMovieBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await MovieServices.getSingleMovieBySlug(slug);

    res.status(200).json({
      success: true,
      message: "Movie data retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Could not retrieve movie data!",
      error: error || "An unexpected error occurred.",
    });
  }
};

export const MovieControllers = {
  createMovie,
  getAllMovies,
  getSingleMovie,
  getSingleMovieBySlug,
};
