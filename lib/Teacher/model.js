import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  teacherId: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  dateOfBirth: { type: Date },
  phone: { type: String },
  email: { type: String },
  subject: { type: String },
  address: { type: String },
  joiningDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;