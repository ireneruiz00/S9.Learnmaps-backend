const express = require( "express")
const router = express.Router()
const { getCurrentUser, updateProfile } = require('../controllers/user.controller')
const verifyFirebaseToken = require("../middleware/auth.js")


router.get('/me', verifyFirebaseToken, getCurrentUser)
router.put('/me', verifyFirebaseToken, updateProfile)

module.exports = router