const bcrypt = require("bcrypt");

const { findUserByEmail, getProfile } = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("===== LOGIN ATTEMPT =====");
    console.log("Email received:", email);

    const user = await findUserByEmail(email);

    console.log(
      "User found:",
      user
        ? {
            email: user.email,
            role: user.role,
            user_id: user.user_id,
          }
        : "NOT FOUND",
    );

    if (!user) {
      return errorResponse(res, "Invalid Email or Password", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password match:", isMatch);

    if (!isMatch) {
      return errorResponse(res, "Invalid Email or Password", 401);
    }

    const token = generateToken(user);

    console.log("Login successful for:", user.email);

    return successResponse(res, "Login Successful", {
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("===== LOGIN ERROR =====");
    console.error(error);

    return errorResponse(res, error.message, 500);
  }
};

const profile = async (req, res) => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      return errorResponse(res, "User not authenticated", 401);
    }

    const user = await getProfile(userId);

    if (!user) {
      return errorResponse(res, "User profile not found", 404);
    }

    return successResponse(res, "Profile loaded successfully", user);
  } catch (error) {
    console.error("===== PROFILE ERROR =====");
    console.error(error);

    return errorResponse(res, error.message, 500);
  }
};

module.exports = {
  login,
  profile,
};
