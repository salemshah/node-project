const express = require('express');
/**
 * getCourses:      is function
 */
const {getCourses} = require('../controller/courses')
const router = express.Router({mergeParams: true});

router.route('/').get(getCourses);

module.exports = router;

