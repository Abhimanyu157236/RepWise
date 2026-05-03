import express from "express";
const profileRouter = express.Router();
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  fetchDetails,
  saveDetails,
} from "../controllers/profile.controller.js";

profileRouter.post("/profile-router", authMiddleware, saveDetails);
profileRouter.get("/get-profile", authMiddleware, fetchDetails);

export default profileRouter;
