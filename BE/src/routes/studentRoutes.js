import express from "express";

import {
  registerStudent,
  loginStudent,
  getStudent,
  updateStudent,
  deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/register", registerStudent);

router.post("/login", loginStudent);

router.get("/:studentId", getStudent);

router.put("/:studentId", updateStudent);

router.delete("/:studentId", deleteStudent);

export default router;