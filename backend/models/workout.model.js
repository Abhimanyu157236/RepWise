import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    exerciseName: {
      type: String,
      required: true,
    },
    set: {
      type: Number,
      required: true,
    },
    rep: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    exercises: [exerciseSchema],
  },
  { timestamps: true },
);

export const Workout = mongoose.model("Workout", workoutSchema);
