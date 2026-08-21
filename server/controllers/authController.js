const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { getProfile } = require("../models/userModel");
const { createUser, findUserByEmail } = require("../models/userModel");

const { successResponse, errorResponse } = require("../utils/responseHandler");
const profile = async (req, res) => {
  try {
    const user = await getProfile(req.user.user_id);

    successResponse(
      res,

      "Profile Loaded Successfully",

      user,
    );
  } catch (error) {
    errorResponse(
      res,

      error.message,

      500,
    );
  }
};
const register = async (req, res) => {
  try {
    const { full_name, email, phone, password, role } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return errorResponse(res, "Email already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await createUser({
      full_name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    successResponse(
      res,
      "User Registered Successfully",
      {
        user_id: result.insertId,
      },
      201,
    );
  } catch (error) {
    console.log(error);

    errorResponse(res, error.message, 500);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return errorResponse(res, "Invalid Email or Password", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return errorResponse(res, "Invalid Email or Password", 401);
    }

    const token = generateToken(user);

    successResponse(
      res,

      "Login Successful",

      {
        token,

        user: {
          user_id: user.user_id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
        },
      },
    );
  } catch (error) {
    errorResponse(res, error.message, 500);
  }
};
module.exports = {
  register,

  login,

  profile,
};
