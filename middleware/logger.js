

const logger = (req, res, next) =>{
    const {method, protocol, get, originalUrl} = req
    req.tests = `Method: ${method} | Protocol: ${protocol} | Get: ${req.get('host')}  | OriginalURL: ${originalUrl}`;
    console.log(`Method: ${method} | Protocol: ${protocol} | Get: ${req.get('host')}  | OriginalURL: ${originalUrl}`);
    next();
}


module.exports = logger;