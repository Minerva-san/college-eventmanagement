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
    const { x_id } = req.params;

    const registrations = await Registration.find({ x_id });

    const registrationsWithEvents = await Promise.all(
      registrations.map(async (registration) => {
        const event = await Event.findOne({
          eventId: registration.eventId,
        });

        return {
          eventId: registration.eventId,
          registrationType: registration.registrationType,
          registrationDate: registration.registrationDate,

          event: event
            ? {
                eventId: event.eventId,
                name: event.name,
                category: event.category,
                date: event.date,
                time: event.time,
                venue: event.venue,
              }
            : null,
        };
      })
    );

    res.status(200).json(registrationsWithEvents);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch registered events",
      error: error.message,
    });
  }
};