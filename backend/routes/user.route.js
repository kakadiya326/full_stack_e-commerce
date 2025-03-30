const express = require("express");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/user.model");
const router = express.Router();

require("dotenv").config();

//Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profilepic");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//file upload middleware

const upload = multer({ storage: storage });

router.post("/add-user", upload.single("ImageURI"), async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const {
      UserName,
      Email,
      Password,
      Created,
      LastLogin,
      Role,
      Mobile,
      Address,
      ImageURI,
    } = req.body;

    //checking if any fields are empty
    if (!UserName || !Email || !Password || !Mobile || !Address) {
      return res
        .status(400)
        .json({ message: "Adding user needs all filed filled" });
    }

    try {
      // Checking if email is already registered
      const findUser = await User.findOne({ Email });
      if (findUser) {
        return res.status(400).json({
          message: "Email is already in use, please try a different one!",
        });
      }

      // Proceed with user registration if email is not found
    } catch (error) {
      console.error("Error checking user email:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const creatUser = new User({
      UserName,
      Email,
      Password,
      Created,
      LastLogin,
      Role: Role || "user",
      Mobile,
      Address,
      //   ImageURI: req.file ? req.file.filename : null,
      ImageURI: req.file? `/profilepic/${req.file.filename}` : null,
      LastLogin: null,
    });

    await creatUser.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    console.log("user.routes.js : file error: " + err.message);
    res.status(500).json({ message: err.message });
  }
});
// router.post('/add-user', upload.single('ImageURI'), async (req, res) => {
//     try {
//         const {
//             UserName,
//             Email,
//             Password,
//             Created,
//             LastLogin,
//             Role,
//             Mobile,
//             Address
//         } = req.body;

//         // Check if required fields are missing
//         if (!UserName || !Email || !Password || !Mobile || !Address) {
//             return res.status(400).json({ error: 'All fields are required' });
//         }

//         // Checking if email is already registered
//         const findUser = await User.findOne({ Email });
//         if (findUser) {
//             return res.status(400).json({ error: 'Email is already in use, please try a different one!' });
//         }

//         // Hash password before saving
//         const hashedPassword = await bcrypt.hash(Password, 10);

//         // Create new user
//         const newUser = new User({
//             UserName,
//             Email,
//             Password: hashedPassword,
//             Created,
//             LastLogin,
//             Role: Role || 'user',
//             Mobile,
//             Address,
//             ImageURI: req.file ? req.file.filename : null, // 🔹 Store filename or null
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully!" });

//     } catch (err) {
//         console.error('Error:', err.message);
//         res.status(500).json({ error: err.message });
//     }
// });

module.exports = router;
