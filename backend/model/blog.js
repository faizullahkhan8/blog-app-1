const mongoose = require("mongoose");

const blog = new mongoose.Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        cat: { type: String, required: true },
        photo: { type: String, required: true },
        userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    },
    { timestamps: true }
);

const blogModel = mongoose.model("blogs", blog);

module.exports = blogModel;
