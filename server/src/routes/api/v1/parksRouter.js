import express from "express"
import Park from "../../../models/Park.js"

const parksRouter = new express.Router();

parksRouter.get("/", async(req, res) => {
  try {
    const parks = await Park.query()
    return res.status(200).json({ parks: parks })
  } catch(error) {
    return res.status(500).json({ errors: error })
  }
})

export default parksRouter