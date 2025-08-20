import admin from "../config/firebase.js"

export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).send("No token provided")

  const token = authHeader.split(" ")[1]

  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    req.user = decodedToken // Contiene UID y email del usuario
    next()
  } catch (err) {
    console.error(err)
    res.status(401).send("Invalid token")
  }
}