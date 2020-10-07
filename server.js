const express = require('express');
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' })

const app = express();
const PORT = process.env.PORT || 9000
app.listen(PORT, console.log(`Server is running on ${process.env.NODE_ENV} mode : http://localhost:${PORT}`))