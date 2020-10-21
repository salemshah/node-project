/**
 * Applying some DRY (dont repeat your self):
 * One thing we can do to avoid repeating the try/catch code on each async middleware is write once in a high order function.
 * @returns {function(*=, *=, *=): Promise<unknown>}
 * @param func
 */

const asyncHandler = (func) => {
    return function(req, res, next) {
        return Promise
            .resolve(func(req, res, next))
            .catch(next)
    }
}

module.exports = asyncHandler;