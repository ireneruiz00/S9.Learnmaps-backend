const express = require( "express")
const router = express.Router()
const ctrl = require("../controllers/user.controller")
const auth = require("../middleware/auth.js")


router.get("/", auth, ctrl.loginUser)

module.exports = router