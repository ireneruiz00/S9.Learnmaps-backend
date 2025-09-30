const Learnmap = require('../models/Learnmap')
const LearnmapCategory = require('../models/LearnmapCategory')
const User = require('../models/User')

const getLearnmapById = async (req, res) => {
  try {
    const learnmap = await Learnmap.findById(req.params.id)
      .populate("user", "_id firstName lastName username")
      .populate("category")

    if (!learnmap) return res.status(404).json({ error: "Learnmap not found" })

    if (learnmap.visibility === "private" && learnmap.user._id.toString() !== req.user.mongoId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json(learnmap)
  } catch (error) {
    res.status(500).json({ error: "Error getting the learnmap" })
  }
}

const getPublicLearnmaps = async (req, res) => {
  try {
    const learnmaps = await Learnmap.find({ visibility: "public" })
      .populate("user", "firstName lastName username")
      .populate("category")
    res.status(200).json(learnmaps)
  } catch (error) {
    res.status(500).json({ error: "Error getting the learnmaps" })
  }
}

//uid o mongoId
const getMyLearnmaps = async (req, res) => {
  try {
    const learnmaps = await Learnmap.find({ user: req.user.mongoId })
      .sort({ lastEditedAt: -1 })
      .populate("user", "firstName lastName username")
      .populate('category')

    console.log("Learnmaps found:", JSON.stringify(learnmaps, null, 2))
    res.status(200).json(learnmaps)
  } catch (error) {
    res.status(500).json({ error: "Error getting the learnmaps" })
  }
}

const createLearnmap = async (req, res) => {
  try {
    console.log("📥 Body recibido en backend:", req.body)
    const { title, description, category, visibility, tags, durationWeeks, status } = req.body
    const newLearnmap = new Learnmap({
      title,
      description,
      category,
      visibility,
      tags,
      durationWeeks,
      status,
      user: req.user.mongoId
    })
    await newLearnmap.save()
    res.status(201).json(newLearnmap)
  } catch (error) {
    res.status(400).json({ error: "Error creating learnmap" })
  }
}

const copyLearnmap = async (req, res) => {
  try {
    const learnmap = await Learnmap.findById(req.params.id)
    if (!learnmap) return res.status(404).json({ message: "Not found" })

    if (learnmap.visibility === "private" && learnmap.user.toString() !== req.user.mongoId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    const copy = new Learnmap({
      title: learnmap.title,
      description: learnmap.description,
      category: learnmap.category,
      visibility: "private",
      tags: learnmap.tags,
      durationWeeks: learnmap.durationWeeks,
      status: learnmap.status,
      user: req.user.mongoId
    })

    await copy.save()
    res.status(201).json(copy)
  } catch (error) {
    res.status(400).json({ error: "Error copying learnmap" })
  }
}

const patchLearnmap = async (req, res) => {
  console.log("PATCH body recibido:", req.body); // <-- aquí
  console.log("PATCH params recibidos:", req.params);
  try {
    const update = {
      lastEditedAt: Date.now(),
    };
    if (req.body.nodes) update.nodes = req.body.nodes;
    if (req.body.edges) update.edges = req.body.edges;

    const learnmap = await Learnmap.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );

    if (!learnmap) return res.status(404).json({ error: "Learnmap not found" });

    res.status(200).json(learnmap)
   
  } catch (error) {
    console.error("❌ Error patching learnmap:", error); // <--- agrega esto
    res.status(400).json({ error: error.message })
  }
}

const updateLearnmap = async (req, res) => {
  try {
    const learnmap = await Learnmap.findById(req.params.id)
    
    if (!learnmap) return res.status(404).json({ error: "Learnmap not found" })
    
    // if (learnmap.user.toString() !== req.user.mongoId) {
    //   return res.status(403).json({ message: "Not authorized" });
    // }

    Object.assign(learnmap, req.body, { lastEditedAt: Date.now() })
    await learnmap.save()

    res.status(200).json(learnmap)
  } catch (error) {
    res.status(400).json({ error: "Error updating learnmap" })
  }
}

const deleteLearnmap = async (req, res) => {
  try {
    const learnmap = await Learnmap.findById(req.params.id)
    
    if (!learnmap) return res.status(404).json({ error: "Learnmap not found" })
    
      if (learnmap.user.toString() !== req.user.mongoId) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await learnmap.deleteOne()
    res.status(200).json({ message: "Learnmap deleted" })
  } catch (error) {
    res.status(500).json({ error: "Error deleting learnmap" })
  }
}

const saveLearnmap = async (req, res) => {
  try {
    const learnmap = await Learnmap.findById(req.params.id);
    if (!learnmap) return res.status(404).json({ error: "Learnmap not found" })

    await Learnmap.findByIdAndUpdate(req.params.id, {
      $addToSet: { savedBy: req.user.uid }
    })
    await User.findByIdAndUpdate(req.user.mongoId, {
      $addToSet: { savedLearnmaps: req.params.id }
    })

    res.status(200).json({ message: "Learnmap saved" })
  } catch (error) {
    res.status(500).json({ error: "Error saving learnmap" })
  }
}

const unsaveLearnmap = async (req, res) => {
  try {
    const learnmap = await Learnmap.findById(req.params.id)
    if (!learnmap) return res.status(404).json({ error: "Learnmap not found" })

    await Learnmap.findByIdAndUpdate(req.params.id, {
      $pull: { savedBy: req.user.uid }
    })
    await User.findByIdAndUpdate(req.user.mongoId, {
      $pull: { savedLearnmaps: req.params.id }
    })

    res.status(200).json({ message: "Learnmap unsaved" })
  } catch (error) {
    res.status(500).json({ error: "Error unsaving learnmap" })
  }
}

const getSavedLearnmaps = async (req, res) => {
  try {
    const user = await User.findById(req.user.mongoId).populate("savedLearnmaps")
    res.status(200).json(user.savedLearnmaps)
  } catch (error) {
    res.status(500).json({ error: "Error fetching saved Learnmaps" })
  }
}

const searchLearnmaps = async (req, res) => {
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

    const learnmaps = await Learnmap.find(query)
      .populate("user", "firstName lastName username")
      .populate("category")
      
    res.status(200).json(learnmaps)
  } catch (error) {
    res.status(500).json({ error: "Error searching learnmaps" })
  }
}

module.exports = {
  getLearnmapById,
  getMyLearnmaps,
  getPublicLearnmaps,
  createLearnmap,
  copyLearnmap,
  patchLearnmap,
  updateLearnmap,
  deleteLearnmap,
  saveLearnmap,
  unsaveLearnmap,
  getSavedLearnmaps,
  searchLearnmaps,
}