const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
  optionsSuccessStatus: 200
}))

app.use(express.json()) // para poder leer JSON en las peticiones

// Conectar a la BBDD
const connectDB = require("./src/config/db")
connectDB()

// Rutas
app.use("/api/learnmap", require("./src/routes/roadmap.routes"))
app.use("/api/categories", require("./src/routes/category.routes"))
app.use("/api/user", require("./src/routes/user.routes")) 

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`)
})


