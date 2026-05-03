import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addActivity,
  addfood,
  addNotes,
  addWorkout,
} from "../controllers/tracking.controller.js";
const trackRouter = express.Router();

trackRouter.post("/track-calories", authMiddleware, addfood);
trackRouter.post("/track-activity", authMiddleware, addActivity);
trackRouter.post("/add-notes", authMiddleware, addNotes);
trackRouter.post("/track-workout", authMiddleware, addWorkout);

export default trackRouter;
