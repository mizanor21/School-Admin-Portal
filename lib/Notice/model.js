import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  date: { type: Date, default: Date.now },
  author: { type: String }, // Optional: could be teacher/admin name
  isPublished: { type: Boolean, default: true },
  targetClass: [{ type: String }], // Example: ["Class 6", "Class 7"]
});

const Notice = mongoose.models.Notice || mongoose.model("Notice", noticeSchema);

export default Notice;
