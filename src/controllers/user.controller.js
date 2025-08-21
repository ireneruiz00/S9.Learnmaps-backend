const User = require("../models/User.js");

const loginUser = async (req, res) => {
  try {
    const { uid, email } = req.user; // viene del verifyToken
    // Buscar usuario en tu DB
    let user = await User.findOne({ firebaseUID: uid });
    if (!user) {
      // Si no existe, crearlo
      user = await User.create({ firebaseUID: uid, email });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error processing login" });
  }
}

module.exports = {
  loginUser
}