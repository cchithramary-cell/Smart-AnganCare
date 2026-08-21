const childService = require("../services/childService");

// =============================
// CREATE CHILD
// =============================
const createChild = async (req, res) => {
  try {
    const result = await childService.addChild(req.body);

    res.status(201).json(result);
  } catch (error) {
    console.error("Create Child Error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// GET ALL CHILDREN
// =============================
const getChildren = async (req, res) => {
  try {
    const result = await childService.getChildren();

    res.status(200).json(result);
  } catch (error) {
    console.error("Get Children Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// GET CHILD BY ID
// =============================
const getChild = async (req, res) => {
  try {
    const result = await childService.getChild(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    console.error("Get Child Error:", error.message);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// UPDATE CHILD
// =============================
const updateChild = async (req, res) => {
  try {
    const result = await childService.updateChild(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    console.error("Update Child Error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// DELETE CHILD
// =============================
const deleteChild = async (req, res) => {
  try {
    const result = await childService.deleteChild(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    console.error("Delete Child Error:", error.message);

    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createChild,
  getChildren,
  getChild,
  updateChild,
  deleteChild,
};
