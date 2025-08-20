const express = require("express")
const router = express.Router()
const ctrl = require("../controllers/roadmap.controller")

router.get("/", ctrl.getAllRoadmaps) 
router.get("/:id", ctrl.getRoadmapById)
router.post("/", ctrl.createRoadmap) 
// router.put("/:id", ctrl.updateRoadmap) 
// router.delete("/:id", ctrl.deleteRoadmap) 

module.exports = router