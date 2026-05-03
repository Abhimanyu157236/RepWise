import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
      required: true,
    },
    goal: {
      type: String,
      enum: [
        "Maintain weight",
        "Mild weight loss",
        "Weight loss",
        "Extreme weight loss",
        "Mild weight gain",
        "Weight gain",
        "Extreme weight gain",
      ],
      default: "Maintain weight",
      required: true,
    },
     maintainance : {
        type : Number,
        required :true
      }
  },
  { timestamps: true },
);

export const Profile = mongoose.model("Profile", profileSchema);
