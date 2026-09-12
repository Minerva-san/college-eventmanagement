import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import events from "../data/event";

function TeamRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((event) => event.id === id);

  const [teamName, setTeamName] = useState("");
  const [team, setTeam] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  // -------------------------
  // EVENT NOT FOUND
  // -------------------------

  if (!event) {
    return (
      <main className="team-page">
        <div className="team-message">
          <h1>Event Not Found</h1>

          <Link to="/" className="team-button">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  // -------------------------
  // CHECK SIGN-IN
  // -------------------------

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return (
      <main className="team-page">
        <div className="team-message">

          <p className="section-label">
            TEAM REGISTRATION
          </p>

          <h1>Sign In Required</h1>

          <p>
            You must sign in before creating or
            joining a team.
          </p>

          <Link
            to="/signin"
            className="team-button"
          >
            Sign In →
          </Link>

        </div>
      </main>
    );
  }

  // -------------------------
  // GET STUDENT
  // -------------------------

  const studentData = localStorage.getItem("student");

  if (!studentData) {
    return (
      <main className="team-page">
        <div className="team-message">

          <h1>Profile Not Found</h1>

          <p>
            Create your student profile before
            registering for an event.
          </p>

          <Link
            to="/signup"
            className="team-button"
          >
            Create Profile →
          </Link>

        </div>
      </main>
    );
  }

  const student = JSON.parse(studentData);

  // -------------------------
  // CREATE TEAM
  // -------------------------

  const handleCreateTeam = (e) => {
    e.preventDefault();

    if (!teamName.trim()) {
      return;
    }

    const teamId =
      "TEAM-" +
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    const joinCode =
      Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    const newTeam = {
      teamId,
      eventId: event.id,
      eventName: event.name,

      teamName: teamName.trim(),

      leader: {
        studentId: student.xactitudeId,
        name: student.name,
      },

      members: [
        {
          studentId: student.xactitudeId,
          name: student.name,
          role: "Leader",
        },
      ],

      maxMembers: event.teamSize || 4,

      joinCode,

      status: "Open",

      createdAt: new Date().toISOString(),
    };

    // Save team
    const existingTeams =
      JSON.parse(localStorage.getItem("teams")) || [];

    localStorage.setItem(
      "teams",
      JSON.stringify([
        ...existingTeams,
        newTeam,
      ])
    );

    setTeam(newTeam);
  };

  // -------------------------
  // JOIN LINK
  // -------------------------

  const joinLink =
    `${window.location.origin}/team/join/${team?.joinCode}`;

  // -------------------------
  // CONFIRM TEAM
  // -------------------------

  const handleConfirm = () => {
    const teams =
      JSON.parse(localStorage.getItem("teams")) || [];

    const updatedTeams = teams.map((savedTeam) => {
      if (savedTeam.teamId === team.teamId) {
        return {
          ...savedTeam,
          status: "Confirmed",
        };
      }

      return savedTeam;
    });

    localStorage.setItem(
      "teams",
      JSON.stringify(updatedTeams)
    );

    setConfirmed(true);
  };

  // -------------------------
  // SUCCESS
  // -------------------------

  if (confirmed) {
    return (
      <main className="team-page">

        <div className="team-success">

          <p className="section-label">
            TEAM CONFIRMED
          </p>

          <h1>{team.teamName}</h1>

          <p>
            Your team has been successfully
            confirmed for{" "}
            <strong>{event.name}</strong>.
          </p>

          <div className="team-summary">

            <div>
              <span>TEAM ID</span>
              <strong>{team.teamId}</strong>
            </div>

            <div>
              <span>TEAM LEADER</span>
              <strong>{team.leader.name}</strong>
            </div>

            <div>
              <span>MEMBERS</span>
              <strong>
                {team.members.length} / {team.maxMembers}
              </strong>
            </div>

            <div>
              <span>EVENT</span>
              <strong>{event.name}</strong>
            </div>

          </div>

          <Link
            to="/profile"
            className="team-button"
          >
            Go to Profile →
          </Link>

        </div>

      </main>
    );
  }

  // -------------------------
  // TEAM CREATED
  // -------------------------

  if (team) {
    return (
      <main className="team-page">

        <div className="team-container">

          <p className="section-label">
            TEAM CREATED
          </p>

          <h1>{team.teamName}</h1>

          <p>
            You are the team leader.
            Share the link below with your friends.
          </p>

          {/* TEAM DETAILS */}

          <div className="team-details">

            <div>
              <span>TEAM ID</span>
              <strong>{team.teamId}</strong>
            </div>

            <div>
              <span>EVENT</span>
              <strong>{event.name}</strong>
            </div>

            <div>
              <span>TEAM LEADER</span>
              <strong>{student.name}</strong>
            </div>

            <div>
              <span>TEAM SIZE</span>
              <strong>
                {team.members.length} / {team.maxMembers}
              </strong>
            </div>

          </div>

          {/* JOIN LINK */}

          <section className="join-section">

            <p className="section-label">
              TEAM JOIN LINK
            </p>

            <div className="join-link-box">
              {joinLink}
            </div>

            <button
              className="secondary-button"
              onClick={() =>
                navigator.clipboard.writeText(joinLink)
              }
            >
              Copy Join Link
            </button>

          </section>

          {/* MEMBERS */}

          <section className="members-section">

            <p className="section-label">
              TEAM MEMBERS
            </p>

            <div className="members-list">

              {team.members.map((member) => (
                <div
                  className="member"
                  key={member.studentId}
                >
                  <div>
                    <strong>
                      {member.name}
                    </strong>

                    <span>
                      {member.studentId}
                    </span>
                  </div>

                  <span>
                    {member.role}
                  </span>
                </div>
              ))}

            </div>

          </section>

          {/* CONFIRM */}

          <button
            className="confirm-team-button"
            onClick={handleConfirm}
          >
            Confirm Team →
          </button>

        </div>

      </main>
    );
  }

  // -------------------------
  // CREATE TEAM FORM
  // -------------------------

  return (
    <main className="team-page">

      <div className="team-container">

        <Link
          to={`/event/${event.id}`}
          className="back-link"
        >
          ← Back to Event
        </Link>

        <div className="team-heading">

          <p className="section-label">
            TEAM REGISTRATION
          </p>

          <h1>{event.name}</h1>

          <p>
            Create a team and invite your friends
            to participate together.
          </p>

        </div>

        <div className="team-event-info">

          <div>
            <span>DATE</span>
            <strong>{event.date}</strong>
          </div>

          <div>
            <span>TIME</span>
            <strong>{event.time}</strong>
          </div>

          <div>
            <span>VENUE</span>
            <strong>{event.venue}</strong>
          </div>

          <div>
            <span>MAX TEAM SIZE</span>
            <strong>
              {event.teamSize || 4}
            </strong>
          </div>

        </div>

        <form
          onSubmit={handleCreateTeam}
          className="team-form"
        >

          <div className="form-group">

            <label>Team Name</label>

            <input
              type="text"
              value={teamName}
              onChange={(e) =>
                setTeamName(e.target.value)
              }
              placeholder="Enter your team name"
              required
            />

          </div>

          <div className="leader-info">

            <p className="section-label">
              TEAM LEADER
            </p>

            <strong>{student.name}</strong>

            <span>
              {student.xactitudeId}
            </span>

          </div>

          <button
            type="submit"
            className="confirm-team-button"
          >
            Create Team →
          </button>

        </form>

      </div>

    </main>
  );
}

export default TeamRegistration;