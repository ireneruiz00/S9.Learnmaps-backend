import User from "../models/User.js";

export async function getProfile(req, res) {
  const user = await User.findOne({ uid: req.user.uid })
  res.json({ email: user.email, role: user.role })
}

export async function adminOnlyRoute(req, res) {
  const user = await User.findOne({ uid: req.user.uid })
  if (user.role !== "admin") {
    return res.status(403).send("Access denied")
  }
  res.send("Welcome, admin!")
}