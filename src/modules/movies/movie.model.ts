import { model, Schema } from "mongoose";
import { TMovie, TMovieMethod, TMovieModel, TReview } from "./movie.interface";
import { format } from "date-fns";
import slugify from "slugify";

const reviewSchema = new Schema<TReview>({
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
});

const movieSchema = new Schema<TMovie, TMovieModel, TMovieMethod>({
  title: {
    type: String,
    required: [true, "Title is required"], // Custom error message
  },
  description: {
    type: String,
    required: [true, "Description is required"], // Custom error message
  },
  releaseDate: {
    type: Date,
  },
  genre: {
    type: String,
    required: [true, "Genre is required"], // Custom error message
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
  reviews: [reviewSchema],
});

// movieSchema.pre("save", async function (next) {
//   const date = format(this.releaseDate, "dd-MM-yyyy");
//   this.slug = slugify(`${this.title}-${date}`, { lower: true });
//   next();
// });

movieSchema.method("createSlug", function createSlug(payload: TMovie) {
  const date = format(payload.releaseDate, "dd-MM-yyyy");
  const slug = slugify(`${payload.title}-${date}`, { lower: true });
  return slug;
});

export const Movie = model<TMovie, TMovieModel>("Movie", movieSchema);
