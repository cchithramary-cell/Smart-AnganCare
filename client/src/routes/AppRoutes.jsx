import { Routes, Route } from "react-router-dom";

// =====================================================
// AUTHENTICATION
// =====================================================

import Login from "../pages/Login/Login";

// =====================================================
// LAYOUT & PROTECTION
// =====================================================

import Layout from "../components/Layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

// =====================================================
// ADMIN
// =====================================================

import AdminDashboard from "../pages/admin/AdminDashboard";
import AnalyticsDashboard from "../pages/admin/AnalyticsDashboard";

import Centers from "../pages/admin/Centers";
import AddCenter from "../pages/admin/AddCenter";
import EditCenter from "../pages/admin/EditCenter";

import Managers from "../pages/admin/Managers";
import AddManager from "../pages/admin/AddManager";
import EditManager from "../pages/admin/EditManager";

import Reports from "../pages/admin/Reports";

// =====================================================
// MANAGER
// =====================================================

import ManagerDashboard from "../pages/manager/ManagerDashboard";

// Manager Reports
import MReports from "../pages/manager/MReports";

// Parent Management
import Parents from "../pages/manager/Parents";
import AddParent from "../pages/manager/AddParent";
import EditParent from "../pages/manager/EditParent";
import ViewParent from "../pages/manager/ViewParent";

// Child Management
import Children from "../pages/manager/Children";
import AddChild from "../pages/manager/AddChild";
import EditChild from "../pages/manager/EditChild";

// Attendance
import Attendance from "../pages/manager/Attendance";
import AddAttendance from "../pages/manager/AddAttendance";
import EditAttendance from "../pages/manager/EditAttendance";

// Vaccination
import Vaccinations from "../pages/manager/Vaccinations";
import AddVaccination from "../pages/manager/AddVaccination";
import EditVaccination from "../pages/manager/EditVaccination";

// Nutrition
import Nutrition from "../pages/manager/Nutrition";
import AddNutrition from "../pages/manager/AddNutrition";
import EditNutrition from "../pages/manager/EditNutrition";

// Growth
import Growth from "../pages/manager/Growth";
import AddGrowth from "../pages/manager/AddGrowth";
import EditGrowth from "../pages/manager/EditGrowth";

// =====================================================
// PARENT
// =====================================================

import ParentDashboard from "../pages/parent/ParentDashboard";
import MyChild from "../pages/parent/MyChild";
import MyAttendance from "../pages/parent/MyAttendance";
import MyGrowth from "../pages/parent/MyGrowth";
import MyNutrition from "../pages/parent/MyNutrition";
import MyVaccination from "../pages/parent/MyVaccination";

// Parent Reports
import PReports from "../pages/parent/PReports";

// =====================================================
// ROUTES
// =====================================================

function AppRoutes() {
  return (
    <Routes>
      {/* =================================================
          PUBLIC ROUTES
      ================================================= */}

      <Route path="/" element={<Login />} />

      {/* =================================================
          PROTECTED ROUTES
      ================================================= */}

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* =================================================
            ADMIN ROUTES
        ================================================= */}

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin/analytics" element={<AnalyticsDashboard />} />

        {/* Centers */}

        <Route path="/admin/centers" element={<Centers />} />

        <Route path="/admin/add-center" element={<AddCenter />} />

        <Route path="/admin/edit-center/:id" element={<EditCenter />} />

        {/* Managers */}

        <Route path="/admin/managers" element={<Managers />} />

        <Route path="/admin/add-manager" element={<AddManager />} />

        <Route path="/admin/edit-manager/:id" element={<EditManager />} />

        {/* Reports */}

        <Route path="/admin/reports" element={<Reports />} />

        {/* =================================================
            MANAGER ROUTES
        ================================================= */}

        <Route path="/manager/dashboard" element={<ManagerDashboard />} />

        {/* Parent Management */}

        <Route path="/manager/parents" element={<Parents />} />

        <Route path="/manager/add-parent" element={<AddParent />} />

        <Route path="/manager/edit-parent/:id" element={<EditParent />} />

        <Route path="/manager/view-parent/:id" element={<ViewParent />} />

        {/* Child Management */}

        <Route path="/manager/children" element={<Children />} />

        <Route path="/manager/add-child" element={<AddChild />} />

        <Route path="/manager/edit-child/:id" element={<EditChild />} />

        {/* Attendance */}

        <Route path="/manager/attendance" element={<Attendance />} />

        <Route path="/manager/add-attendance" element={<AddAttendance />} />

        <Route
          path="/manager/edit-attendance/:id"
          element={<EditAttendance />}
        />

        {/* Vaccination */}

        <Route path="/manager/vaccinations" element={<Vaccinations />} />

        <Route path="/manager/add-vaccination" element={<AddVaccination />} />

        <Route
          path="/manager/edit-vaccination/:id"
          element={<EditVaccination />}
        />

        {/* Nutrition */}

        <Route path="/manager/nutrition" element={<Nutrition />} />

        <Route path="/manager/add-nutrition" element={<AddNutrition />} />

        <Route path="/manager/edit-nutrition/:id" element={<EditNutrition />} />

        {/* Growth */}

        <Route path="/manager/growth" element={<Growth />} />

        <Route path="/manager/add-growth" element={<AddGrowth />} />

        <Route path="/manager/edit-growth/:id" element={<EditGrowth />} />

        {/* Manager Reports */}

        <Route path="/manager/reports" element={<MReports />} />

        {/* =================================================
            PARENT ROUTES
        ================================================= */}

        <Route path="/parent/dashboard" element={<ParentDashboard />} />

        {/* My Child */}

        <Route path="/parent/my-child" element={<MyChild />} />

        {/* Attendance */}

        <Route path="/parent/attendance" element={<MyAttendance />} />

        {/* Growth */}

        <Route path="/parent/growth" element={<MyGrowth />} />

        {/* Nutrition */}

        <Route path="/parent/nutrition" element={<MyNutrition />} />

        {/* Vaccination */}

        <Route path="/parent/vaccination" element={<MyVaccination />} />

        {/* Parent Reports */}

        <Route path="/parent/reports" element={<PReports />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
