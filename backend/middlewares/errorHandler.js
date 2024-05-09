const errorHandler = (error, req, res, next) => {
    var status = 500;
    var message = "internal server error";
    // if (error instanceof ValidationError) {
    //     data.status = error.status;
    //     data.message = error.message;

    //     return res.status(data.status).json(data.message);
    // }

    if (error.status) {
        status = error.status;
    }
    if (error.message) {
        message = error.message;
    }

    return res.status(status).json({ message });
};

module.exports = errorHandler;
