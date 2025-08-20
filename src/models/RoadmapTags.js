const mongoose = require('mongoose')

const roadmapSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    category: {type: String, required: true}
})

module.exports = mongoose.model('RoadmapTags', roadmapSchema)