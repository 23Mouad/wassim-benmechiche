import mongoose from "mongoose"

const AnnouncementSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Announcement || mongoose.model("Announcement", AnnouncementSchema)

