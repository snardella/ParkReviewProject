import express from "express";
import Park from "../../../models/Park.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import objection from "objection";
import parkReviewsRouter from "./parkReviewsRouter.js";
const { ValidationError } = objection;

const parksRouter = new express.Router();

parksRouter.get("/", async (req, res) => {
  try {
    const parks = await Park.query();
    return res.status(200).json({ parks: parks });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

parksRouter.get("/:id", async (req,res) => {
const parkId = req.params.id;
  try {
    const park = await Park.query().findById(parkId);
    return res.status(200).json({ park: park  })
  } catch (error) {
    return res.status(500).json({ errors: error})
  }
})

parksRouter.post("/", async (req, res) => {
<<<<<<< HEAD
  const { body } = req
  const formInput = cleanUserInput(body)
  try {
    const newPark = await Park.query().insertAndFetch(formInput)
    return res.status(201).json({park: newPark})
  } catch(error) {
=======
  const { body } = req;
  const formInput = cleanUserInput(body);
  try {
    const newPark = await Park.query().insertAndFetch(formInput);
    return res.status(201).json({ park: newPark });
  } catch (error) {
>>>>>>> 3ff6a03e2461e7671c3864a342e8026a69ad5b8e
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
<<<<<<< HEAD
})
export default parksRouter 
=======
});

parksRouter.get("/:id", async (req, res) => {
  const parkId = req.params.id;
  try {
    const park = await Park.query().findById(parkId);
    return res.status(200).json({ park: park });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

parksRouter.use("/:parkId/reviews", parkReviewsRouter);

export default parksRouter;
>>>>>>> 3ff6a03e2461e7671c3864a342e8026a69ad5b8e
