import express from "express";
import objection from "objection";
const { ValidationError } = objection;

import { Park, Review } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import ParkSerializer from "../../serializer/ParkSerializer.js";
import ReviewSerializer from "../../serializer/ReviewSerializer.js";

const parkReviewsRouter = new express.Router({ mergeParams: true });

parkReviewsRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { rating, comments } = formInput;
  const parkId = req.params.parkId;
  const userId = req.user.id;
  try {
    const newReview = await Review.query().insertAndFetch({
      rating,
      comments,
      parkId,
      userId,
    });
    const serializedReview = await ReviewSerializer.showData(newReview);
    const park = await Park.query().findById(parkId);
    const serializedPark = await ParkSerializer.showDetails(park);
    return res.status(201).json({ review: serializedReview, park: serializedPark });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

parkReviewsRouter.post("/:reviewId", async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const parkId = req.params.parkId;
    await Review.query().deleteById(reviewId);
    const park = await Park.query().findById(parkId);
    const serializedPark = await ParkSerializer.showDetails(park);
    return res.status(201).json({ park: serializedPark });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

parkReviewsRouter.patch("/:reviewId", async (req, res) => {
  try {
    const parkId = req.params.parkId;
    const reviewId = req.params.reviewId;
    const comments = req.body.comments;
    const rating = req.body.rating;
    await Review.query().patch({ comments: comments }).findById(reviewId);
    await Review.query().patch({ rating: rating }).findById(reviewId);
    const park = await Park.query().findById(parkId);
    const serializedPark = await ParkSerializer.showDetails(park);
    return res.status(201).json({ park: serializedPark });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default parkReviewsRouter;
