import { Profile } from "../models/profile.model.js";

export const saveDetails = async (req, res) => {
  try {
    const user = req.UserId;
    const { name, age, height, weight, gender, goal, tdee } = req.body;
    const newUser = await new Profile({
      user,
      name,
      age,
      height,
      weight,
      gender,
      goal,
      maintainance: tdee,
    });
    await newUser.save();
    res.status(200).json({ message: "user's detail saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error had occured", error: error });
  }
};

export const fetchDetails = async (req, res) => {
  try {
    const user = req.UserId;
    const existingUser = await Profile.findOne({ user });
    if (!existingUser) {
      res.status(404).json({ message: "user detail no found" });
    };
    res
      .status(200)
      .json({
        message: "user's detail saved successfully",
        existingUser: existingUser,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error had occured", error: error });
  }
};
