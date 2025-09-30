const mongoose = require("mongoose");
const LearnmapCategory = require("./src/models/LearnmapCategory");
require("dotenv").config()

const categories = [
  { category: "Technology" },
  { category: "Science" },
  { category: "Design" },
  { category: "Business" },
  { category: "Social Sciences" },
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

    await LearnmapCategory.deleteMany({})
    await LearnmapCategory.insertMany(categories)

    console.log("Seed completed: categories inserted.")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seed()