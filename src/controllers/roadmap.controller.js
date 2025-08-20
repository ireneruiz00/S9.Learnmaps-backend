const Roadmap = require('../models/Roadmap')

const getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find()
    res.status(200).json(roadmaps)
  } catch (error) {
    res.status(500).json({ error: "Error getting the roadmaps" })
  }
}

const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id)
    if (!roadmap) return res.status(404).json({ error: "Roadmap not found" })
    res.status(200).json(roadmap)
  } catch (error) {
    res.status(500).json({ error: "Error getting the roadmap" })
  }
}

const createRoadmap = async (req, res) => {
  try {
    const newRoadmap = new Roadmap(req.body)
    await newRoadmap.save()
    res.status(201).json(newRoadmap)
  } catch (error) {
    res.status(400).json({ error: "Error creating roadmap" })
  }
}

const updateRoadmap = async (req, res) => {
  try {
    const updated = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: "Roadmap not found" })
    res.status(200).json(updated)
  } catch (error) {
    res.status(400).json({ error: "Error updating roadmap" })
  }
}

const deleteRoadmap = async (req, res) => {
  try {
    const deleted = await Roadmap.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Roadmap not found" })
    res.status(200).json({ message: "Roadmap deleted" })
  } catch (error) {
    res.status(500).json({ error: "Error deleting roadmap" })
  }
}

module.exports = {
  getAllRoadmaps,
  getRoadmapById,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,
}