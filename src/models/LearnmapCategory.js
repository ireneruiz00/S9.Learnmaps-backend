const mongoose = require('mongoose')

const learnmapCategorySchema = new mongoose.Schema({
    category: {type: String, required: true, unique: true}
})

module.exports = mongoose.model('LearnmapCategory', learnmapCategorySchema)