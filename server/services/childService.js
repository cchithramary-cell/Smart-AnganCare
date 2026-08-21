const childModel = require("../models/childModel");

// =============================
// Add Child
// =============================
const addChild = async (childData) => {
  if (
    !childData.parent_id ||
    !childData.center_id ||
    !childData.child_name ||
    !childData.gender ||
    !childData.dob
  ) {
    throw new Error("Please fill all required fields.");
  }

  const result = await childModel.createChild(childData);

  return {
    success: true,
    message: "Child Added Successfully",
    child_id: result.insertId,
  };
};

// =============================
// Get All Children
// =============================
const getChildren = async () => {
  const children = await childModel.getAllChildren();

  return {
    success: true,
    total: children.length,
    data: children,
  };
};

// =============================
// Get Child By ID
// =============================
const getChild = async (id) => {
  const child = await childModel.getChildById(id);

  if (!child) {
    throw new Error("Child Not Found");
  }

  return {
    success: true,
    data: child,
  };
};

// =============================
// Update Child
// =============================
const updateChild = async (id, childData) => {
  const child = await childModel.getChildById(id);

  if (!child) {
    throw new Error("Child Not Found");
  }

  await childModel.updateChild(id, childData);

  return {
    success: true,
    message: "Child Updated Successfully",
  };
};

// =============================
// Delete Child
// =============================
const deleteChild = async (id) => {
  const child = await childModel.getChildById(id);

  if (!child) {
    throw new Error("Child Not Found");
  }

  await childModel.deleteChild(id);

  return {
    success: true,
    message: "Child Deleted Successfully",
  };
};

module.exports = {
  addChild,
  getChildren,
  getChild,
  updateChild,
  deleteChild,
};
