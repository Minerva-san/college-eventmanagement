import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/students", studentRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

app.get("/api/students", (req, res) => {
  res.json({ message: "Xactitude API running" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});