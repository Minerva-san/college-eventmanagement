import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    // College ID / Roll Number
    studentId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // XACTITUDE-generated ID
    x_Id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },
  },
  { timestamps: true}
);

const Student = mongoose.model("Student", studentSchema);

export default Student;