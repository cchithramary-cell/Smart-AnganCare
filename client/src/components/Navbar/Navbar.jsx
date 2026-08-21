import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div>
        <h4>Smart AnganCare</h4>
      </div>

      <div className="navbar-right">
        <span>
          Welcome, <strong>{user?.full_name}</strong>
        </span>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
