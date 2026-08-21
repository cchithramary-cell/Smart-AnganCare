const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const anganwadiCenterRoutes = require("./routes/anganwadiCenterRoutes");
const parentRoutes = require("./routes/parentRoutes");
const childRoutes = require("./routes/childRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const vaccinationRoutes = require("./routes/vaccinationRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");
const growthRoutes = require("./routes/growthRoutes");
const reportRoutes = require("./routes/reportRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const parentDashboardRoutes = require("./routes/parentDashboardRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

// Middleware
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// ==========================================
// Global Middlewares
// ==========================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ==========================================
// API Routes
// ==========================================

// Authentication
app.use("/api/auth", authRoutes);

// Admin
app.use("/api/admin", adminRoutes);

// Anganwadi Centers
app.use("/api/centers", anganwadiCenterRoutes);

// Parents
app.use("/api/parents", parentRoutes);

// Children
app.use("/api/children", childRoutes);

// Attendance
app.use("/api/attendance", attendanceRoutes);

// Vaccinations
app.use("/api/vaccinations", vaccinationRoutes);

// Nutrition
app.use("/api/nutrition", nutritionRoutes);

// Growth
app.use("/api/growth", growthRoutes);

// Reports
app.use("/api/reports", reportRoutes);

// Notifications
app.use("/api/notifications", notificationRoutes);

// Dashboard
app.use("/api/dashboard", dashboardRoutes);

// Parent Dashboard
app.use("/api/parent", parentDashboardRoutes);

// Analytics
app.use("/api/analytics", analyticsRoutes);

// ==========================================
// Health Check
// ==========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Smart AnganCare API is Running Successfully",
  });
});

// ==========================================
// 404 Handler
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// ==========================================
// Global Error Handler
// ==========================================

app.use(errorMiddleware);

module.exports = app;
