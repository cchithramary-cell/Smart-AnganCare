import api from "./api";

/**
 * Get Dashboard Statistics
 * API: GET /api/dashboard/stats
 */
export const getDashboardStats = async () => {
  try {
    const response = await api.get("/dashboard/stats");
    return response.data;
  } catch (error) {
    console.error("Dashboard Service Error:", error);

    throw (
      error.response?.data || {
        success: false,
        message: "Unable to fetch dashboard statistics",
      }
    );
  }
};
