const express = require('express');
const dotenv = require('dotenv');
const bootcamp = require('./routes/bootcamps');
const colors = require('colors');
//const logger = require('./middleware/logger')
const morgan = require('morgan')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')


// load env vars
dotenv.config({path: './config/config.env'})

// connect to database
connectDB();
const app = express();

// body parser
app.use(express.json())

// dev logging middleware
if (process.env.NODE_ENV === "development") {
    //app.use(logger)
    app.use(morgan('dev'))
}

// mount routers
app.use(process.env.MAIN_URL, bootcamp)
app.use((err, req, res, next) => {
    errorHandler(err, req, res, next)
});

// we can use ROUTE like this also
/*app.get('/', (req, res) =>{

})*/

const PORT = process.env.PORT || 9000
const server = app.listen(PORT, () => console.log(`Server is running on ${process.env.NODE_ENV} mode : http://localhost:${PORT}`.bgGreen.bold))

//handle unhandled promise rejections
process.on('unhandledRejection', (errors, promise) => {
    console.log(`Error: ${errors.message}`.bgRed)
    // close server and exit process
    server.close(() => process.exit(1));
})
