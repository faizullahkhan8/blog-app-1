const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true },
        email: { required: true, type: String },
        password: { type: String, reqired: true },
    },
    { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
