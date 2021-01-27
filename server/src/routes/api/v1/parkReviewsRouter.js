import express from "express"

import objetion from "objection"

import { Review } from "../../../models/index.js"
// import cleanUserInput from "../../../services/cleanUserInput.js";
const { ValidationError } = objection

const parkReviewsRouter = new express.Router({ mergeParams: true})

parkReviewsRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body)
  const { name, location, description, rating, picture } = formInput;
  const { parkId } = req.params;

  try {
    const newReview = await Review.query().insertAndFetch({ name, location, description, rating, picture, parkId  })
    return res.status(201).json({ review: newReview })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error }); 
  } 
})

export default parkReviewsRouter