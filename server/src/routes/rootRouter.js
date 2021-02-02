import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import parksRouter from "./api/v1/parksRouter.js"
import votesRouter from "./api/v1/votesRouter.js"

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/parks", parksRouter)
rootRouter.use("/api/v1/votes", votesRouter)

export default rootRouter;