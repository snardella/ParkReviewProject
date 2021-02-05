import express from "express";
import objection from "objection";

import { Review } from "../../../models/index.js";
import ParkSerializer from "../../serializer/ParkSerializer.js";

const reviewsRouter = new express.Router();

reviewsRouter.delete("/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.query().findById(reviewId);
    const park = await review.$relatedQuery("park");
    await Review.query().deleteById(reviewId);
    const serializedPark = await ParkSerializer.showDetails(park);
    return res
      .status(200)
      .json({ reviews: serializedPark.reviews, averageRating: serializedPark.averageRating });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

reviewsRouter.patch("/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const comments = req.body.comments;
    const rating = req.body.rating;
    await Review.query().patch({ comments: comments }).findById(reviewId);
    const review = await Review.query().patchAndFetchById(reviewId, { rating: rating });
    const park = await review.$relatedQuery("park");
    const serializedPark = await ParkSerializer.showDetails(park);
    return res.status(201).json({ park: serializedPark });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default reviewsRouter;
