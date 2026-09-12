import { Link } from "react-router-dom";

const eventTypes = [
	{ name: "Technical", path: "/tech" },
	{ name: "Cultural", path: "/cultural" },
	{ name: "Workshops", path: "/workshops" },
	{ name: "Competitions", path: "/competitions" },
	{ name: "Seminars", path: "/seminars" },
];

function EventTypes() {
	return (
		<section className="event-types">
      <div className="event-types-heading">
        <p className="section-label">EXPLORE</p>

        <h2>Find Your Event</h2>

        <p>
          Explore events by category and find something that interests you.
        </p>
      </div>

      <div className="event-types-grid">
        {eventTypes.map((type) => (
          <Link
            to={type.path}
            className="event-type-card"
            key={type.name}
          >
            <div className="event-type-arrow">↗</div>

            <h3>{type.name}</h3>

            <p>{type.description}</p>
          </Link>
        ))}
      </div>
    </section>
	);
}

export default EventTypes;
