import express from "express";
import Park from "../../../models/Park.js";
import parkReviewsRouter from "./parkReviewsRouter.js";

const reviewsRouter = new express.Router();

reviewsRouter.get("/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const park = await Park.query().findById(id);
        park.reviews = await park.$relatedQuery("reviews");
        for (let i = 0; i < park.reviews.length; i++) {
            park.reviews[i].user = await park.reviews[i].$relatedQuery("user")
        }
        return res.status(200).json({ reviews: park.reviews });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

export default reviewsRouter;