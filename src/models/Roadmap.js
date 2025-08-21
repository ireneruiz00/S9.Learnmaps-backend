const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
  title: { type: String, required: true },
  color: { type: String, default: "#A0AEC0" },
  order: { type: Number, default: 0 },
  content: String,
  status: { type: String, enum: ['checked', 'unchecked'], default: 'unchecked'},
  children: [this] // soporte para anidación infinita
}) 

const roadmapSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'RoadmapCategory', required: true },
    description: String,
    visibility: { type: String, enum: ["public", "private"], default: "private" },
    tags: [tagSchema],
    durationWeeks: Number,
    status: { type: String, enum: ["active", "completed"], required: true },
    createdAt: {type: Date, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
})

module.exports = mongoose.model('Roadmap', roadmapSchema)



// flowchart LR
//    a1 --- a3 & a4 & a5 -- a6
//    a2

//mindmaps anidados