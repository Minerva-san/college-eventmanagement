import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    course: "",
    year: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/students/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to create profile.");
        setLoading(false);
        return;
      }

      // Store the student returned by the backend
      localStorage.setItem(
        "student",
        JSON.stringify(data.student)
      );

      // User has a profile, but has not signed in yet
      localStorage.setItem("isLoggedIn", "false");

      // Tell Header that profile has changed
      window.dispatchEvent(new Event("authChange"));

      navigate("/signin");
    } catch (error) {
      console.error(error);

      setError(
        "Unable to connect to the server. Make sure the backend is running."
      );
    }

    setLoading(false);
  };

  return (
    <main className="signup-page">
      <div className="signup-container">

        <div className="signup-heading">
          <p className="section-label">
            XACTITUDE 2026
          </p>

          <h1>Create Profile</h1>

          <p>
            Create your student profile to participate in events.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="signup-form"
        >

          {/* NAME */}

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>


          {/* EMAIL + PHONE */}

          <div className="form-row">

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

          </div>


          {/* COLLEGE ID */}

          <div className="form-group">
            <label>College / Student ID</label>

            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Enter your college ID"
              required
            />
          </div>


          {/* COURSE + YEAR */}

          <div className="form-row">

            <div className="form-group">
              <label>Course</label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select course
                </option>

                <option value="BCA">
                  BCA
                </option>

                <option value="BSc Computer Science">
                  BSc Computer Science
                </option>

                <option value="BTech">
                  BTech
                </option>

                <option value="MCA">
                  MCA
                </option>

                <option value="MSc Computer Science">
                  MSc Computer Science
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>


            <div className="form-group">
              <label>Year</label>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select year
                </option>

                <option value="1st Year">
                  1st Year
                </option>

                <option value="2nd Year">
                  2nd Year
                </option>

                <option value="3rd Year">
                  3rd Year
                </option>

                <option value="4th Year">
                  4th Year
                </option>
              </select>
            </div>

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
            className="signup-button"
            disabled={loading}
          >
            {loading
              ? "Creating Profile..."
              : "Create Profile →"}
          </button>

        </form>

      </div>
    </main>
  );
}

export default Signup;