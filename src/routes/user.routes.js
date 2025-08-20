const express = require( "express")
const router = express.Router()
// import { verifyToken } from "../middleware/verifyToken.js"
const ctrl = require("../controllers/user.controller")

router.get("/", ctrl.loginUser)

module.exports = router