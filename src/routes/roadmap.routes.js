const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.js");

const ctrl = require("../controllers/roadmap.controller")

router.get("/", auth, ctrl.getAllRoadmaps) 
router.get("/:id", auth, ctrl.getRoadmapById)
router.post("/", auth, ctrl.createRoadmap) 
router.put("/:id", auth,  ctrl.updateRoadmap) 
router.delete("/:id", auth, ctrl.deleteRoadmap) 

module.exports = router