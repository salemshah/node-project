const express = require('express');
const dotenv = require('dotenv');
const bootcamp = require('./routes/bootcamps')

const app = express();

// load env vars
dotenv.config({path: './config/config.env'})

// mount routers
app.use('/api/v1/bootcamp', bootcamp)

// we can use ROUTE like this also
/*app.get('/', (req, res) =>{

})*/

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`Server is running on ${process.env.NODE_ENV} mode : http://localhost:${PORT}`))