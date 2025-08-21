const express = require( "express")
const router = express.Router()
const ctrl = require("../controllers/user.controller")
const verifyToken = require("../middleware/verifyToken.js")


router.get("/", verifyToken, ctrl.loginUser)

module.exports = router