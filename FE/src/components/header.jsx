import { Link } from "react-router-dom";

function Header() {
  const student = JSON.parse(localStorage.getItem("student"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <header className="header">

      <Link to="/" className="logo">
        XACTITUDE
      </Link>

      <nav className="nav">

        <Link
          to="/"
          className="nav-item home-icon"
          aria-label="Home"
        >
          🏠
        </Link>

        {!student ? (
          <Link to="/signup" className="nav-item">
            Sign Up
          </Link>
        ) : isLoggedIn ? (
          <Link to="/profile" className="nav-item">
            Profile
          </Link>
        ) : (
          <Link to="/signin" className="nav-item">
            Sign In
          </Link>
        )}

      </nav>
    </header>
  );
}

export default Header;