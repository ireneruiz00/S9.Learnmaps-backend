const mongoose = require('mongoose')

import User from './User';
import RoadmapCategory from './RoadmapCategory';
import RoadmapTags from './RoadmapTags';

const roadmapSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: { type: RoadmapCategory, required: true },
    description: String,
    diagram: { type: String, required: true },
    tags: { type: [RoadmapTags], required: true },
    durationWeeks: Number,
    status: { type: String, enum: ["activo", "completado"], required: true },
    createdAt: {type: Date, default: Date.now},
    user: {type: User, required: true},
})

module.exports = mongoose.model('Roadmap', roadmapSchema)