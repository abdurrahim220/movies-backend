import { model, Schema } from "mongoose";
import { TMovie, TMovieMethod, TMovieModel } from "./movie.interface";
import { format } from "date-fns";
import slugify from "slugify";

const movieSchema = new Schema<TMovie, TMovieModel, TMovieMethod>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  releaseDate: {
    type: Date,
  },
  genre: {
    type: String,
    required: [true, "Genre is required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  // reviews: [reviewSchema],
  totalRating: {
    type: Number,
    default: 0,
  },
});

movieSchema.method("createSlug", function createSlug(payload: TMovie) {
  const date = format(payload.releaseDate, "dd-MM-yyyy");
  const slug = slugify(`${payload.title}-${date}`, { lower: true });
  return slug;
});

export const Movie = model<TMovie, TMovieModel>("Movie", movieSchema);
