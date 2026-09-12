import EventCard from "../components/eventcard";
import events from "../data/event";

function Seminars() {
  const seminarEvents = events.filter(
    (event) => event.category === "Seminar"
  );

  return (
    <main className="events-page">
      <div className="events-heading">
        <p className="section-label">XACTITUDE 2026</p>
        <h1>Seminars</h1>
        <p>
          Explore technology, coding and innovation events.
        </p>
      </div>

      <div className="events-grid">
        {seminarEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </main>
  );
}

export default Seminars;