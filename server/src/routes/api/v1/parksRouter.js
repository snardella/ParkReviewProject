import express from "express"
import Park from "../../../models/Park.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const parksRouter = new express.Router();

parksRouter.get("/", async(req, res) => {
  try {
    const parks = await Park.query()
    return res.status(200).json({ parks: parks })
  } catch(error) {
    return res.status(500).json({ errors: error })
  }
})

parksRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  try{
    const newPark = await Park.query().insertAndFetch(formInput)
    return res.status(201).json({park: newPark})
  }catch(error) {
    return res.status(500).json({errors: error})
  }

})



export default parksRouter 