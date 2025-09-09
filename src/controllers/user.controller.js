const User = require("../models/User.js");

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUID: req.user.uid }).populate('savedRoadmaps')
    if (!user) return res.status(404).json({ error: "User not found" })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" })
  }
}

const updateProfile = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { firebaseUID: req.user.uid },
      { username: req.body.username, 
        bio: req.body.bio, 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        photoUrl: req.body.photoUrl, 
      },
      { new: true }
    )
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: "Error updating profile" })
  }
}


module.exports = { getCurrentUser, updateProfile }