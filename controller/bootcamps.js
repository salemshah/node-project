

let users = [
    {id: 1, name: "jan"},
    {id: 2, name: "khan"},
    {id: 3, name: "karim"},
    {id: 4, name: "samim"},
]

/**
 * @desc        Get all bootcamps
 * @route       Get /api/v1/bootcamps
 * @access      Public
 * @param       req
 * @param       res
 * @param       next
 */
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({success: true, msg: "Get all users"});
    //res.status(400);
    //res.sendStatus(400)
    //res.send({name: "ahmad"})// il envoie en tant que JSON
    //res.json({name: "ahmad"})// il envoie en tant que JSON
    //res.send("<h2>Hello from express framework</h2>");
}

/**
 * @desc        Get all bootcamps
 * @route       Get /api/v1/bootcamps/:id
 * @access      Public
 * @param       req
 * @param       res
 * @param       next
 */
exports.getBootcamp = (req, res, next) => {
    res.status(200).send({success: true, msg: `Get one user ${req.params.id}`})
}

/**
 * @desc        Create a new bootcamp
 * @route       POST /api/v1/bootcamps
 * @access      Privet
 * @param       req
 * @param       res
 * @param       next
 */
exports.createBootcamp = (req, res, next) => {
    res.status(200).send({success: true, msg: "Created a new user"})
}

/**
 * @desc        Update a bootcamp
 * @route       PUT /api/v1/bootcamps/:id
 * @access      Privet
 * @param       req
 * @param       res
 * @param       next
 */
exports.updateBootcamp = (req, res, next) => {
    res.status(200).send({success: true, msg: `Updated the user ${req.params.id}`})
}

/**
 * @desc        Delete a bootcamp
 * @route       DELETE /api/v1/bootcamps/:id
 * @access      Privet
 * @param       req
 * @param       res
 * @param       next
 */
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).send({success: true, msg: `Deleted the user ${req.params.id}`})
}