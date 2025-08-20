import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import { getProfile, adminOnlyRoute } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/profile", verifyToken, getProfile)
router.get("/admin", verifyToken, adminOnlyRoute)

export default router