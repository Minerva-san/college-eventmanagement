import EventCard from "../components/eventcard";
import events from "../data/event";

function Cultural() {
  const cultEvents = events.filter(
    (event) => event.category === "Cultural"
  );

  return (
    <main className="events-page">
      <div className="events-heading">
        <p className="section-label">XACTITUDE 2026</p>
        <h1>Cultural Events</h1>
        <p>
          Explore technology, coding and innovation events.
        </p>
      </div>

      <div className="events-grid">
        {cultEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </main>
  );
}

export default Cultural;