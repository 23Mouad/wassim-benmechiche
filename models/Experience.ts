import mongoose from "mongoose"

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  responsibilities: [{ type: String }],
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema)

