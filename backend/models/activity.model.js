import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    water: {
      type: Number,
      required: true,
    },
    steps: {
      type: Number,
      required: true,
      unique: true,
    },
    sleep: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const Activity = mongoose.model("Activity", activitySchema);
