const Courses = require('../models/Course');
const Bootcamps = require('../models/Bootcamps');
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
        query = Courses.find({bootcampRelated: {$exists: true, $eq: req.params.bootcampId}})
    } else {

        //query = Courses.find()

        /** "bootcampRelated" work like Primary key it related two Documents (table) together
         * you can find "bootcampRelated" inside Schema of (devcamper_api\models\Course.js) last field
         *
         * first query get all bootcamp
         * second query get a specific field ( name and description housing)
         */
        //query = Courses.find().populate('bootcampRelated')
        query = Courses.find().populate({
            path: 'bootcampRelated',
            select: 'name description housing'
        })
    }
    const courses = await query;

    res.status(200).send({
        success: true,
        count: courses.length,
        courses
    })
})

/**
 * @desc        Get single courses
 * @method      GET
 * @rout        /api/v1/courses/:id
 * @access      Public
 */
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Courses.findById(req.params.id).populate({
        path: 'bootcampRelated',
        select: 'name description'
    });

    // check if find courses
    if (!course) {
        return next(new ErrorResponse(`There is no any course with this id: ${req.params.id}`, 404))
    }

    // response for client
    res.status(200).send({
        success: true,
        count: course.length,
        data: course
    })
})

/**
 * @desc        Add a new Course
 * @method      POST
 * @rout        /api/v1/bootcamps/:bootcampId/courses
 * @access      Private
 */
exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcampRelated = req.params.bootcampId;
    const bootcamp = await Bootcamps.findById(req.params.bootcampId)

    // check if id exist in bootcamp
    // because bootcamp is parent of course
    if (!bootcamp) {
        return next(
            new ErrorResponse(`In parent course (bootcamp) not exist this id: ${req.params.bootcampId}`, 404)
        )
    }
    // create a new course
    const newCourse = await Courses.create(req.body)

    // response for client
    res.status(200).send({
        success: true,
        data: newCourse
    })

})


/**
 * @desc        Update a Course
 * @method      PUT
 * @rout        /api/v1/courses/:id
 * @access      Private
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.updateCourse = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    let course = await Courses.findById(id);


    if (Object.keys(req.body).length === 0) {
        return next(new ErrorResponse(`There is no data`, 404))
    }

    if (!course) {
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))
    }

    course = await Courses.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).send({
        success: true,
        data: course
    })
})


/**
 * @desc        Delete a Course
 * @method      Delete
 * @rout        /api/v1/courses/:id
 * @access      Private
 * @type {function(*=, *=, *=): Promise<unknown>}
 */
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    let course = await Courses.findById(id)

    if (!course) {
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404))
    }

    await Courses.remove()

    res.status(200).send({
        success: true,
        data: {}
    })
})