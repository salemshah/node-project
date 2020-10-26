const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        connectTimeoutMS: 1000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgCyan.black)
};

module.exports = connectDB;