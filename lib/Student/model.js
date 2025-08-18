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

const attendanceSchema = new mongoose.Schema({
  session: { type: String, },
  presentDays: { type: Number, },
  absentDays: { type: Number, }
});

const feeSchema = new mongoose.Schema({
  session: { type: String, },
  totalFee: { type: Number, },
  paid: { type: Number, },
  due: { type: Number, }
});

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  name: { type: String, },
  gender: { type: String, },
  dateOfBirth: { type: Date, },
  guardian: { type: guardianSchema, },
  academicHistory: { type: [academicHistorySchema], default: [] },
  attendance: { type: [attendanceSchema], default: [] },
  fees: { type: [feeSchema], default: [] }
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model("Students", studentSchema);

export default Student;