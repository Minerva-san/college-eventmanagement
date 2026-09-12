import { useParams, Link } from "react-router-dom";
import events from "../data/event";

function EventDetails() {
  const { id } = useParams();

  const event = events.find((event) => event.id === id);

  // If event does not exist
  if (!event) {
    return (
      <main className="event-not-found">
        <h1>Event Not Found</h1>
        <p>The event you're looking for does not exist.</p>

        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="event-details-page">
      <div className="event-details-container">

        {/* Back */}
        <Link to={`/${event.category.toLowerCase()}`} className="back-link">
          ← Back to {event.category}
        </Link>

        {/* Event Image */}
        <div className="event-details-image">
          <img src={event.image} alt={event.name} />
        </div>

        {/* Event Information */}
        <div className="event-details-content">

          <div className="event-details-header">
            <div>
              <p className="section-label">
                {event.subcategory}
              </p>

              <h1>{event.name}</h1>

              {event.subtitle && (
                <p className="event-details-subtitle">
                  {event.subtitle}
                </p>
              )}
            </div>

            <span className="event-category-badge">
              {event.category}
            </span>
          </div>

          <p className="event-details-description">
            {event.description}
          </p>

          {/* Event Information */}
          <div className="event-details-info">

            <div className="detail-item">
              <span>DATE</span>
              <strong>{event.date}</strong>
            </div>

            <div className="detail-item">
              <span>TIME</span>
              <strong>{event.time}</strong>
            </div>

            <div className="detail-item">
              <span>VENUE</span>
              <strong>{event.venue}</strong>
            </div>

            <div className="detail-item">
              <span>REGISTRATION</span>
              <strong>{event.registrationType}</strong>
            </div>

          </div>

          {/* Slots */}
          <div className="event-capacity">

            <div className="capacity-header">
              <span>Available Slots</span>

              <strong>
                {event.slotsLeft} / {event.slots}
              </strong>
            </div>

            <div className="capacity-bar">
              <div
                className="capacity-filled"
                style={{
                  width: `${
                    ((event.slots - event.slotsLeft) /
                      event.slots) *
                    100
                  }%`,
                }}
              ></div>
            </div>

          </div>

          {/* Registration */}
          <div className="event-register">

            {event.slotsLeft > 0 ? (
              <Link
                to={`/event/${event.id}/register`}
                className="register-button"
              >
                Register Now →
              </Link>
            ) : (
              <button className="register-button disabled" disabled>
                Registration Full
              </button>
            )}

          </div>

        </div>
      </div>
    </main>
  );
}

export default EventDetails;