const User = require("../models/User.js");

const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findOne({ firebaseUID: req.user.uid }).populate('savedLearnmaps')
 if (!user) {
      // si no existe, lo creamos automáticamente
      user = await User.create({
        firebaseUID: req.user.uid,
        firstName: "",
        lastName: "",
        photoUrl: "",
        bio: ""
      })
    }    
    
    // 🔥 Combina datos de MongoDB con Firebase
    const userWithEmail = {
      ...user.toObject(),
      email: req.user.email // Email viene de Firebase
    }

    res.status(200).json(userWithEmail)
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" })
  }
}

const createUser = async (req, res) => {
  try {
    // buscamos si ya existe el usuario por firebaseUID
    const existingUser = await User.findOne({ firebaseUID: req.user.uid })
    if (existingUser) {
      return res.status(200).json(existingUser)  // mejor 200 que 201
    }

    // creamos el usuario con los datos del body
    const newUser = new User({
      firebaseUID: req.user.uid,
      firstName: req.body.firstName || "",
      lastName: req.body.lastName || "",
      photoUrl: req.body.photoUrl || "",
      username: req.body.username || "", // opcional
      bio: req.body.bio || ""            // opcional
    })

    await newUser.save()
    return res.status(201).json(newUser)
  } catch (error) {
    console.error("❌ Error creando usuario:", error.message)
    return res.status(500).json({ error: "Error creating user" })
  }
}

const updateProfile = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { firebaseUID: req.user.uid },
      { username: req.body.username, 
        bio: req.body.bio, 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        photoUrl: req.body.photoUrl, 
      },
      { new: true }
    )
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: "Error updating profile" })
  }
}


module.exports = { getCurrentUser, updateProfile, createUser }