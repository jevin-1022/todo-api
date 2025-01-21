const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Sign UP
exports.signUp = async (req, res) => {
  try {
    const { body: payload } = req;
    console.log("req: ", req.header);

    const existingUserWithThisEmail = await User.findOne({
      email: payload.email,
    }).lean();
    if (existingUserWithThisEmail) {
      res.status(400).json({ error: "Email already exist" });
    }

    const newUser = await User.create(payload);

    res.status(201).json({ message: "Sign up successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to sign up" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const accessToken = jwt.sign(
      { email: user.email, password: user.password, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // remove password from user
    delete user.password;

    // If password is correct, send success response
    res.status(200).json({ message: "Login successful", user, accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to logged in" });
  }
};
