import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/auth.route.js";
import trackRouter from "./routes/tracking.route.js";
import fetchRouter from "./routes/fetch.route.js";
import profileRouter from "./routes/userprofile.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v2/user/", router);
app.use("/api/v1/track/", trackRouter);
app.use("/api/v1/fetch/", fetchRouter);
app.use("/api/v2/user/", profileRouter)

app.listen(PORT, () => {
  console.log(`server is up at ${PORT}`);
});
