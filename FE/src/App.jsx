import { BrowserRouter, Routes, Route } from "react-router-dom";

import EventDetails from "./pages/eventdetails.jsx";
import Header from "./components/header";
import Home from "./pages/home";
import Tech from "./pages/tech";
import Cultural from "./pages/cultural";
import Workshops from "./pages/workshops";
import Competitions from "./pages/competitions";
import Seminars from "./pages/seminars";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import Registration from "./pages/registration";  
import Signin from "./pages/signin";
import TeamRegistration from "./pages/teamregistration.jsx";

function App() {
  return (
    <BrowserRouter><Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/cultural" element={<Cultural />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/seminars" element={<Seminars />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/event/:id/register" element={<Registration />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/event/:id/team" element={<TeamRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;