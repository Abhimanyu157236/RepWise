import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getActivity,
  getFood,
  getNotes,
  getOneNotes,
  getWorkout,
} from "../controllers/fetch.controller.js";

const fetchRouter = express.Router();

fetchRouter.get("/fetch-calories", authMiddleware, getFood);
fetchRouter.get("/fetch-activity", authMiddleware, getActivity);
fetchRouter.get("/fetch-notes", authMiddleware, getNotes);
fetchRouter.get("/fetch-oneNotes", authMiddleware, getOneNotes);
fetchRouter.get("/fetch-workout", authMiddleware, getWorkout);

export default fetchRouter;
