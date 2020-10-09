const express = require('express');
const {getBootcamp, getBootcamps, createBootcamp, deleteBootcamp, updateBootcamp} = require('../controller/bootcamps');

const routers = express.Router();
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

module.exports = routers;
