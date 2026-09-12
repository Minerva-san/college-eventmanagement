import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import events from "../data/event";

function Registration() {
  const { id } = useParams();

  const event = events.find((event) => event.id === id);

  const [registrationType, setRegistrationType] = useState("");
  const [registered, setRegistered] = useState(false);

  // -------------------------
  // EVENT NOT FOUND
  // -------------------------

  if (!event) {
    return (
      <main className="registration-page">
        <div className="registration-message">
          <h1>Event Not Found</h1>

          <Link to="/" className="registration-button">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // -------------------------
  // CHECK SIGN-IN
  // -------------------------

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return (
      <main className="registration-page">
        <div className="registration-message">

          <p className="section-label">
            EVENT REGISTRATION
          </p>

          <h1>Sign In Required</h1>

          <p>
            You must sign in to your student profile
            before registering for an event.
          </p>

          <Link
            to="/signin"
            className="registration-button"
          >
            Sign In →
          </Link>

        </div>
      </main>
    );
  }

  // -------------------------
  // GET SIGNED-IN STUDENT
  // -------------------------

  const studentData = localStorage.getItem("student");

  if (!studentData) {
    return (
      <main className="registration-page">
        <div className="registration-message">

          <p className="section-label">
            EVENT REGISTRATION
          </p>

          <h1>Profile Not Found</h1>

          <p>
            Your student profile could not be found.
            Please create a profile first.
          </p>

          <Link
            to="/signup"
            className="registration-button"
          >
            Create Profile →
          </Link>

        </div>
      </main>
    );
  }

  const student = JSON.parse(studentData);

  // -------------------------
  // HANDLE REGISTRATION
  // -------------------------

  const handleRegistration = async () => {
  if (!registrationType) {
    alert("Please select a registration type.");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/api/registrations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: student.xactitudeId,
          eventId: event.id,
          registrationType: registrationType,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Registration failed.");
      return;
    }

    console.log("Registration successful:", data);

    setRegistered(true);

  } catch (error) {
    console.error("Registration error:", error);

    alert(
      "Unable to connect to the server. Make sure the backend is running."
    );
  }
};

  // -------------------------
  // SUCCESS
  // -------------------------

  if (registered) {
    return (
      <main className="registration-page">

        <div className="registration-success">

          <p className="section-label">
            REGISTRATION CONFIRMED
          </p>

          <h1>You're Registered!</h1>

          <p>
            Your registration for{" "}
            <strong>{event.name}</strong> has been
            recorded successfully.
          </p>

          <div className="registration-summary">

            <div>
              <span>Student</span>
              <strong>{student.name}</strong>
            </div>

            <div>
              <span>XACTITUDE ID</span>
              <strong>
                {student.xactitudeId}
              </strong>
            </div>

            <div>
              <span>Event</span>
              <strong>{event.name}</strong>
            </div>

            <div>
              <span>Date</span>
              <strong>{event.date}</strong>
            </div>

            <div>
              <span>Time</span>
              <strong>{event.time}</strong>
            </div>

            <div>
              <span>Venue</span>
              <strong>{event.venue}</strong>
            </div>

            <div>
              <span>Registration</span>
              <strong>{registrationType}</strong>
            </div>

          </div>

          <div className="registration-actions">

            <Link
              to="/profile"
              className="registration-button"
            >
              View Profile →
            </Link>

            <Link
              to="/"
              className="secondary-button"
            >
              Explore More Events
            </Link>

          </div>

        </div>

      </main>
    );
  }

  // -------------------------
  // REGISTRATION PAGE
  // -------------------------

  return (
    <main className="registration-page">

      <div className="registration-container">

        <Link
          to={`/event/${event.id}`}
          className="back-link"
        >
          ← Back to Event
        </Link>

        <div className="registration-header">

          <p className="section-label">
            EVENT REGISTRATION
          </p>

          <h1>{event.name}</h1>

          {event.subtitle && (
            <p className="registration-subtitle">
              {event.subtitle}
            </p>
          )}

        </div>

        {/* EVENT INFORMATION */}

        <div className="registration-event-info">

          <div>
            <span>DATE</span>
            <strong>{event.date}</strong>
          </div>

          <div>
            <span>TIME</span>
            <strong>{event.time}</strong>
          </div>

          <div>
            <span>VENUE</span>
            <strong>{event.venue}</strong>
          </div>

          <div>
            <span>SLOTS</span>
            <strong>
              {event.slotsLeft} / {event.slots}
            </strong>
          </div>

        </div>

        {/* STUDENT INFORMATION */}

        <section className="registration-section">

          <p className="section-label">
            REGISTERING STUDENT
          </p>

          <div className="student-registration-info">

            <div>
              <span>Name</span>
              <strong>{student.name}</strong>
            </div>

            <div>
              <span>XACTITUDE ID</span>
              <strong>
                {student.xactitudeId}
              </strong>
            </div>

          </div>

        </section>

        {/* REGISTRATION TYPE */}

        <section className="registration-section">

          <p className="section-label">
            REGISTRATION TYPE
          </p>

          <div className="registration-options">

            <button
              type="button"
              className={
                registrationType === "Individual"
                  ? "registration-option active"
                  : "registration-option"
              }
              onClick={() =>
                setRegistrationType("Individual")
              }
            >
              <strong>Individual</strong>

              <span>
                Register yourself for this event.
              </span>
            </button>

            <button
              type="button"
              className={
                registrationType === "Team"
                  ? "registration-option active"
                  : "registration-option"
              }
              onClick={() =>
                setRegistrationType("Team")
              }
            >
              <strong>Team</strong>

              <span>
                Register as a team leader.
              </span>
            </button>

          </div>

        </section>

        {/* REGISTRATION ACTION */}

        {registrationType === "Team" ? (
        <Link
            to={`/event/${event.id}/team`}
            className="confirm-registration-button"
        >
            Continue to Team Registration →
        </Link>
        ) }

        {/* CONFIRM */}

        <button
          type="button"
          className="confirm-registration-button"
          onClick={handleRegistration}
          disabled={event.slotsLeft <= 0}
        >
          {event.slotsLeft > 0
            ? "Confirm Registration →"
            : "Registration Full"}
        </button>

      </div>

    </main>
  );
}

export default Registration;