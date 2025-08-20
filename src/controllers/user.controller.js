const User = require("../models/User.js");

const loginUser = async (req, res) => {
  try {
    const roadmap = await User.findById(req.params.id)
    if (!roadmap) return res.status(404).json({ error: "User not found" })
    res.status(200).json(roadmap)
  } catch (error) {
    res.status(500).json({ error: "Error getting the User" })
  }
}

module.exports = {
  loginUser
}