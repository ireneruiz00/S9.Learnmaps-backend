const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.js")
const ctrl = require("../controllers/learnmap.controller")

// --- Lectura ---
router.get("/public", ctrl.getPublicLearnmaps)
router.get("/my", auth, ctrl.getMyLearnmaps)
router.get("/saved", auth, ctrl.getSavedLearnmaps)
router.get("/search", ctrl.searchLearnmaps)
router.get("/:id", auth, ctrl.getLearnmapById)

// --- Creación y copia ---
router.post("/", auth, ctrl.createLearnmap)
router.post("/:id/copy", auth, ctrl.copyLearnmap)

// --- Guardados ---
router.post("/:id/save", auth, ctrl.saveLearnmap)
router.delete("/:id/save", auth, ctrl.unsaveLearnmap)

// --- Edición y borrado ---
router.patch("/:id", auth, ctrl.patchLearnmap)
router.put("/:id", auth, ctrl.updateLearnmap)
router.delete("/:id", auth, ctrl.deleteLearnmap)

module.exports = router