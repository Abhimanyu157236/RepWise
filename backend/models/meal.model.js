import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalcal: {
      type: Number,
      required: true,
    },
    totalcarbs: {
      type: Number,
      required: true,
    },
    totalprot: {
      type: Number,
      required: true,
    },
    totalfats: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const Meal = mongoose.model("Meal", mealSchema);
