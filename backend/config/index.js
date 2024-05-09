const dotenv = require("dotenv").config();

const PORT = process.env.PORT;
const {
    MONGO_DB_CONNECTION,
    ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY,
    SERVER_PATH,
} = process.env;

module.exports = {
    PORT,
    MONGO_DB_CONNECTION,
    ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY,
    SERVER_PATH,
};
