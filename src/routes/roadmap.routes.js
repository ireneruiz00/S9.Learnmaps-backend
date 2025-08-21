const express = require("express")
const router = express.Router()
const verifyToken = require("../middleware/verifyToken.js");

const ctrl = require("../controllers/roadmap.controller")

router.get("/", verifyToken, ctrl.getAllRoadmaps) 
router.get("/:id", verifyToken, ctrl.getRoadmapById)
router.post("/", verifyToken, ctrl.createRoadmap) 
router.put("/:id", verifyToken,  ctrl.updateRoadmap) 
router.delete("/:id", verifyToken, ctrl.deleteRoadmap) 

module.exports = router