const db = require("../config/db");

exports.getDashboardStats = async () => {
  const [centers] = await db
    .promise()
    .query("SELECT COUNT(*) AS totalCenters FROM anganwadi_centers");

  const [parents] = await db
    .promise()
    .query("SELECT COUNT(*) AS totalParents FROM parents");

  const [children] = await db
    .promise()
    .query("SELECT COUNT(*) AS totalChildren FROM children");

  const [vaccinations] = await db
    .promise()
    .query("SELECT COUNT(*) AS totalVaccinations FROM vaccinations");

  return {
    totalCenters: centers[0].totalCenters,
    totalParents: parents[0].totalParents,
    totalChildren: children[0].totalChildren,
    totalVaccinations: vaccinations[0].totalVaccinations,
  };
};
