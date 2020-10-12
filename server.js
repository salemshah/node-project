const express = require('express');
const dotenv = require('dotenv');
const bootcamp = require('./routes/bootcamps');
//const logger = require('./middleware/logger')
const morgan = require('morgan')
const app = express();

// load env vars
dotenv.config({path: './config/config.env'})


// dev logging middleware
if(process.env.NODE_ENV === "development"){
    //app.use(logger)
    app.use(morgan('dev'))
}

// mount routers
app.use('/api/v1/bootcamps', bootcamp)

// we can use ROUTE like this also
/*app.get('/', (req, res) =>{

})*/

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`Server is running on ${process.env.NODE_ENV} mode : http://localhost:${PORT}`))