import { Model } from "mongoose";

export type TReview = {
  email: string;
  rating: number;
  comment: string;
};

export type TMovie = {
  title: string;
  description: string;
  releaseDate: Date;
  genre: string;
  isDeleted?: boolean;
  viewCount: number;
  slug:string;
  reviews: [TReview];
};

export type TMovieMethod = {
  createSlug(payload:TMovie): string;
};

export type TMovieModel = Model<TMovie, Record<string, unknown>, TMovieMethod>;
