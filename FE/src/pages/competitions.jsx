import EventCard from "../components/eventcard";
import events from "../data/event";

function Competitions() {
  const competitionEvents = events.filter(
    (event) => event.category === "Competition"
  );

  return (
    <main className="events-page">
      <div className="events-heading">
        <p className="section-label">XACTITUDE 2026</p>
        <h1>Competitions</h1>
        <p>
          Explore technology, coding and innovation events.
        </p>
      </div>

      <div className="events-grid">
        {competitionEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
    </main>
  );
}

export default Competitions;