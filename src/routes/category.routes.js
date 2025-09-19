const express = require("express")
const ctrl = require("../controllers/category.controller")


const router = express.Router()

router.get("/", ctrl.getCategories)

module.exports = router