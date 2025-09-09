const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true }, // UID de Firebaseç
  firstName: String,
  lastName: String,
  photoUrl: String,
  username: String,
  bio: String,
  createdAt: { type: Date, default: Date.now },
  savedRoadmaps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" }]

})

module.exports = mongoose.model("User", userSchema)