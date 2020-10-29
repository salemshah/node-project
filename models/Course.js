const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        trim: true
    },
    weeks: {
        type: String,
        required: [true, 'Please add number of weeks'],
        trim: true
    },
    tuition: {
        type: Number,
        required: [true, 'Please add a tuition cost'],
        trim: true
    },
    minimumSkill: {
        type: String,
        required: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scholarshipAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    //
    bootcampRelated: {
        type: mongoose.Schema.ObjectId,
        //Bootcamp is the name of Schema in database
        ref: 'Bootcamp',
        required: true
    }
});

module.exports = mongoose.model('Course', CourseSchema)