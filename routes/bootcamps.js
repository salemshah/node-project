const express = require('express');
const {getBootcamp, getBootcamps, createBootcamp, deleteBootcamp, updateBootcamp, getBootcampsInRadius} = require('../controller/bootcamps');

const routers = express.Router();
routers
    .route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius)

routers
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp);

routers
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);


// we can use like this also
/*routers.get(`/:id`, (req, res) => {

});*/

//----------------------------------------------------
// Include other resources routers
const courseRouter = require('./courses')
// Re-route into other resource (courses) routers
routers.use('/:bootcampId/courses', courseRouter)

module.exports = routers;
