const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

console.log(
  "MONGO URL CHECK:",
  process.env.MONGO_URL ? "FOUND" : "NOT FOUND"
);

const { OAuth2Client } = require("google-auth-library");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

// MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Error:", error.message);
  });

// Test
app.get("/", (req, res) => {
  res.send("GenLab Backend is Running");
});

// Signup
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      message: "Signup successful"
    });
  } catch (error) {
    console.log("SIGNUP ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "Please login with Google"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    res.json({
      message: "Login successful"
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

// Google Login
app.post("/api/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        message: "Google token missing"
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name: name,
        email: email,
        googleId: googleId,
        password: null
      });

      await user.save();
    }

    res.json({
      message: "Google login successful",
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.log("GOOGLE LOGIN ERROR:", error);

    res.status(401).json({
      message: "Google authentication failed"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});