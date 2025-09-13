const mongoose = require("mongoose");
const RoadmapCategory = require("./models/RoadmapCategory");

const categories = [
  { category: "Technology" },
  { category: "Science" },
  { category: "Design" },
  { category: "Business" },
  { category: "Arts & Humanities" },
  { category: "Health & Medicine" },
  { category: "Education" },
  { category: "Personal Development" },
  { category: "Languages" },
  { category: "Other" }
]

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/learnmaps")

    // Evita duplicados borrando antes
    await RoadmapCategory.deleteMany({})
    await RoadmapCategory.insertMany(categories)

    console.log("Seed completado: categorías insertadas.")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seed()