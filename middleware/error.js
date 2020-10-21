const ErrorResponse = require('../utils/errorResponse')
const errorHandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message

    // log to console for dev
    console.log(err);

    //mongoose bad ObjectId
    //console.log(err.name.bgYellow)

    if (err.name === "CastError") {
        const message = `Resource not found with this id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    const getFieldAndValue = (objectName) => {
        for (let field in objectName) {
            return `Duplicate => ${field}: ${objectName[field]}`;
        }
    }

    // mongoose duplicate key
    if (err.code === 11000) {
        const message = `Duplicate field value entered: ${getFieldAndValue(err.keyValue)}`
        error = new ErrorResponse(message, 400)
    }

    // mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => `${val.message}`)
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler;