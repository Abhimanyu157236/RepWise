import { Activity } from "../models/activity.model.js";
import { FitNote } from "../models/fitnotes.model.js";
import { Meal } from "../models/meal.model.js";
import { Workout } from "../models/workout.model.js";

export const getFood = async (req, res) => {
  try {
    const user = req.UserId;
    const existingFood = await Meal.find({ user });
    if (!existingFood) {
      res.status(404).json({ message: "food data not found" });
    }
    res.status(200).json({
      message: "data fetched successfully",
      existingFood: existingFood,
    });
  } catch (error) {
    res.status(500).json({ message: "An error had occured", error: error });
  }
};

export const getActivity = async (req, res) => {
  try {
    const user = req.UserId;
    const existingActivity = await Activity.find({ user });
    if (!existingActivity) {
      res.status(404).json({ message: "food data not found" });
    }
    res.status(200).json({
      message: "data fetched successfully",
      existingActivity: existingActivity,
    });
  } catch (error) {
    res.status(500).json({ message: "An error had occured", error: error });
  }
};

export const getNotes = async (req, res) => {
  try {
    const user = req.UserId;
    const existingNote = await FitNote.find({ user });
    if (!existingNote) {
      res.status(404).json({ message: "food data not found" });
    }
    res.status(200).json({
      message: "data fetched successfully",
      existingNote: existingNote,
    });
  } catch (error) {
    res.status(500).json({ message: "An error had occured", error: error });
  }
};

export const getWorkout = async (req, res) => {
  try {
    const user = req.UserId;
    const existingWorkout = await Workout.find({ user });
    if (!existingWorkout) {
      res.status(404).json({ message: "workout data not found" });
    }
    res.status(200).json({
      message: "data fetched successfully",
      existingWorkout: existingWorkout,
    });
  } catch (error) {
    res.status(500).json({ message: "An error had occured", error: error });
  }
};
export const getOneNotes = async (req, res) => {
  try {
    const user = req.UserId;
    const existingNote = await FitNote.findOne({ user });
    if (!existingNote) {
      res.status(404).json({ message: "food data not found" });
    }
    res.status(200).json({
      message: "data fetched successfully",
      existingNote: existingNote,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error had occured", error: error });
  }
};
