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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateStudentId = () => {
    const random = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    return `XACT-26-${random}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const student = {
      ...formData,
      xactitudeId: generateStudentId(),
    };

    localStorage.setItem("student", JSON.stringify(student));

    navigate("/profile");
  };

  return (
    <main className="signup-page">
      <div className="signup-container">

        <div className="signup-heading">
          <p className="section-label">XACTITUDE 2026</p>
          <h1>Create Profile</h1>
          <p>
            Create your student profile to participate in events.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">

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

          <div className="form-row">

            <div className="form-group">
              <label>Course</label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">Select course</option>
                <option value="BCA">BCA</option>
                <option value="BSc Computer Science">
                  BSc Computer Science
                </option>
                <option value="BTech">BTech</option>
                <option value="MCA">MCA</option>
                <option value="MSc Computer Science">
                  MSc Computer Science
                </option>
                <option value="Other">Other</option>
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
                <option value="">Select year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

          </div>

          <button type="submit" className="signup-button">
            Create Profile →
          </button>

        </form>

      </div>
    </main>
  );
}

export default Signup;