import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    venue: {
      type: String,
      required: true
    },

    capacity: {
      type: Number,
      required: true
    },

    registeredCount: {
      type: Number,
      default: 0
    },

    registrationType: {
      type: String,
      enum: ["Individual", "Team", "Both"],
      default: "Both"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Event", eventSchema);