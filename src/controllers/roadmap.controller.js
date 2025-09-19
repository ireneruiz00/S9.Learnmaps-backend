const Roadmap = require('../models/Roadmap')
const RoadmapCategory = require('../models/RoadmapCategory')
const User = require('../models/User')

const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id)
    if (!roadmap) return res.status(404).json({ error: "Roadmap not found" })

    if (roadmap.visibility === "private" && roadmap.user.toString() !== req.user.mongoId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    res.status(200).json(roadmap)
  } catch (error) {
    res.status(500).json({ error: "Error getting the roadmap" })
  }
}

const getPublicRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ visibility: "public" })
    res.status(200).json(roadmaps)
  } catch (error) {
    res.status(500).json({ error: "Error getting the roadmaps" })
  }
}

//uid o mongoId
const getMyRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ user: req.user.mongoId }).sort({ lastEditedAt: -1 })
    res.status(200).json(roadmaps)
  } catch (error) {
    res.status(500).json({ error: "Error getting the roadmaps" })
  }
}

const createRoadmap = async (req, res) => {
  try {
    const { title, description, category, visibility, tags, durationWeeks, status } = req.body
    const newRoadmap = new Roadmap({
      title,
      description,
      category,
      visibility,
      tags,
      durationWeeks,
      status,
      user: req.user.mongoId
    })
    await newRoadmap.save()
    res.status(201).json(newRoadmap)
  } catch (error) {
    res.status(400).json({ error: "Error creating roadmap" })
  }
}

const copyRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id)
    if (!roadmap) return res.status(404).json({ message: "Not found" })

    if (roadmap.visibility === "private" && roadmap.user.toString() !== req.user.mongoId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const copy = new Roadmap({
      title: roadmap.title,
      description: roadmap.description,
      category: roadmap.category,
      visibility: "private",
      tags: roadmap.tags,
      durationWeeks: roadmap.durationWeeks,
      status: roadmap.status,
      user: req.user.mongoId
    })

    await copy.save()
    res.status(201).json(copy)
  } catch (error) {
    res.status(400).json({ error: "Error copying roadmap" })
  }
}

const patchRoadmap = async (req, res) => {
  console.log("PATCH body recibido:", req.body); // <-- aquí
  console.log("PATCH params recibidos:", req.params);
  try {
    const update = {
      lastEditedAt: Date.now(),
    };
    if (req.body.nodes) update.nodes = req.body.nodes;
    if (req.body.edges) update.edges = req.body.edges;

    const roadmap = await Roadmap.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );

    if (!roadmap) return res.status(404).json({ error: "Roadmap not found" });

    res.status(200).json(roadmap)
   
  } catch (error) {
    console.error("❌ Error patching roadmap:", error); // <--- agrega esto
    res.status(400).json({ error: error.message })
  }
}

const updateRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id)
    
    if (!roadmap) return res.status(404).json({ error: "Roadmap not found" })
    
    // if (roadmap.user.toString() !== req.user.mongoId) {
    //   return res.status(403).json({ message: "Not authorized" });
    // }

    Object.assign(roadmap, req.body, { lastEditedAt: Date.now() })
    await roadmap.save()

    res.status(200).json(roadmap)
  } catch (error) {
    res.status(400).json({ error: "Error updating roadmap" })
  }
}

const deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id)
    
    if (!roadmap) return res.status(404).json({ error: "Roadmap not found" })
    
      if (roadmap.user.toString() !== req.user.mongoId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await roadmap.deleteOne()
    res.status(200).json({ message: "Roadmap deleted" })
  } catch (error) {
    res.status(500).json({ error: "Error deleting roadmap" })
  }
}

const saveRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) return res.status(404).json({ error: "Roadmap not found" })

    await Roadmap.findByIdAndUpdate(req.params.id, {
      $addToSet: { savedBy: req.user.uid }
    })
    await User.findByIdAndUpdate(req.user.mongoId, {
      $addToSet: { savedRoadmaps: req.params.id }
    })

    res.status(200).json({ message: "Roadmap saved" })
  } catch (error) {
    res.status(500).json({ error: "Error saving roadmap" })
  }
}

const unsaveRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id)
    if (!roadmap) return res.status(404).json({ error: "Roadmap not found" })

    await Roadmap.findByIdAndUpdate(req.params.id, {
      $pull: { savedBy: req.user.uid }
    })
    await User.findByIdAndUpdate(req.user.mongoId, {
      $pull: { savedRoadmaps: req.params.id }
    })

    res.status(200).json({ message: "Roadmap unsaved" })
  } catch (error) {
    res.status(500).json({ error: "Error unsaving roadmap" })
  }
}

const getSavedRoadmaps = async (req, res) => {
  try {
    const user = await User.findById(req.user.mongoId).populate("savedRoadmaps")
    res.status(200).json(user.savedRoadmaps)
  } catch (error) {
    res.status(500).json({ error: "Error fetching saved roadmaps" })
  }
}

const searchRoadmaps = async (req, res) => {
  try {
    const { q, category, tags } = req.query
    const query = { visibility: "public" }

    if (q) {
      const regex = new RegExp(q, "i") // case-insensitive
      query.$or = [{ title: regex }, { description: regex }]
    }

    if (category) {
      query.category = category // ID de la categoría
    }

    if (tags) {
      const tagArray = tags.split(",")
      query["tags.title"] = { $in: tagArray }
    }

    const roadmaps = await Roadmap.find(query)
    res.status(200).json(roadmaps)
  } catch (error) {
    res.status(500).json({ error: "Error searching roadmaps" })
  }
}

module.exports = {
  getRoadmapById,
  getMyRoadmaps,
  getPublicRoadmaps,
  createRoadmap,
  copyRoadmap,
  patchRoadmap,
  updateRoadmap,
  deleteRoadmap,
  saveRoadmap,
  unsaveRoadmap,
  getSavedRoadmaps,
  searchRoadmaps,
}