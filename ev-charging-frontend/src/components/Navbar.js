import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  // 🚫 Pages where auth info must NOT show
  const hideAuthPages = ["/login", "/register", "/admin-login"];
  const isAuthPage = hideAuthPages.includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const homeRoute = loggedInUser
    ? loggedInUser.roleId === 2
      ? "/owner"
      : "/customer"
    : "/login";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to={homeRoute}>
          ⚡ EV Charge
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">

            {/* ✅ Hide auth info on login/register pages */}
            {(!loggedInUser || isAuthPage) ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Hi, {loggedInUser.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light btn-sm ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
