const express = require('express');
const dotenv = require('dotenv');

const colors = require('colors');
//const logger = require('./middleware/logger')
const morgan = require('morgan')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

// read route files
const bootcamp = require('./routes/bootcamps');
const courses = require('./routes/courses');

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

/**
 * @desc             It will redirect to the bootcamps "Routs" Located in (devcamper_api/routes/Bootcamps.js)
 * @Type-in-URL      http://localhost:9000/api/v1/bootcamps
 */
app.use('/api/v1/bootcamps', bootcamp)
/**
 * @desc             It will redirect to the courses "Routs" Located in (devcamper_api/routes/Courses.js)
 * @Type-in-URL      http://localhost:9000/api/v1/courses
 */
app.use('/api/v1/courses', courses)

// for errors
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
