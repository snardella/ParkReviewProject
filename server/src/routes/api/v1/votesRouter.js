import express from "express"
import Vote from "../../../models/Vote.js"
import objection from "objection"
const { ValidationError } = objection

const votesRouter = new express.Router();
//FIGURE OUT WHAT IS GETTING SENT BACK?
votesRouter.post("/", async(req, res) => {
    console.log(req.body)
    const score = req.body.score
    try {
        const vote = await Vote.query().insertAndFetch({ score });
        return res.status(201).json({ vote: vote })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default votesRouter;