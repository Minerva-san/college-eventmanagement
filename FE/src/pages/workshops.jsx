import EventCard from "../components/eventcard";
import events from "../data/event";

function Workshops() {
const workshopEvents = events.filter(
    (event) => event.category === "Workshop"
  );

  return (
    <main className="events-page">
      <div className="events-heading">
        <p className="section-label">XACTITUDE 2026</p>
        <h1>Workshops</h1>
        <p>
          Explore technology, coding and innovation events.
        </p>
      </div>

      <div className="events-grid">
        {workshopEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </main>
  );
}

export default Workshops;