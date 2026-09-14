import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [student, setStudent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const savedStudent = localStorage.getItem("student");

    if (savedStudent) {
      setStudent(JSON.parse(savedStudent));
    }
  }, []);

  useEffect(() => {
    if (!student?.x_Id) {
      setLoadingEvents(false);
      return;
    }

    const fetchRegisteredEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/registrations/student/${student.x_Id}`
        );

        const data = await response.json();

        if (response.ok) {
          setRegistrations(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(
          "Failed to fetch registered events:",
          error
        );
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchRegisteredEvents();
  }, [student]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  if (!student) {
    return (
      <main className="profile-page">
        <div className="profile-empty">
          <div className="profile-empty-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
            </svg>
          </div>

          <h1>No Profile Found</h1>

          <p>
            Create a student profile to continue.
          </p>

          <Link
            to="/signup"
            className="profile-primary-button"
          >
            Create Profile
            <span>→</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-container">

        {/* PROFILE HEADER */}

        <div className="profile-top">
          <div className="profile-heading">
            <p className="profile-label">
              STUDENT PROFILE
            </p>

            <h1>{student.name}</h1>

            <p className="profile-subtitle">
              Your XACTITUDE 2026 student profile
            </p>
          </div>

          <div className="profile-avatar">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
            </svg>
          </div>
        </div>


        {/* XACTITUDE ID */}

        <div className="profile-id-card">
          <div className="profile-id-label">
            XACTITUDE ID
          </div>

          <div className="profile-id-value">
            {student.x_Id}
          </div>

          <p>
            Your unique XACTITUDE identification number
          </p>
        </div>


        {/* STUDENT DETAILS */}

        <div className="profile-details">

          <div className="profile-detail">
            <span>Email</span>
            <strong>{student.email}</strong>
          </div>

          <div className="profile-detail">
            <span>Phone</span>
            <strong>{student.phone}</strong>
          </div>

          <div className="profile-detail">
            <span>College ID</span>
            <strong>{student.studentId}</strong>
          </div>

          <div className="profile-detail">
            <span>Course</span>
            <strong>{student.course}</strong>
          </div>

          <div className="profile-detail">
            <span>Year</span>
            <strong>{student.year}</strong>
          </div>

        </div>


        {/* REGISTERED EVENTS */}

        <section className="registered-events">

          <div className="registered-events-heading">
            <div>
              <p className="profile-label">
                MY EVENTS
              </p>

              <h2>Registered Events</h2>
            </div>

            <span className="registered-count">
              {registrations.length}
            </span>
          </div>


          {loadingEvents ? (
            <div className="registered-events-message">
              Loading your events...
            </div>
          ) : registrations.length === 0 ? (
            <div className="registered-events-message">
              <p>You haven't registered for any events yet.</p>

              <Link to="/" className="browse-events-link">
                Explore Events →
              </Link>
            </div>
          ) : (
            <div className="registered-events-list">

              {registrations.map((registration) => (
                <div
                  className="registered-event-card"
                  key={registration.eventId}
                >

                  <div className="registered-event-main">

                    <div className="registered-event-title">
                      <h3>
                        {registration.event?.name ||
                          registration.eventId}
                      </h3>

                      <span>
                        {registration.event?.category}
                      </span>
                    </div>

                    <div className="registered-event-type">
                      {registration.registrationType}
                    </div>

                  </div>


                  {registration.event && (
                    <div className="registered-event-info">

                      <div>
                        <span>DATE</span>
                        <strong>
                          {registration.event.date}
                        </strong>
                      </div>

                      <div>
                        <span>TIME</span>
                        <strong>
                          {registration.event.time}
                        </strong>
                      </div>

                      <div>
                        <span>VENUE</span>
                        <strong>
                          {registration.event.venue}
                        </strong>
                      </div>

                    </div>
                  )}

                </div>
              ))}

            </div>
          )}

        </section>


        {/* ACTIONS */}

        <div className="profile-actions">

          <Link
            to="/"
            className="profile-explore-button"
          >
            Explore Events
            <span>→</span>
          </Link>

          <button
            onClick={handleLogout}
            className="profile-logout-button"
          >
            Logout
          </button>

        </div>

      </div>
    </main>
  );
}

export default Profile;