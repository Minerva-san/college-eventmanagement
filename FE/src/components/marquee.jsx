function Marquee() {
  const events = [
    {
      name: "Hackathon 2026",
      time: "10:00 AM",
      venue: "Main Auditorium",
    },
    {
      name: "Cultural Fest",
      time: "2:00 PM",
      venue: "Open Air Theatre",
    },
    {
      name: "AI Workshop",
      time: "11:30 AM",
      venue: "Seminar Hall",
    },
    {
      name: "Coding Competition",
      time: "3:00 PM",
      venue: "Computer Lab 2",
    },
  ];

  return (
    <section className="marquee-section">
      <div className="marquee-label">
        <span className="live-dot"></span>
        LIVE UPDATES
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-content">
          {events.map((event, index) => (
            <div className="marquee-event" key={index}>
              <strong>{event.name}</strong>
              <span>•</span>
              <span>{event.time}</span>
              <span>•</span>
              <span>{event.venue}</span>
            </div>
          ))}

          {/* Duplicate events for continuous scrolling */}
          {events.map((event, index) => (
            <div className="marquee-event" key={`duplicate-${index}`}>
              <strong>{event.name}</strong>
              <span>•</span>
              <span>{event.time}</span>
              <span>•</span>
              <span>{event.venue}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Marquee;