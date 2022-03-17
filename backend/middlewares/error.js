const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // mongodb id error
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // mongoose duplicate key error
    if (err.code === 11000) {
        const message = `${Object.keys(err.keyValue)} already exists`;
        err = new ErrorHandler(message, 400);
    }

    // wrong jwt error
    if (err.code === "JsonWebTokenError") {
        const message = 'JWT Error';
        err = new ErrorHandler(message, 400);
    }

    // jwt expire error
    if (err.code === "JsonWebTokenError") {
        const message = 'JWT is Expired';
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}
