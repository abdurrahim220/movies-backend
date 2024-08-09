import { Request, Response } from "express";
import { ReviewServices } from "./reviews.services";

const addReview = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const reviewData = req.body;
    const result = await ReviewServices.addReview(slug, reviewData);
    res.status(201).json({
      success: true,
      message: "Review is created successfully!!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Could not add Reviews!",
      error: error,
    });
  }
};

// const getAllReviews = async (req: Request, res: Response) => {
//   try {
//     const result = await ReviewServices.getReviews();
//     res.status(200).json({
//       success: true,
//       message: "Review data retrieve successfully!!",
//       data: result,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Could not fetch Reviews!",
//       error: error,
//     });
//   }
// };

// const getSingleReviewById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const result = await ReviewServices.getSingleReview(id);

//     res.status(200).json({
//       success: true,
//       message: "Review data retrieved successfully!",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Could not retrieve Review data!",
//       error: error || "An unexpected error occurred.",
//     });
//   }
// };
// const updateReview = async (req: Request, res: Response) => {
//   try {
//     const { slug } = req.params;
//     const result = await ReviewServices.getSingleReviewBySlug(slug);

//     res.status(200).json({
//       success: true,
//       message: "Review data retrieved successfully!",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Could not retrieve Review data!",
//       error: error || "An unexpected error occurred.",
//     });
//   }
// };
// const deleteReview = async (req: Request, res: Response) => {
//   try {
//     const { slug } = req.params;
//     const result = await ReviewServices.getSingleReviewBySlug(slug);

//     res.status(200).json({
//       success: true,
//       message: "Review data retrieved successfully!",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Could not retrieve Review data!",
//       error: error || "An unexpected error occurred.",
//     });
//   }
// };

export const ReviewControllers = {
  addReview,
//   getAllReviews,
//   deleteReview,
//   updateReview,
//   getSingleReviewById,
};
