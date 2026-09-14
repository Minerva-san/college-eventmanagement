import { useState } from "react";
import EventCard from "../components/eventcard";
import events from "../data/event";

function Tech() {
  const [filter, setFilter] = useState("All");
    const techEvents = events.filter((event) => {
    if (event.category !== "Tech") return false;

    if (filter === "All") return true;

    if (filter === "Individual") {
      return (
        event.registrationType === "Individual" ||
        event.registrationType === "Both"
      );
    }

    if (filter === "Team") {
      return (
        event.registrationType === "Team" ||
        event.registrationType === "Both"
      );
    }

    return true;
  });

  return (
    <main className="events-page">
      <div className="events-heading">
        <p className="section-label">XACTITUDE 2026</p>

        <h1>Tech Events</h1>

        <p>
          Explore technology, coding and innovation events.
        </p>
      </div>

      <div className="event-filters">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>

        <button
          className={filter === "Individual" ? "active" : ""}
          onClick={() => setFilter("Individual")}
        >
          Individual
        </button>

        <button
          className={filter === "Team" ? "active" : ""}
          onClick={() => setFilter("Team")}
        >
          Team
        </button>
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