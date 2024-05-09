const mongoose = require("mongoose");
const { MONGO_DB_CONNECTION } = require("../config/index");
const DBConnection = () => {
    try {
        mongoose
            .connect(MONGO_DB_CONNECTION)
            .then(console.log("connected to database"));
    } catch (error) {
        console.log(error);
    }
};

module.exports = DBConnection;
