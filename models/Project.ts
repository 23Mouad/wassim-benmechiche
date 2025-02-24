import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [
    {
      path: { type: String, required: true },
      isPrimary: { type: Boolean, default: false },
    },
  ],
  github: { type: String },
  playstore: { type: String },
  tags: [{ type: String }],
  backgroundColor: { type: String, default: "#f5f5f5" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)

