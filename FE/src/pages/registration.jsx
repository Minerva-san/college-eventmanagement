import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import events from "../data/event";

function Registration() {
  const { id } = useParams();

  const event = events.find((event) => event.id === id);

  const [registrationType, setRegistrationType] = useState("");
  const [registered, setRegistered] = useState(false);
  const [currentSlots, setCurrentSlots] = useState(event.slots);
  const [loadingRegistration, setLoadingRegistration] = useState(true);

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
  const allowsIndividual =
  event.registrationType === "Individual" ||
  event.registrationType === "Both";

const allowsTeam =
  event.registrationType === "Team" ||
  event.registrationType === "Both";
  // -------------------------
  // CHECK EXISTING REGISTRATION
  // -------------------------
  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/registrations/student/${student.x_Id}`
        );

        const registrations = await response.json();

        if (response.ok) {
          const alreadyRegistered = registrations.some(
            (registration) =>
              registration.eventId === event.id
          );

          setRegistered(alreadyRegistered);
        }
      } catch (error) {
        console.error(
          "Failed to check registration:",
          error
        );
      } finally {
        setLoadingRegistration(false);
      }
    };

    checkRegistration();
  }, [student.x_Id, event.id]);

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
          x_Id: student.x_Id,
          eventId: event.id,
          registrationType: registrationType,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (
        data.message ===
        "Student is already registered for this event"
      ) {
        setRegistered(true);
      }
      alert(data.message || "Registration failed.");
      return;
    }

    console.log("Registration successful:", data);

    setRegistered(true);
    setCurrentSlots(
      (previous) => Math.max(previous - 1, 0)
    );

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
              <span>COLLEGE ID</span>
              <strong>{student.studentId}</strong>
            </div>
            <div>
              <span>XACTITUDE ID</span>
              <strong>{student.x_Id}</strong>
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
              {Math.max(event.slots - currentSlots, 0)} / {event.slots}
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
              <span>COLLEGE ID</span>
              <strong>{student.studentId}</strong>
            </div>
            <div>
              <span>XACTITUDE ID</span>
              <strong>
                {student.x_Id}
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

            {/* INDIVIDUAL */}
            <button
              type="button"
              disabled={!allowsIndividual}
              className={`registration-option ${
                registrationType === "Individual" ? "active" : ""
              } ${!allowsIndividual ? "disabled" : ""}`}
              onClick={() => {
                if (allowsIndividual) {
                  setRegistrationType("Individual");
                }
              }}
            >
              <strong>Individual</strong>

              <span>
                {allowsIndividual
                  ? "Register yourself for this event."
                  : "Not available for this event."}
              </span>
            </button>


            {/* TEAM */}
            <button
              type="button"
              disabled={!allowsTeam}
              className={`registration-option ${
                registrationType === "Team" ? "active" : ""
              } ${!allowsTeam ? "disabled" : ""}`}
              onClick={() => {
                if (allowsTeam) {
                  setRegistrationType("Team");
                }
              }}
            >
              <strong>Team</strong>

              <span>
                {allowsTeam
                  ? "Register as a team leader."
                  : "Not available for this event."}
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
        ):(
          <button
            type="button"
            className="confirm-registration-button"
            onClick={handleRegistration}
            disabled={!registrationType || event.slotsLeft <= 0}
          >
            {event.slotsLeft > 0
              ? "Confirm Registration →"
              : "Registration Full"}
          </button>
        ) }

      </div>

    </main>
  );
}

export default Registration;