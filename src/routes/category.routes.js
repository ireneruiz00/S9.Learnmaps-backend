const express = require("express")
const { getCategories } = require("../controllers/roadmap.controller")

const router = express.Router()

router.get("/", getCategories)

module.exports = router