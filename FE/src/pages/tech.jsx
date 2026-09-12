import EventCard from "../components/eventcard";
import events from "../data/event";

function Tech() {
  const techEvents = events.filter(
    (event) => event.category === "Tech"
  );

  return (
    <main className="events-page">
      <div className="events-heading">
        <p className="section-label">XACTITUDE 2026</p>
        <h1>Tech Events</h1>
        <p>
          Explore technology, coding and innovation events.
        </p>
      </div>

      <div className="events-grid">
        {techEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </main>
  );
}

export default Tech;