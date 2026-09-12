import Student from "../models/Student.js";

export const registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      course,
      year,
      section,
      password,
    } = req.body;

    // Check if email already exists
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(400).json({
        message: "A student with this email already exists.",
      });
    }

    // Generate student ID
    const count = await Student.countDocuments();

    const studentId = `XAC26${String(count + 1).padStart(4, "0")}`;

    const student = await Student.create({
      studentId,
      name,
      email,
      phone,
      course,
      year,
      section,
      password,
    });

    res.status(201).json({
      message: "Student profile created successfully.",
      studentId: student.studentId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create student profile.",
    });
  }
};
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    if (student.password !== password) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    res.status(200).json({
      message: "Login successful",
      student: {
        studentId: student.studentId,
        name: student.name,
        email: student.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};
export const getStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      studentId: req.params.studentId
    }).select("-password");

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json(student);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student",
      error: error.message
    });
  }
};
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { studentId: req.params.studentId },
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select("-password");

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      student
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message
    });
  }
};
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      studentId: req.params.studentId
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.status(200).json({
      message: "Student profile deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete student",
      error: error.message
    });
  }
}; 