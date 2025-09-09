const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.js")
const ctrl = require("../controllers/roadmap.controller")

// --- Lectura ---
router.get("/public", ctrl.getPublicRoadmaps)
router.get("/my", auth, ctrl.getMyRoadmaps)
router.get("/saved", auth, ctrl.getSavedRoadmaps)
router.get("/search", ctrl.searchRoadmaps)
router.get("/:id", auth, ctrl.getRoadmapById)

// --- Creación y copia ---
router.post("/", auth, ctrl.createRoadmap)
router.post("/:id/copy", auth, ctrl.copyRoadmap)

// --- Guardados ---
router.post("/:id/save", auth, ctrl.saveRoadmap)
router.delete("/:id/save", auth, ctrl.unsaveRoadmap)

// --- Edición y borrado ---
router.put("/:id", auth, ctrl.updateRoadmap)
router.delete("/:id", auth, ctrl.deleteRoadmap)

module.exports = router