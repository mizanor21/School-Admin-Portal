import mongoose from "mongoose";

const guardianSchema = new mongoose.Schema({
  name: { type: String, },
  phone: { type: String, }
});

const academicHistorySchema = new mongoose.Schema({
  session: { type: String, },
  class: { type: String, },
  roll: { type: Number, },
  result: { type: String, }
});

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  name: { type: String, },
  phone: { type: String, },
  photo:{type: String, },
  gender: { type: String, },
  dateOfBirth: { type: Date, },
  guardian: { type: guardianSchema, },
  academicHistory: { type: [academicHistorySchema], default: [] },
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;