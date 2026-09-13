import express from "express";

import {
  registerForEvent,
  getStudentRegistrations,
} from "../controllers/registrationController.js";

const router = express.Router();

router.post("/", registerForEvent);

router.get(
  "/student/:x_id",
  getStudentRegistrations
);

export default router;