const express = require( "express")
const router = express.Router()
const { getCurrentUser, updateProfile } = require('../controllers/user.controller')
const auth = require("../middleware/auth.js")


router.get('/me', auth, getCurrentUser)
router.put('/me', auth, updateProfile)

module.exports = router