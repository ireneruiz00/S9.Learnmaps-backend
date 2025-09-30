const LearnmapCategory = require("../models/LearnmapCategory")

const getCategories = async (req, res) => {
  try {
    const categories = await LearnmapCategory.find()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" })
  }
}

module.exports = { getCategories }