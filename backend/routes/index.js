const express = require("express");
const router = express.Router();

//importing routes file
const userRoutes = require("./user.route")// User-related routes
console.log("userRoutes:", userRoutes);

router.use("/users", userRoutes)

// Handle 404 errors for unknown routes
router.use((req, res) => {
    res.status(404).send("Route not found in index.js");
})

module.exports = router;