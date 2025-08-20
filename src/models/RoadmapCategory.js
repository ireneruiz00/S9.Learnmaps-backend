const mongoose = require('mongoose')

const roadmapSchema = new mongoose.Schema({
    category: {type: String, required: true}
})

module.exports = mongoose.model('RoadmapCategory', roadmapSchema)