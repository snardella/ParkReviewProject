import express from "express";
import cleanUserInput from "../../../services/cleanUserInput.js";
import objection from "objection";
import Park from "../../../models/Park.js";
import parkReviewsRouter from "./parkReviewsRouter.js";
const { ValidationError } = objection;

const parksRouter = new express.Router();

parksRouter.use("/:parkId/reviews", parkReviewsRouter);

parksRouter.get("/", async(req, res) => {
    try {
        const parks = await Park.query();
        return res.status(200).json({ parks: parks });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

parksRouter.get("/:id", async(req, res) => {
    const parkId = req.params.id;
    try {
        const park = await Park.query().findById(parkId);
        park.reviews = await park.$relatedQuery("reviews");
        for (let i = 0; i < park.reviews.length; i++) {
            park.reviews[i].user = await park.reviews[i].$relatedQuery("user")
        }
        return res.status(200).json({ park: park })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

parksRouter.post("/", async(req, res) => {
    const { body } = req
    const formInput = cleanUserInput(body)
    try {
        const newPark = await Park.query().insertAndFetch(formInput)
        return res.status(201).json({ park: newPark })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data });
        }
        return res.status(500).json({ errors: error });
    }
});

export default parksRouter;