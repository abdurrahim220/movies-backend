import { z } from "zod";

export const zodMovieSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  releaseDate: z
    .string()
    .date("Please provide a valid date in this format YYYY-MM-DD"),
  genre: z.string({
    required_error: "Genre is required",
  }),
  isDeleted: z.boolean().default(false),
  slug: z.string().optional(),
  viewCount: z.number().default(0),
  totalRating: z.number().default(0),
});
