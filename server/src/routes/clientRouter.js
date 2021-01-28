import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

<<<<<<< HEAD
const clientRoutes = ["/", "/user-sessions/new", "/users/new", "/profile", "/parks", "/parks/:id", "/parks/new"];
=======
const clientRoutes = [
  "/",
  "/user-sessions/new",
  "/users/new",
  "/profile",
  "/parks",
  "/parks/:id",
  "/new",
  "/parks/reviews",
];
>>>>>>> 3ff6a03e2461e7671c3864a342e8026a69ad5b8e
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
