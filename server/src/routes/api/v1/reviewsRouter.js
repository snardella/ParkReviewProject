import express from "express"


const reviewsRouter = new express.Router()

reviewsRouter.get("/", async (req, res) => {
  try {
    const review = await review.query()
    return res.status(200).json({ review: review })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }

})



export default reviewsRouter