const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true },  // UID de Firebase
  email: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  savedRoadmaps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" }]
})

module.exports = mongoose.model('User', userSchema)