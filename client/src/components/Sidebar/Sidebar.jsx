import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaUserTie,
  FaChild,
  FaClipboardCheck,
  FaSyringe,
  FaAppleAlt,
  FaChartLine,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <aside className="sidebar">
      {/* ================= LOGO ================= */}

      <div className="sidebar-logo">
        <h2>Smart AnganCare</h2>

        <small style={{ color: "#ccc" }}>{user?.role?.toUpperCase()}</small>
      </div>

      <nav>
        {/* =================================================
            ADMIN
        ================================================= */}

        {user?.role === "admin" && (
          <>
            <NavLink to="/admin/dashboard" className="nav-item">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/admin/centers" className="nav-item">
              <FaBuilding />
              <span>Centers</span>
            </NavLink>

            <NavLink to="/admin/managers" className="nav-item">
              <FaUserTie />
              <span>Managers</span>
            </NavLink>

            <NavLink to="/admin/analytics" className="nav-item">
              <FaChartLine />
              <span>Analytics</span>
            </NavLink>

            <NavLink to="/admin/reports" className="nav-item">
              <FaChartBar />
              <span>Reports</span>
            </NavLink>
          </>
        )}

        {/* =================================================
            MANAGER
        ================================================= */}

        {user?.role === "manager" && (
          <>
            <NavLink to="/manager/dashboard" className="nav-item">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/manager/parents" className="nav-item">
              <FaUsers />
              <span>Parents</span>
            </NavLink>

            <NavLink to="/manager/children" className="nav-item">
              <FaChild />
              <span>Children</span>
            </NavLink>

            <NavLink to="/manager/attendance" className="nav-item">
              <FaClipboardCheck />
              <span>Attendance</span>
            </NavLink>

            <NavLink to="/manager/growth" className="nav-item">
              <FaChartLine />
              <span>Growth</span>
            </NavLink>

            <NavLink to="/manager/nutrition" className="nav-item">
              <FaAppleAlt />
              <span>Nutrition</span>
            </NavLink>

            <NavLink to="/manager/vaccinations" className="nav-item">
              <FaSyringe />
              <span>Vaccination</span>
            </NavLink>

            <NavLink to="/manager/reports" className="nav-item">
              <FaChartBar />
              <span>Reports</span>
            </NavLink>
          </>
        )}

        {/* =================================================
            PARENT
        ================================================= */}

        {user?.role === "parent" && (
          <>
            <NavLink to="/parent/dashboard" className="nav-item">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/parent/my-child" className="nav-item">
              <FaChild />
              <span>My Child</span>
            </NavLink>

            <NavLink to="/parent/attendance" className="nav-item">
              <FaClipboardCheck />
              <span>Attendance</span>
            </NavLink>

            <NavLink to="/parent/growth" className="nav-item">
              <FaChartLine />
              <span>Growth</span>
            </NavLink>

            <NavLink to="/parent/nutrition" className="nav-item">
              <FaAppleAlt />
              <span>Nutrition</span>
            </NavLink>

            <NavLink to="/parent/vaccination" className="nav-item">
              <FaSyringe />
              <span>Vaccination</span>
            </NavLink>

            <NavLink to="/parent/reports" className="nav-item">
              <FaChartBar />
              <span>Reports</span>
            </NavLink>
          </>
        )}

        {/* =================================================
            LOGOUT
        ================================================= */}

        <button
          className="nav-item logout-btn"
          onClick={logout}
          style={{
            border: "none",
            background: "transparent",
            width: "100%",
            textAlign: "left",
            cursor: "pointer",
          }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
