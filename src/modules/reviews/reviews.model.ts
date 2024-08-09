import { model, Schema } from "mongoose";
import { TReview } from "./reviews.interface";

const reviewSchema = new Schema<TReview>({
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
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

export const Review = model<TReview>("Review", reviewSchema);
