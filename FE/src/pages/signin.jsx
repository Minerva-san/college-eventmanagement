import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Get the profile created during Sign Up
    const studentData = localStorage.getItem("student");

    if (!studentData) {
      setError(
        "No student profile found. Please create a profile first."
      );
      return;
    }

    const student = JSON.parse(studentData);

    // Check login details
    if (
      email.trim().toLowerCase() !==
        student.email.trim().toLowerCase() ||
      studentId.trim().toLowerCase() !==
        student.studentId.trim().toLowerCase()
    ) {
      setError(
        "Incorrect email or student ID. Please try again."
      );
      return;
    }

    // Student successfully signed in
    localStorage.setItem("isLoggedIn", "true");

    // Go to profile
    navigate("/profile");
  };

  return (
    <main className="signin-page">

      <div className="signin-container">

        <div className="signin-heading">

          <p className="section-label">
            XACTITUDE 2026
          </p>

          <h1>Sign In</h1>

          <p>
            Sign in to your student profile to
            register for events.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="signin-form"
        >

          {/* EMAIL */}

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
            />

          </div>

          {/* STUDENT ID */}

          <div className="form-group">

            <label>College / Student ID</label>

            <input
              type="text"
              value={studentId}
              onChange={(e) =>
                setStudentId(e.target.value)
              }
              placeholder="Enter your student ID"
              required
            />

          </div>

          {/* ERROR */}

          {error && (
            <p className="signin-error">
              {error}
            </p>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            className="signin-button"
          >
            Sign In →
          </button>

        </form>

        <div className="signin-footer">

          <p>
            Don't have a student profile?
          </p>

          <Link to="/signup">
            Create Profile →
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Signin;