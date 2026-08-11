import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";
import { signToken } from "../utils/token.js";

const router = express.Router();

const authResponse = (user) => ({
  user: user.toJSON(),
  token: signToken(user)
});

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, phone = "", address = "", city = "" } = req.body;
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const user = await User.create({ fullName, email, password, phone, address, city });
    res.status(201).json(authResponse(user));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  res.json(authResponse(user));
});

router.get("/me", protect, (req, res) => {
  res.json({ user: req.user.toJSON() });
});

router.put("/me", protect, async (req, res) => {
  const allowed = ["fullName", "phone", "address", "city"];
  allowed.forEach((key) => {
    if (req.body[key] !== undefined) req.user[key] = req.body[key];
  });
  await req.user.save();
  res.json({ user: req.user.toJSON() });
});

export default router;
