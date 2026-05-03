import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Access denied" });
  }

  const token = header.split(" ")[1];

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.UserId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};
