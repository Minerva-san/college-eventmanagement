import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className="event-card-image">
        <img src={event.image} alt={event.name} />
        
        <span className="event-category">
          {event.category}
        </span>
      </div>

      <div className="event-card-content">
        <h3>{event.name}</h3>

        {event.subtitle && (
        <p className="event-subtitle">
            {event.subtitle}
        </p>
        )}

        <p>{event.description}</p>

        <div className="event-info">
          <span>🕒 {event.time}</span>
          <span>📍 {event.venue}</span>
        </div>

        <div className="event-footer">
          <span className="event-slots">
            {event.slotsLeft} slots left
          </span>

          <Link
            to={`/event/${event.id}`}
            className="event-details-btn"
          >
            View Details ↗
          </Link>
        </div>
      </div>
    </article>
  );
}

export default EventCard;