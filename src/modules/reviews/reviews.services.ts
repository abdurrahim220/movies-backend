
import { Movie } from "../movies/movie.model";
import { TReview } from "./reviews.interface";
import { Review } from "./reviews.model";

const addReview = async (
  slug: string,
  reviewData: Partial<TReview>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<TReview | any> => {
  const session = await Movie.startSession();
  try {
    session.startTransaction();
    const movie = await Movie.findOne({ slug }).session(session);

    if (!movie) {
      throw new Error("Movie not found");
    }

    const review = await Review.create(
      [
        {
          movie: movie._id,
          ...reviewData,
        },
      ],
      { session }
    );

    const reviewsCount = await Review.countDocuments({
      movie: movie._id,
    }).session(session);

    await Movie.updateOne(
      { slug },
      { $set: { totalRating: reviewsCount } },
      { session }
    );
    await session.commitTransaction();
    return review[0];
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  }
  session.endSession();
};

const getAllReviews = async () => {
  const result = await Movie.find();
  return result;
};

const getSingleReviewById = async (id: string) => {
  const result = await Movie.findById(id);
  return result;
};
const updateReview = async (slug: string) => {
  const result = await Movie.findOne({ slug: slug });
  return result;
};
const deleteReview = async (slug: string) => {
  const result = await Movie.findOne({ slug: slug });
  return result;
};

export const ReviewServices = {
  addReview,
  getAllReviews,
  getSingleReviewById,
  updateReview,
  deleteReview,
};
