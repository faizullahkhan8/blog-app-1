const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
    {
        token: { type: String, required: true },
        userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    },
    { timestamps: true }
);

const tokenModel = mongoose.model("tokens", tokenSchema);

module.exports = tokenModel;
