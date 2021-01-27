import express from "express"
import Park from "../../../models/Park.js"

const parksRouter = new express.Router();

parksRouter.get("/", async (req, res) => {
  try {
    const parks = await Park.query()
    return res.status(200).json({ parks: parks })
  } catch(error) {
    return res.status(500).json({ errors: error })
  }
})

parksRouter.get("/:id", async (req,res) => {
const parkId = req.params.id;
  try {
    const park = await Park.query().findById(parkId);
    return res.status(200).json({ park: park  })
  } catch (error) {
    return res.status(500).json({ errors: error})
  }
})

export default parksRouter 