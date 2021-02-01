import express from "express";
import objection from "objection";
const { ValidationError } = objection;

import { Review } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";

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
    return res.status(201).json({ review: newReview });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default parkReviewsRouter;
