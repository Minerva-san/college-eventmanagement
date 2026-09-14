import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    const updateAuth = () => {
      setIsLoggedIn(
        localStorage.getItem("isLoggedIn") === "true"
      );
    };

    window.addEventListener("authChange", updateAuth);

    return () => {
      window.removeEventListener("authChange", updateAuth);
    };
  }, []);

  return (
    <header className="header">
      <Link to="/" className="logo">
        XACTITUDE
      </Link>

      <nav className="nav">

        {/* SIGN UP - only when not signed in */}
        {!isLoggedIn && (
          <Link to="/signup" className="nav-item">
            Sign Up
          </Link>
        )}

        {/* HOME - always visible */}
        <Link
          to="/"
          className="nav-item home-icon"
          aria-label="Home"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 11.5L12 4l9 7.5" />
            <path d="M5 10v10h14V10" />
            <path d="M9 20v-6h6v6" />
          </svg>
        </Link>

        {/* PROFILE - always visible */}
        <Link
          to={isLoggedIn ? "/profile" : "/signin"}
          className="nav-item profile-icon"
          aria-label={isLoggedIn ? "Profile" : "Sign In"}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
          </svg>
        </Link>

      </nav>
    </header>
  );
}

export default Header;