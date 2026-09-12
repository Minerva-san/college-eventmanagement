import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedStudent = localStorage.getItem("student");

    if (savedStudent) {
      setStudent(JSON.parse(savedStudent));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn", "false");
    navigate("/");
  };

  if (!student) {
    return (
      <main className="profile-page">
        <div className="profile-empty">
          <h1>No Profile Found</h1>
          <p>Create a student profile to continue.</p>

          <Link to="/signup" className="profile-button">
            Create Profile →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <div>
            <p className="section-label">STUDENT PROFILE</p>
            <h1>{student.name}</h1>
          </div>

          <div className="student-id">
            <span>XACTITUDE ID</span>
            <strong>{student.xactitudeId}</strong>
          </div>
        </div>

        <div className="profile-details">

          <div className="profile-detail">
            <span>Email</span>
            <strong>{student.email}</strong>
          </div>

          <div className="profile-detail">
            <span>Phone</span>
            <strong>{student.phone}</strong>
          </div>

          <div className="profile-detail">
            <span>College ID</span>
            <strong>{student.studentId}</strong>
          </div>

          <div className="profile-detail">
            <span>Course</span>
            <strong>{student.course}</strong>
          </div>

          <div className="profile-detail">
            <span>Year</span>
            <strong>{student.year}</strong>
          </div>

        </div>

        <div className="profile-actions">
          <Link to="/" className="profile-button">
            Explore Events
          </Link>

          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>

      </div>
    </main>
  );
}

export default Profile;