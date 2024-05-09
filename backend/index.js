const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DBConnection = require("./database/index");
const userModel = require("./model/users");
const Router = require("./Routes/Routes");
const { PORT } = require("./config/index");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use("/Storage", express.static("Storage"));
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
        maxAge: "50mb",
    })
);

app.use(Router);
app.use(errorHandler);

DBConnection();

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
