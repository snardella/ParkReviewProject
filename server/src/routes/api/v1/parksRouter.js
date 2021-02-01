import express from "express";
import objection from "objection";
const { ValidationError } = objection;

import cleanUserInput from "../../../services/cleanUserInput.js";
import Park from "../../../models/Park.js";
import parkReviewsRouter from "./parkReviewsRouter.js";
import ParkSerializer from "../../serializer/ParkSerializer.js";

const parksRouter = new express.Router();

parksRouter.get("/", async (req, res) => {
  try {
    const parks = await Park.query();
    const serializedParks = [];

    for (const park of parks) {
      const serializedPark = await ParkSerializer.showData(park);
      serializedParks.push(serializedPark);
    }
    return res.status(200).json({ parks: serializedParks });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

parksRouter.get("/:id", async (req, res) => {
  const parkId = req.params.id;
  try {
    const park = await Park.query().findById(parkId);
    const serializedPark = await ParkSerializer.showData(park);
    return res.status(200).json({ park: serializedPark });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

parksRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);

  try {
    const newPark = await Park.query().insertAndFetch(formInput);
    return res.status(201).json({ park: newPark });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

parksRouter.use("/:parkId/reviews", parkReviewsRouter);

export default parksRouter;
