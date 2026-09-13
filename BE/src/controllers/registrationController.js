import Registration from "../models/Registration.js";
import Student from "../models/Student.js";
import Event from "../models/Event.js";

export const registerForEvent = async (req, res) => {
  try {
    const { x_id, eventId, registrationType } = req.body;

    const student = await Student.findOne({ x_id });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // Check event
    const event = await Event.findOne({ eventId });

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    // Check registration type
    if (
      event.registrationType !== "Both" &&
      event.registrationType !== registrationType
    ) {
      return res.status(400).json({
        message: `This event does not allow ${registrationType} registration`
      });
    }

    // Check capacity
    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({
        message: "Event registration is full"
      });
    }

    // Check duplicate registration
    const existingRegistration =
      await Registration.findOne({
        x_id,
        eventId
      });

    if (existingRegistration) {
      return res.status(400).json({
        message: "Student is already registered for this event"
      });
    }

    // Create registration
    const registration = await Registration.create({
      x_id,
      eventId,
      registrationType
    });

    // Increase registered count
    event.registeredCount += 1;
    await event.save();

    res.status(201).json({
      message: "Event registration successful",
      registration
    });

  } catch (error) {
    res.status(500).json({
      message: "Event registration failed",
      error: error.message
    });
  }
};
export const getStudentRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      x_id: req.params.x_id,
    });

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch registrations",
      error: error.message,
    });
  }
};