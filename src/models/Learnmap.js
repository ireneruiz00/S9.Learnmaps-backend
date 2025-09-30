const mongoose = require('mongoose')

const nodeSchema = new mongoose.Schema({
  id: { type: String, required: true }, // mismo id que en frontend XYFlow
  type: { type: String, default: "default" }, // tipo de nodo (custom, input, output...)
  data: { type: Object, default: {} }, // lo que guardas en ReactFlow.data
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
})

const edgeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  sourceHandle: { type: String },
  targetHandle: { type: String },
  type: { type: String, default: "default" }, // straight, smoothstep, etc.
  animated: { type: Boolean, default: false },
})

const learnmapSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearnmapCategory",
      required: true,
    },
    description: String,
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
    nodes: [nodeSchema],
    edges: [edgeSchema],

    // Opcional: etiquetas extra
    tags: { type: [String], default: [] },

    durationWeeks: Number,
    status: { 
      type: String, 
      enum: ["active", "completed"], 
      required: true 
    },

    createdAt: { type: Date, default: Date.now },
    lastEditedAt: { type: Date, default: Date.now },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    savedBy: [{ type: String }], // IDs de usuarios que guardan el learnmap
  },
  { minimize: false } // evita que mongoose limpie objetos vacíos
)

module.exports = mongoose.model("Learnmap", learnmapSchema)
