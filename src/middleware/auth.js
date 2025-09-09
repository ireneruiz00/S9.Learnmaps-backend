const admin = require('../config/firebase')        // Asegúrate de que esta ruta es correcta
const User = require("../models/User")       // Importa el modelo para buscar/crear el usuario

async function auth(req, res, next) {
  // Lee el token del header Authorization: "Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "No token provided" })

  try {
    // Verifica el token con Firebase Admin SDK -> obtienes el UID y otros claims
    const decoded = await admin.auth().verifyIdToken(token)

    // Busca (o crea) el usuario en tu DB por firebaseUID
    let user = await User.findOne({ firebaseUID: decoded.uid })
    if (!user) {
      user = await User.create({
        firebaseUID: decoded.uid,
        username: "", // opcional
        bio: ""       // opcional
      })
    }

    // Inyecta ambos identificadores en la request:
    req.user = {
      uid: decoded.uid,                  // UID de Firebase (string)
      email: decoded.email || null,      // Email del token si existe
      mongoId: user._id.toString()       // _id del User (ObjectId -> string)
    }

    next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

module.exports = auth