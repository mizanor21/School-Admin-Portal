import mongoose from "mongoose";

const guardianSchema = new mongoose.Schema({
  fName: { type: String, },
  mName: { type: String, }
});

const academicHistorySchema = new mongoose.Schema({
  session: { type: String, },
  class: { type: String, },
  roll: { type: Number, },
  result: { type: String, }
});

const studentSchema = new mongoose.Schema({
  name: { type: String, },
  name_bn:{ type: String, },
  phone: { type: String, },
  photo:{type: String, },
  gender: { type: String, },
  dateOfBirth: { type: Date, },
  birthCertificate: { type: String, },
  guardian: { type: guardianSchema, },
  status: { type: String, enum: ["active", "inactive", "new-admission"], default: "active" },
  academicHistory: { type: [academicHistorySchema], default: [] },
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;