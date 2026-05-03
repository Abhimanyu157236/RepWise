import { Activity } from "../models/activity.model.js";
import { FitNote } from "../models/fitnotes.model.js";
import { Meal } from "../models/meal.model.js";
import { Workout } from "../models/workout.model.js";

export const addfood = async (req, res) => {
  try {
    const { food, totalcal, totalcarbs, totalprot, totalfats, date } = req.body;
    const user = req.UserId;
    const newFood = await new Meal({
      user,
      totalcal,
      totalcarbs,
      totalprot,
      totalfats,
      date,
    });
    await newFood.save();
    res.status(200).json({ message: "Kcal saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error had occured", error: error });
  }
};

export const addActivity = async (req, res) => {
  try {
    const { intake, steps, sleep, date } = req.body;
    const user = req.UserId;
    const newActivity = await new Activity({
      user,
      water: intake,
      steps,
      sleep,
      date,
    });
    await newActivity.save();
    res.status(200).json({ message: "activity saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error had occured", error: error });
  }
};

export const addNotes = async (req, res) => {
  try {
    const user = req.UserId;
    const { title, content, id, date } = req.body;
    const newNote = await new FitNote({ user, title, content, id, date });
    await newNote.save();
    res.status(200).json({ message: "notes saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error had occured", error: error });
  }
};

export const addWorkout = async (req, res) => {
  try {
    const user = req.UserId;
    const { workout, date } = req.body;
    const newWorkout = await new Workout({ user, date, exercises: workout });
    await newWorkout.save();
    res.status(200).json({ message: "workout saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error had occured", error: error });
  }
};
