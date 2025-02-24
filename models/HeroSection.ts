import mongoose from "mongoose"

const HeroSectionSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
})

export default mongoose.models.HeroSection || mongoose.model("HeroSection", HeroSectionSchema)

