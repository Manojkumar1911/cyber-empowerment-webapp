import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel, { User } from "../models/User";

import { validation } from "../utils/validation";

const router = Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!validation.isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!validation.isStrongPassword(password)) {
      return res.status(400).json({ error: "Weak password" });
    }

    const userModel = new UserModel();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ email, password: hashedPassword, name });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    const userModel = new UserModel();
    const user = await userModel.findByEmail(email);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });
    res.json({ user, token });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Update Password
router.post("/password/update", async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!validation.isStrongPassword(newPassword)) {
      return res.status(400).json({ error: "New password does not meet requirements" });
    }

    const userModel = new UserModel();
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect old password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userModel.update(userId, { password: hashedPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update failed:", error);
    res.status(400).json({ error: "Password update failed" });
  }
});

export default router;