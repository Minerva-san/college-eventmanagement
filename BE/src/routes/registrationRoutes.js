import express from "express";

import {
  registerForEvent
} from "../controllers/registrationController.js";

const router = express.Router();

router.post("/", registerForEvent);

export default router;