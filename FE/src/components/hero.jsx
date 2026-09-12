function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-tagline">COLLEGE EVENTS • ALL IN ONE PLACE</p>

        <h1>
          Experience.
          <br />
          Participate.
          <br />
          <span>Connect.</span>
        </h1>

        <p className="hero-description">
          Discover upcoming events, register effortlessly, and never miss
          what's happening on campus.
        </p>

        <button className="hero-button">
          Explore Events
        </button>
      </div>

      <div className="hero-poster">
        <img
          src="/hero-poster.jpeg"
          alt="Xactitude college events"
        />
      </div>
    </section>
  );
}

export default Hero;