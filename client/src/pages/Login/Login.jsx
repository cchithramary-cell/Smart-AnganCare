import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(formData);

      console.log("Login Response:", response);

      /*
       * Your backend response may be:
       *
       * {
       *   success: true,
       *   data: {
       *      token: "...",
       *      user: {...}
       *   }
       * }
       *
       * or directly contain token/user.
       */

      const payload = response?.data || response;

      const userData = payload?.user || payload?.data?.user;

      const token = payload?.token || payload?.data?.token;

      if (!userData || !token) {
        alert("Invalid login response. Please try again.");
        return;
      }

      console.log("Logged User:", userData);
      console.log("Role:", userData.role);

      // Save user and token
      login(userData, token);

      // ===============================
      // ROLE-BASED NAVIGATION
      // ===============================

      switch (userData.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;

        case "manager":
          navigate("/manager/dashboard");
          break;

        case "parent":
          navigate("/parent/dashboard");
          break;

        default:
          alert("Invalid User Role");
          console.error("Unknown role received:", userData.role);
      }
    } catch (error) {
      console.error("Login Error:", error);

      alert(
        error.response?.data?.message ||
          "Login Failed. Please check your email and password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Smart AnganCare Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
