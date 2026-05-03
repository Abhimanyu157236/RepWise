import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const user = await new User({ name, email, password: hash });
        await user.save();
        res
          .status(201)
          .json({ message: "User created successfully", user: user });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
     return res.status(404).json({ message: "Something went wrong" });
    }
    bcrypt.compare(password, existingUser.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { id: existingUser._id },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );
        res.status(200).json({
          name: existingUser.name,
          token: token,
          message: "login Successfull,Redirecting to dashboard...",
        });
      } else {
        return res.status(404).json({ message: "Something Went wrong" });
      }
    });
  }catch (error) {
  res.status(500).json({
    message: error.message || "Server error"
  });
}
});

export default router;
