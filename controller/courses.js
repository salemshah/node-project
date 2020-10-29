const Courses = require('../models/Course');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc        Get all courses
 * @method      GET
 * @rout        /api/v1/courses
 * @rout        /api/v1/bootcamps/:bootcampId/courses
 * @access      Public
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.bootcampId) {
        query = Courses.find({bootcamp: req.params.bootcampId})
    } else {
        //query = Courses.find()
        // "bootcampRelated" work like Primary key it related two Documents (table) together
        // you can find "bootcampRelated" inside Schema of (devcamper_api\models\Course.js) last field
        query = Courses.find().populate('bootcampRelated')
    }
    const courses = await query;

    res.status(200).send({
        success: true,
        count: courses.length,
        courses
    })
})