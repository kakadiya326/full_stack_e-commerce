const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UserName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Created: { type: Date, default: Date.now },
    LastLogin: { type: Date, required: false },
    Role: { type: String, default: "user" },
    Mobile: { type: String, required: true },
    Address: { type: String, required: true },
    ImageURI: { type: String, required: false },
});

module.exports = mongoose.model("Users", UserSchema); // Correctly define model
// Export correctly