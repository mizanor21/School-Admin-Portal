import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
});

const noticeSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  date: { type: Date, default: Date.now },
  author: { type: String }, // Optional: could be teacher/admin name
  isPublished: { type: Boolean, default: true },
  documents: [documentSchema], // Array of document objects
  targetClass: [{ type: String }], // Example: ["Class 6", "Class 10"]
});

const Notice = mongoose.models.Notice || mongoose.model("Notice", noticeSchema);

export default Notice;
