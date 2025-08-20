const mongoose = require('mongoose')

const roadmapSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: String,
    diagram: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RoadmapTags', required: true }],
    durationWeeks: Number,
    status: { type: String, enum: ["activo", "completado"], required: true },
    createdAt: {type: Date, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
})

module.exports = mongoose.model('Roadmap', roadmapSchema)
