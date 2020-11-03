const express = require('express');
/**
 * @getCourses:      is function which get all courses
 * @getCourse:       is function which get a single course by its id
 * @addCourse:       is function which add a new course
 * @updateCourse     is function which update a course by its id
 * @deleteCourse     is function which delete a course by its id
 */
const {getCourses, getCourse, addCourse, updateCourse, deleteCourse} = require('../controller/courses')
const router = express.Router({mergeParams: true});

/**
 * @get:    get all courses
 * @post:   create a new course
 */
router
    .route('/')
    .get(getCourses)
    .post(addCourse);

/**
 * @route    we can assign a prefix
 * @get:     get a single courses
 * @put:     update a course
 * @delete   delete a course
 */
router
    .route('/:id')
    .get(getCourse)
    .put(updateCourse)
    .delete(deleteCourse)
;


module.exports = router;

