const admin = require('../config/firebase')        // Asegúrate de que esta ruta es correcta
const User = require("../models/User")       // Importa el modelo para buscar/crear el usuario

async function auth(req, res, next) {
  // Lee el token del header Authorization: "Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    console.error("❌ No token provided en la request")
    return res.status(401).json({ message: "No token provided" })
  }

  try {
    console.log("🔑 Token recibido:", token.slice(0, 20) + "...") // solo mostramos los primeros 20 chars para debug

    const decoded = await admin.auth().verifyIdToken(token)
    console.log("✅ Token verificado:", decoded)

    let user = await User.findOne({ firebaseUID: decoded.uid })

    if (!user) {
      user = await User.create({
        firebaseUID: decoded.uid,
        email: decoded.email,
      })
    }
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      mongoId: user ? user._id.toString() : null,
      existsInDb: !!user 
    }

    console.log("👉 req.user preparado:", req.user)

    next()
  } catch (err) {
    console.error("❌ Error verifying token:", err.message)
    return res.status(401).json({ message: "Invalid token" })
  }
}

module.exports = auth