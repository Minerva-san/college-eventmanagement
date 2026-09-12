import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true
    },

    eventId: {
      type: String,
      required: true
    },

    registrationType: {
      type: String,
      enum: ["Individual", "Team"],
      required: true
    },

    registrationDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

registrationSchema.index(
  { studentId: 1, eventId: 1 },
  { unique: true }
);

export default mongoose.model("Registration", registrationSchema);