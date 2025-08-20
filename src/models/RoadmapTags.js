const mongoose = require('mongoose')

const roadmapTagSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    category: {type: String, required: true}
})

module.exports = mongoose.model('RoadmapTags', roadmapTagSchema)