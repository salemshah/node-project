const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load env vars
dotenv.config({path: './config/config.env'});

// load models
const Bootcamp = require('./models/Bootcamps');
const Course = require('./models/Course');

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    connectTimeoutMS: 1000
});

//read bootcamps.json file
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
)

// read courses.json file
const course = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

// import Data into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        //await Course.create(course);
        console.log('Data Imported...'.green.inverse)
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

// delete Data from DB
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log('Data Destroyed...'.red.inverse)
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

if (process.argv[2] === '-i') {
    importData().catch(e => console.log(e))
} else if (process.argv[2] === '-d') {
    deleteData().catch(e => console.log(e))
}