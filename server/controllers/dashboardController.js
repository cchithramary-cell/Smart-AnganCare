const db = require("../config/db");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const getDashboardStats = async (req, res) => {
  try {
    const queries = [
      "SELECT COUNT(*) AS total FROM anganwadi_centers",
      "SELECT COUNT(*) AS total FROM parents",
      "SELECT COUNT(*) AS total FROM children",
      "SELECT COUNT(*) AS total FROM vaccinations",
    ];

    const [centers, parents, children, vaccinations] = await Promise.all(
      queries.map((query) => db.query(query)),
    );

    const stats = {
      centers: centers[0][0]?.total || 0,
      parents: parents[0][0]?.total || 0,
      children: children[0][0]?.total || 0,
      vaccinations: vaccinations[0][0]?.total || 0,
    };

    return successResponse(res, "Dashboard stats loaded successfully", stats);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  getDashboardStats,
};
