const ErrorResponse = require('../utils/errorResponse')
const errorHandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message

    // log to console for dev
    console.log(err.stack.red);

    //mongoose bad ObjectId
    console.log(err.name.bgYellow)

    if (err.name === "Error") {
        const message = `Resource not found with this id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    })
}

module.exports = errorHandler;