import express from "express";
import objection from "objection";
const { ValidationError } = objection;

import cleanUserInput from "../../../services/cleanUserInput.js";
import Park from "../../../models/Park.js";
import parkReviewsRouter from "./parkReviewsRouter.js";
import ParkSerializer from "../../serializer/ParkSerializer.js";

const parksRouter = new express.Router();

parksRouter.use("/:parkId/reviews", parkReviewsRouter);

parksRouter.get("/", async (req, res) => {
  try {
    const parks = await Park.query();

    const serializedParks = [];
    for (const park of parks) {
      const serializedPark = await ParkSerializer.showData(park);
      serializedParks.push(serializedPark);
    }
    serializedParks.sort((a, b) => {
      return b.voteTotal - a.voteTotal;
    });
    return res.status(200).json({ parks: serializedParks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

parksRouter.get("/:id", async (req, res) => {
  const parkId = req.params.id;
  debugger;
  try {
    const park = await Park.query().findById(parkId);
    const serializedPark = await ParkSerializer.showDetails(park);
    return res.status(200).json({ park: serializedPark });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

parksRouter.post("/NPS", async (req, res) => {
  let parksToSendBack = [];
  try {
    const allTheParks = req.body;
    for (const singleParkData of allTheParks) {
      const currentPark = await Park.query().findOne({ name: singleParkData.name });
      if (!currentPark) {
        const newPark = await Park.query().insertAndFetch(singleParkData);
        const serializedPark = await ParkSerializer.showData(newPark);
        parksToSendBack.push(serializedPark);
      }
    }
    return res.status(201).json({ parks: parksToSendBack });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

parksRouter.post("/", async (req, res) => {
  const user = req.user.id;
  const { body } = req;
  const formInput = cleanUserInput(body);
  formInput.userId = user;

  try {
    const newPark = await Park.query().insertAndFetch(formInput);
    const serializedPark = await ParkSerializer.showData(newPark);
    return res.status(201).json({ park: serializedPark });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default parksRouter;
