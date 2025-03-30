const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

//middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())

//serve static file for profile pic 
app.use("/public", express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI).then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.log("❌ Error connecting to MongoDB"))

// Import Main Router (Ensure `routes/index.js` exists)
const mainRouter = require("./routes/index.js")
app.use('/api', mainRouter)// All routes will be prefixed with `/api`

app.use((req, res) => {
    res.status(404).send("Router not found in server.js")
})

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

