const Bootcamp = require('../models/Bootcamps')
const ErrorResponse = require('../utils/errorResponse')
/**
 * @desc        Get all bootcamps
 * @route       Get /api/v1/bootcamps
 * @access      Public
 * @param       req
 * @param       res
 * @param       next
 */
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).send({success: true, data: bootcamps})
    } catch (e) {
        res.send(400).send({success: false, error: e.message})
    }
    //res.status(400);
    //res.sendStatus(400)
    //res.send({name: "ahmad"})// il envoie en tant que JSON
    //res.json({name: "ahmad"})// il envoie en tant que JSON
    //res.send("<h2>Hello from express framework</h2>");
}

/**
 * @desc        Get single bootcamps
 * @route       Get /api/v1/bootcamps/:id
 * @access      Public
 * @param       req
 * @param       res
 * @param       next
 */
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id)
        if (!bootcamp) {
            //return res.status(400).send({success: false, error: `There is no product by this ID ${req.params.id}`})
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }
        res.status(200).send({success: true, data: bootcamp})
    } catch (e) {
        /*res.status(400).send({success: false, error: e.message})*/
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
}

/**
 * @desc        Create a new bootcamp
 * @route       POST /api/v1/bootcamps
 * @access      Privet
 * @param       req
 * @param       res
 * @param       next
 */
exports.createBootcamp = async (req, res, next) => {

    try {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(201).send({success: true, data: bootcamp})
    } catch (e) {
        res.status(400).json({success: false, error: e.message})
    }


}

/**
 * @desc        Update a bootcamp
 * @route       PUT /api/v1/bootcamps/:id
 * @access      Privet
 * @param       req
 * @param       res
 * @param       next
 */
exports.updateBootcamp = async (req, res, next) => {
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
        res.status(400).send({success: false, error: e.message})
    }
}

/**
 * @desc        Delete a bootcamp
 * @route       DELETE /api/v1/bootcamps/:id
 * @access      Privet
 * @param       req
 * @param       res
 * @param       next
 */
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
        res.status(400).send({success: false, error: e.message})
    }
}