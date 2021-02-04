import express from "express"
import Vote from "../../../models/Vote.js"
import objection from "objection"
import Park from "../../../models/Park.js"
import ParkSerializer from "../../serializer/ParkSerializer.js"
const { ValidationError } = objection

const votesRouter = new express.Router();
//FIGURE OUT WHAT IS GETTING SENT BACK?
votesRouter.post("/", async(req, res) => {
    const voteTotal = req.body.vote
    const parkId = req.body.parkId
    const userId = req.user.id
    try {
        const vote = await Vote.query().insert({voteTotal, parkId, userId});
        const parks = await Park.query()
        const serializedParks = [];
        for (const park of parks) {
            const serializedPark = await ParkSerializer.showData(park);
            serializedParks.push(serializedPark);
        }
        serializedParks.sort((a, b) => {
            return b.voteTotal - a.voteTotal
        })
        return res.status(201).json({ parks: serializedParks, vote: vote})
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default votesRouter;