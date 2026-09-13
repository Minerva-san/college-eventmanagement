import Student from "../models/Student.js";

// =========================
// REGISTER STUDENT
// =========================

export const registerStudent = async (req, res) => {
  try {
    const {
      studentId,
      name,
      email,
      phone,
      course,
      year,
      section,
    } = req.body;

    // Check college ID
    const existingStudentId = await Student.findOne({
      studentId,
    });

    if (existingStudentId) {
      return res.status(400).json({
        message: "A student with this college ID already exists.",
      });
    }

    // Check email
    const existingEmail = await Student.findOne({
      email,
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "A student with this email already exists.",
      });
    }

    // Generate XACTITUDE ID
    const random = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    const x_Id = `XACT26${random}`;

    // Create student
    const student = await Student.create({
      studentId,
      x_Id,
      name,
      email,
      phone,
      course,
      year,
      section,
    });

    res.status(201).json({
      message: "Student profile created successfully.",
      student: {
        studentId: student.studentId,
        x_Id: student.x_Id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        course: student.course,
        year: student.year,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create student profile.",
      error: error.message,
    });
  }
};


// =========================
// LOGIN STUDENT
// =========================

export const loginStudent = async (req, res) => {
  try {
    const { email, studentId } = req.body;

    const student = await Student.findOne({
      email: email.toLowerCase(),
      studentId: studentId,
    });

    if (!student) {
      return res.status(404).json({
        message: "Incorrect email or college ID.",
      });
    }

    res.status(200).json({
      message: "Login successful",
      student: {
        studentId: student.studentId,
        x_Id: student.x_Id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        course: student.course,
        year: student.year,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};


// =========================
// GET STUDENT
// =========================

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      studentId: req.params.studentId,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student",
      error: error.message,
    });
  }
};


// =========================
// UPDATE STUDENT
// =========================

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      {
        studentId: req.params.studentId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update student",
      error: error.message,
    });
  }
};


// =========================
// DELETE STUDENT
// =========================

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      studentId: req.params.studentId,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete student",
      error: error.message,
    });
  }
};