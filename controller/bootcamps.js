const Bootcamp = require('../models/Bootcamps')
const asyncHandler = require('../middleware/async') // avoid repeating the try/catch code on each async middleware
const ErrorResponse = require('../utils/errorResponse')
const geocoder = require('../utils/geocoder')
/**
 * @desc        Get all bootcamps
 * @route       Get /api/v1/bootcamps
 * @access      Public
 * @param       req
 * @param       res
 * @param       next
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let query;

    //copy req.query
    const reqQuery = {...req.query};

    //fields to exclude
    const removeFields = ['select', 'sort', 'limit', 'page']

    //loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => {
        delete reqQuery[param]
    })

    //create query string
    let queryStr = JSON.stringify(reqQuery);

    //create operators ($gt, gte, in etc...)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|nin|ne|eq)\b/g, match => `$${match}`);
    let queryStrParse = JSON.parse(queryStr)

    //finding resource
    query = Bootcamp.find(queryStrParse)

    // select field
    if (req.query.select) {
        /**
         * Type in URL:                         {{URL}}/api/v1/bootcamps?select=name,description,housing
         * The (req.query) will become          req.query print  { select: 'name,description,housing' }
         * the "fields" var will become         name description housing
         * the "query" var will become          all information about connection and all fields from Bootcamp Schema
         */
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }

    // sort fields
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createAt')
    }

    //pagination
    /**
     * Type in URL              {{URL}}/api/v1/bootcamps?limit=2&page=1
     * var "page"               2
     * var "itemParPage"        2 //itemParPage = limit
     * var "startIndex"         0
     * var "endIndex"           2
     */
    const page = parseInt(req.query.page, 10) || 1;
    const itemParPage = parseInt(req.query.limit, 10) || 3;
    const startIndex = (page - 1) * itemParPage;
    const endIndex = page * itemParPage;

    console.log('page => ', page)
    console.log('itemParPage => ', itemParPage)
    console.log('startIndex =>', startIndex)
    console.log('endIndex => ', endIndex)

    const total = await Bootcamp.countDocuments() //it count all data record from database
    query = query.skip(startIndex).limit(itemParPage);


    //pagination result
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            itemParPage,
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            itemParPage,
        }
    }

    // executing query
    const bootcamps = await query;
    res.status(200).send({success: true, count: bootcamps.length, pagination, data: bootcamps})


    //res.status(400);
    //res.sendStatus(400)
    //res.send({name: "ahmad"})// il envoie en tant que JSON
    //res.json({name: "ahmad"})// il envoie en tant que JSON
    //res.send("<h2>Hello from express framework</h2>");
})

/**
 * @desc        Get single bootcamps
 * @route       Get /api/v1/bootcamps/:id
 * @access      Public
 * @param       req
 * @param       res
 * @param       next
 */
//-------------- The first method -----------------
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
        //return res.status(400).send({success: false, error: `There is no product by this ID ${req.params.id}`})
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    res.status(200).send({success: true, data: bootcamp})
})

//-------------- The second method -----------------
/*
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        if (!bootcamp) {
            //return res.status(400).send({success: false, error: `There is no product by this ID ${req.params.id}`})
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }
        res.status(200).send({success: true, data: bootcamp})
    } catch (e) {
        /!*res.status(400).send({success: false, error: e.message})*!/
        //next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        next(e)
    }
}
*/

/**
 * @desc        Create a new bootcamp
 * @route       POST /api/v1/bootcamps
 * @access      Privet
 * @param       req
 * @param       res
 * @param       next
 */
//-------------- The first method -----------------
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).send({success: true, data: bootcamp})
})

//-------------- The second method -----------------
/*exports.createBootcamp = async (req, res, next) => {

    try {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(201).send({success: true, data: bootcamp})
    } catch (e) {
        //res.status(400).json({success: false, error: e.message})
        next(e)
    }
}*/


/**
 * @desc        Update a bootcamp
 * @route       PUT /api/v1/bootcamps/:id
 * @access      Privet
 * @param       req
 * @param       res
 * @param       next
 */

//-------------- The first method -----------------
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!bootcamp) {
        return res.status(400).send({
            success: false,
            error: `There is no product by this ID to update ${req.params.id}`
        })
    }
    res.status(200).send({success: true, data: bootcamp})
})

//-------------- The second method -----------------
/*exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!bootcamp) {
            return res.status(400).send({
                success: false,
                error: `There is no product by this ID to update ${req.params.id}`
            })
        }
        res.status(200).send({success: true, data: bootcamp})
    } catch (e) {
        /!*res.status(400).send({success: false, error: e.message})*!/
        next(e)
    }
}*/

/**
 * @desc        Delete a bootcamp
 * @route       DELETE /api/v1/bootcamps/:id
 * @access      Privet
 * @param       req
 * @param       res
 * @param       next
 */

//-------------- The first method -----------------
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
    if (!bootcamp) {
        return res.status(400).send({
            success: false,
            error: `There is no product by this ID to delete ${req.params.id}`
        })
    }
    res.status(200).send({success: true, countBootcamp: Bootcamp.length, data: {}})
})
//-------------- The second method -----------------
/*
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
        if (!bootcamp) {
            return res.status(400).send({
                success: false,
                error: `There is no product by this ID to delete ${req.params.id}`
            })
        }
        res.status(200).send({success: true, countBootcamp: Bootcamp.length, data: {}})
    } catch (e) {
        //res.status(400).send({success: false, error: e.message})
        next(e)
    }
}*/

/**
 * @desc        Get bootcamps within a radius
 * @route       DELETE /api/v1/bootcamps/:zipcode/:distance
 * @access      Privet
 * @param       req
 * @param       res
 * @param       next
 */

//-------------- The first method -----------------
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const {zipcode, distance} = req.params
    //console.log(distance)
    // get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode)
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    //console.log(loc)
    /*
    console.log(lat)//42.347172
    console.log(lng)//-71.102294
    */
    // calc radius using radians
    // divide dist by radius of earth
    // earth radius = 3,963 mi / 6,378 km
    const radius = distance / 3963

    const bootcamps = await Bootcamp.find({
        location: {$geoWithin: {$centerSphere: [[lng, lat], radius]}}
    });

    res.status(200).send({
        success: true,
        count: bootcamps.length,
        data: bootcamps,
    })

})