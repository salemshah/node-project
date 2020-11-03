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
    //name of field which can relate two document(work like primary key)
    bootcampRelated: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',//Bootcamp is the name of Schema in database or name of document (table)
        required: true
    }
});

// call getAverageCost after save
CourseSchema.post('save', function () {

})

// call getAverageCost before remove
CourseSchema.pre('remove', function (next) {

})


module.exports = mongoose.model('Course', CourseSchema)