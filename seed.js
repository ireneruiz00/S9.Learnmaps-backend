const mongoose = require("mongoose");
const RoadmapCategory = require("./src/models/RoadmapCategory");
require("dotenv").config()

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
    await mongoose.connect(process.env.MONGO_URI)

    // Evita duplicados borrando antes
    await RoadmapCategory.deleteMany({})
    await RoadmapCategory.insertMany(categories)

    console.log("Seed completed: categories inserted.")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seed()