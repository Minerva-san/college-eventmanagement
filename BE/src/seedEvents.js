import dotenv from "dotenv";
import mongoose from "mongoose";
import Event from "./models/Event.js";

dotenv.config();

const events = [
  // =========================
  // TECH
  // =========================

  {
    eventId: "kju-hackathon",
    name: "KJU Hackathon",
    category: "Tech",
    date: "10 September 2026",
    time: "9:00 AM – 10:30 AM",
    venue: "Computer Lab 1",
    capacity: 50,
    registeredCount: 0,
    registrationType: "Team"
  },

  {
    eventId: "prompthack",
    name: "PromptHack",
    category: "Tech",
    date: "10 September 2026",
    time: "2:00 PM – 4:00 PM",
    venue: "Computer Lab 2",
    capacity: 40,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "inquery",
    name: "Inquery",
    category: "Tech",
    date: "11 September 2026",
    time: "9:00 AM – 10:30 AM",
    venue: "Computer Lab 2",
    capacity: 40,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "zeroday",
    name: "Zeroday",
    category: "Tech",
    date: "11 September 2026",
    time: "2:00 PM – 4:00 PM",
    venue: "Computer Lab 1",
    capacity: 50,
    registeredCount: 0,
    registrationType: "Team"
  },

  {
    eventId: "frontend-frenzy",
    name: "Frontend Frenzy",
    category: "Tech",
    date: "12 September 2026",
    time: "9:00 AM – 11:00 AM",
    venue: "Computer Lab 1",
    capacity: 40,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "valorant",
    name: "Valorant",
    category: "Tech",
    date: "12 September 2026",
    time: "2:00 PM – 4:00 PM",
    venue: "Gaming Arena",
    capacity: 20,
    registeredCount: 0,
    registrationType: "Team"
  },

  // =========================
  // CULTURAL
  // =========================

  {
    eventId: "battle-of-bands",
    name: "Battle of Bands",
    category: "Cultural",
    date: "10 September 2026",
    time: "9:00 AM – 10:30 AM",
    venue: "Open Air Theatre",
    capacity: 20,
    registeredCount: 0,
    registrationType: "Team"
  },

  {
    eventId: "dance-fusion",
    name: "Dance Fusion",
    category: "Cultural",
    date: "10 September 2026",
    time: "2:00 PM – 4:00 PM",
    venue: "Open Air Theatre",
    capacity: 30,
    registeredCount: 0,
    registrationType: "Team"
  },

  {
    eventId: "solo-singing",
    name: "Solo Singing",
    category: "Cultural",
    date: "11 September 2026",
    time: "10:30 AM – 12:00 PM",
    venue: "Auditorium",
    capacity: 40,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "street-play",
    name: "Street Play",
    category: "Cultural",
    date: "11 September 2026",
    time: "4:00 PM – 6:00 PM",
    venue: "Main Quadrangle",
    capacity: 30,
    registeredCount: 0,
    registrationType: "Team"
  },

  {
    eventId: "classical-dance",
    name: "Classical Dance",
    category: "Cultural",
    date: "12 September 2026",
    time: "9:00 AM – 10:30 AM",
    venue: "Auditorium",
    capacity: 30,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "battle-of-talents",
    name: "Battle of Talents",
    category: "Cultural",
    date: "12 September 2026",
    time: "2:00 PM – 4:00 PM",
    venue: "Open Air Theatre",
    capacity: 50,
    registeredCount: 0,
    registrationType: "Individual"
  },

  // =========================
  // WORKSHOPS
  // =========================

  {
    eventId: "ai-tools",
    name: "AI Tools Workshop",
    category: "Workshop",
    date: "10 September 2026",
    time: "10:00 AM – 11:00 AM",
    venue: "Seminar Hall",
    capacity: 60,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "web-development",
    name: "Web Development Workshop",
    category: "Workshop",
    date: "10 September 2026",
    time: "3:00 PM – 4:00 PM",
    venue: "Computer Lab 3",
    capacity: 40,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "uiux",
    name: "UI/UX Design Workshop",
    category: "Workshop",
    date: "11 September 2026",
    time: "2:00 PM – 3:30 PM",
    venue: "Design Lab",
    capacity: 40,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "python-masterclass",
    name: "Python Masterclass",
    category: "Workshop",
    date: "12 September 2026",
    time: "11:00 AM – 1:00 PM",
    venue: "Computer Lab 2",
    capacity: 50,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "git-github",
    name: "Git & GitHub Workshop",
    category: "Workshop",
    date: "12 September 2026",
    time: "2:30 PM – 4:00 PM",
    venue: "Computer Lab 3",
    capacity: 40,
    registeredCount: 0,
    registrationType: "Individual"
  },

  // =========================
  // COMPETITIONS
  // =========================

  {
    eventId: "photography",
    name: "Photography Challenge",
    category: "Competition",
    date: "10 September 2026",
    time: "10:30 AM – 12:00 PM",
    venue: "College Campus",
    capacity: 30,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "treasure-hunt",
    name: "Treasure Hunt",
    category: "Competition",
    date: "11 September 2026",
    time: "9:00 AM – 11:00 AM",
    venue: "College Campus",
    capacity: 40,
    registeredCount: 0,
    registrationType: "Team"
  },

  {
    eventId: "tech-quiz",
    name: "Tech Quiz",
    category: "Competition",
    date: "11 September 2026",
    time: "2:30 PM – 4:00 PM",
    venue: "Auditorium",
    capacity: 60,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "code-relay",
    name: "Code Relay",
    category: "Competition",
    date: "12 September 2026",
    time: "11:30 AM – 1:00 PM",
    venue: "Computer Lab 1",
    capacity: 50,
    registeredCount: 0,
    registrationType: "Team"
  },

  // =========================
  // SEMINARS
  // =========================

  {
    eventId: "future-ai",
    name: "Future of AI",
    category: "Seminar",
    date: "10 September 2026",
    time: "11:00 AM – 12:30 PM",
    venue: "Main Auditorium",
    capacity: 150,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "cybersecurity",
    name: "Cybersecurity & You",
    category: "Seminar",
    date: "11 September 2026",
    time: "10:00 AM – 11:30 AM",
    venue: "Main Auditorium",
    capacity: 150,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "tech-careers",
    name: "Careers in Technology",
    category: "Seminar",
    date: "12 September 2026",
    time: "10:00 AM – 11:30 AM",
    venue: "Seminar Hall",
    capacity: 150,
    registeredCount: 0,
    registrationType: "Individual"
  },

  {
    eventId: "entrepreneurship",
    name: "Entrepreneurship & Startups",
    category: "Seminar",
    date: "12 September 2026",
    time: "4:00 PM – 5:30 PM",
    venue: "Main Auditorium",
    capacity: 100,
    registeredCount: 0,
    registrationType: "Individual"
  }
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Event.deleteMany({});

    await Event.insertMany(events);

    console.log(`${events.length} events seeded successfully`);

    await mongoose.connection.close();

  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedEvents();