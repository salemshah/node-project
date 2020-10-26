const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load env vars
dotenv.config({path: './config/config.env'});

// load models
const Bootcamp = require('./models/Bootcamps');

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    connectTimeoutMS: 1000
});

//read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

// import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        console.log('Data Imported...'.green.inverse)
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

// delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        console.log('Data Destroyed...'.red.inverse)
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d') {
    deleteData()
}