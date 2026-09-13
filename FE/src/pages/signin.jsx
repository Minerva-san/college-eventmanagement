import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/students/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            studentId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
          "Incorrect email or college ID."
        );

        setLoading(false);
        return;
      }

      // Save the complete student returned by backend
      localStorage.setItem(
        "student",
        JSON.stringify(data.student)
      );

      // Mark user as signed in
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      // Tell Header to update
      window.dispatchEvent(
        new Event("authChange")
      );

      navigate("/");
    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to the server. Make sure the backend is running."
      );
    }

    setLoading(false);
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

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your registered email"
              required
            />

          </div>


          <div className="form-group">

            <label>College / Student ID</label>

            <input
              type="text"
              value={studentId}
              onChange={(e) =>
                setStudentId(e.target.value)
              }
              placeholder="Enter your college ID"
              required
            />

          </div>


          {error && (
            <p className="signin-error">
              {error}
            </p>
          )}


          <button
            type="submit"
            className="signin-button"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Sign In →"}
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