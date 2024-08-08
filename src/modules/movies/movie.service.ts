import { TMovie } from "./movie.interface";
import { Movie } from "./movie.model";

const createMovie = async (payload: TMovie) => {
  const result = new Movie(payload);
  const slug = result.createSlug(payload);
  result.slug = slug;
  await result.save();
  return result;
};

const getMovies = async () => {
  const result = await Movie.find();
  return result;
};

const getSingleMovie = async (id: string) => {
  const result = await Movie.findById(id);
  return result;
};

export const MovieServices = {
  createMovie,
  getMovies,
  getSingleMovie,
};
