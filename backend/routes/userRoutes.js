const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {protect} = require("../middleware/authMiddleware")
const registerSchema = require("../validators/auth-validator")
const loginSchema = require("../validators/login-validator")
const validate = require("../middleware/validate-middleware")

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// access Public
router.post("/register", validate(registerSchema),async (req, res) => {
  const { name, email, password } = req.body;
  // console.log("dsf",name);
  try {
    // Registration logic
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    user = new User({ name, email, password });
    await user.save();
    // res.status(201).json({
    //     user:{
    //         _id: user._id,
    //         name:user.name,
    //         email:user.email,
    //         role:user.role,
    //     },
    // });

    // create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };
    // console.log("wece",payload);

    // sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      (err, token) => {
        if (err) throw err;
        // send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/users/login
// @desc Authenticate user
// @access Public

router.post("/login", validate(loginSchema),async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await user.matchPassword(password);
    // console.log(isMatch);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = { user: { id: user._id, role: user.role } };
    // console.log("wece",payload);

    // sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40d" },
      (err, token) => {
        if (err) throw err;
        // send the user and token in response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// @route GET /api/users/profile
// @desc get logged-in user's profile(protected  Route)
// @access Private

router.get("/profile", protect ,  async (req, res) => {
  res.json(req.user);
});
module.exports = router;
